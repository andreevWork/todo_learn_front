import type { NextPage } from 'next';
import React, { Fragment, useState } from 'react';
import { Header } from '../src/components/Header/Header';
import { TodoCreateForm } from '../src/components/TodoCreateForm/TodoCreateForm';
import { TodoList } from '../src/components/TodoList/TodoList';
import { TagCreateForm } from '../src/components/TagCreateForm/TagCreateForm';
import { TagList } from '../src/components/TagList/TagList';
import { Task, statefulTag, Tag } from '../src/types';
import { saveData, getData, getTagTitlesAndIds } from '../utils/handleData';
import { getRandomNumber } from '../utils/generateRandomNumber';
import { SearchInput } from '../src/components/SearchInput/SearchInput';
import { useSearchInputValue, useTaskAndTags } from '../utils/customHooks';

// separate your hooks
// one for retrieving initial data (maybe a function here).
// second hook for all the states
// a hook for filter with search input value. Reactivity is important in hooks.


const Home: NextPage = () => {

  const { state:taskAndTagState, setState:setTaskAndTagState} = useTaskAndTags();
  
  const [inputValue, setInputValue] = useState<string>('');

  const [tagText, setTagText] = useState<string>('');

  const [searchInputValue, setSearchInputValue] = useState<string>('');


  const { tasks, statefulTags } = taskAndTagState;

  // a hook for the search input value
  const { search, searchResult } = useSearchInputValue(searchInputValue, tasks);

  const addTask = () => {
    if (!inputValue) return;

    const selectedTags = statefulTags?.filter(
      ({ id, title, active }) => active
    );

    const tagDictionary: { [index: string]: string } = {};

    statefulTags?.forEach((tag) => {
      const key = tag.title;
      tagDictionary[key] = tag.id;
    });

    const getIdFromTitle = tasks.map((task) => {
      return {
        ...task,
        tags: task.tags.map((tag) => tagDictionary[tag]),
      };
    });

    const allSessionTasks = [
      ...getIdFromTitle,
      {
        title: inputValue,
        tags: selectedTags.map(({ id, title, active }) => id),
      },
    ];

    saveData('tasks', allSessionTasks);

    const ResetTags = statefulTags.map((tag) => ({ ...tag, active: false }));

    setTaskAndTagState({
      tasks: [
        ...tasks,
        {
          title: inputValue,
          tags: selectedTags.map(({ id, title, active }) => title),
        },
      ],
      statefulTags: ResetTags,
    });

    setInputValue('');
  };

  const addTag = () => {
    if (!tagText) return;

    const randomNumber = getRandomNumber();

    const allTagsTitle = statefulTags?.map(({ id, title }) => ({ id, title }));

    const allSessionTags = [
      ...allTagsTitle,
      { id: randomNumber, title: tagText },
    ];


    setTaskAndTagState((prev) => ({
      ...prev,
      statefulTags: [
        ...prev.statefulTags,
        { id: randomNumber, title: tagText, active: false },
      ],
    }));

    saveData('tags', allSessionTags);

    setTagText('');
  };

  const handleDelete = (index: number) => {
    const filteredTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    saveData('tasks', filteredTasks);

    setTaskAndTagState((prev) => ({ ...prev, tasks: filteredTasks }));
  };

  const selectTag = (index: number) => {

    setTaskAndTagState((prev) => ({
      ...prev,
      statefulTags: prev.statefulTags.map((tag, i) => {
        if (index === i) {
          return { ...tag, active: !tag.active };
        }
        return tag;
      }),
    }));
  };

  const taskClickHandler = (task: Task) => {
    const { tags } = task;

  

    setTaskAndTagState((prev) => ({
      ...prev,
      statefulTags: prev.statefulTags.map((tag) => {
        if (tags.includes(tag.title)) {
          return { ...tag, active: true };
        }

        return { ...tag, active: false };
      }),
    }));
  };

  return (
    <Fragment>
      <Header />

      <TagCreateForm
        tagText={tagText}
        setTagText={setTagText}
        addTag={addTag}
      />

      <TagList allTags={statefulTags} selectTag={selectTag} />

      <SearchInput
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />

      <TodoCreateForm
        addTask={addTask}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <TodoList
        search={search}
        searchResult={searchResult}
        taskClickHandler={taskClickHandler}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default Home;
