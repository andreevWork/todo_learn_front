import type { NextPage } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import { Header } from '../src/components/Header/Header';
import { TodoCreateForm } from '../src/components/TodoCreateForm/TodoCreateForm';
import { TodoList } from '../src/components/TodoList/TodoList';
import { TagCreateForm } from '../src/components/TagCreateForm/TagCreateForm';
import { TagList } from '../src/components/TagList/TagList';
import { Task } from '../src/types';
import { Tag } from '../src/types';
import { saveData, getData } from '../utils/handleData';
import { getRandomNumber } from '../utils/generateRandomNumber';
import { SearchInput } from '../src/components/SearchInput/SearchInput';

type statefulTag = Tag & { active: boolean };

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statefulTags, setStatefulTags] = useState<statefulTag[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [tagText, setTagText] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  function getTagTitlesAndIds(allTags: statefulTag[], allTasks: Task[]) {
    const tagDictionary: { [index: string]: string } = {};

    allTags?.forEach((tag) => {
      const key = tag.id;
      tagDictionary[key] = tag.title;
    });

    // if (type === 'id') {
    //   // this converts title in tags to id
    //   const value: Task[] = allTasks.map((task) => {
    //     const Keys = Object.keys(tagDictionary);

    //     const idFromTitle: string[] = task.tags.map((tag) => {
    //       return Keys.find((key) => tagDictionary[key] === tag) || '';

    //     });
    //     return {
    //       ...task,
    //       tags: task.tags.length > 0 ? idFromTitle : [],
    //     };
    //   });

    //   return value;
    // } else if (type === 'title') {
    // this converts id to title
    return allTasks?.map((task) => {
      return {
        ...task,
        tags:
          task.tags.length > 0
            ? task.tags.map((tag) => tagDictionary[tag])
            : [],
      };
    });
    // }
  }

  useEffect(() => {
    const tasks = getData('tasks');

    const tags = getData('tags');

    const allTasks: Task[] = tasks && JSON.parse(tasks);

    const allTags: statefulTag[] =
      tags &&
      JSON.parse(tags).map(({ id, title }: Tag) => ({
        id,
        title,
        active: false,
      }));

    const titleFromTagId = getTagTitlesAndIds(allTags, allTasks);

    setTasks(titleFromTagId ?? []);

    setStatefulTags(allTags ?? []);
  }, []);

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

    console.log(allSessionTasks);

    // encapsulate JSON.stringify
    saveData('tasks', JSON.stringify(allSessionTasks));

    setTasks((prev) => [
      ...prev,
      {
        title: inputValue,
        tags: selectedTags.map(({ id, title, active }) => title),
      },
    ]);

    const ResetTags = statefulTags.map((tag) => ({ ...tag, active: false }));

    setStatefulTags(ResetTags);

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

    setStatefulTags((prev) => [
      ...prev,
      { id: randomNumber, title: tagText, active: false },
    ]);

    saveData('tags', JSON.stringify(allSessionTags));

    setTagText('');
  };

  const handleDelete = (index: number) => {
    const filteredTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    saveData('tasks', JSON.stringify(filteredTasks));

    setTasks(filteredTasks);
  };

  const selectTag = (index: number) => {
    setStatefulTags((prev) =>
      prev.map((tag, i) => {
        if (index === i) {
          return { ...tag, active: !tag.active };
        }
        return tag;
      })
    );
  };

  const taskClickHandler = (task: Task) => {
    const { tags } = task;

    setStatefulTags((prev) =>
      prev.map((tag) => {
        if (tags.includes(tag.title)) {
          return { ...tag, active: true };
        }

        return { ...tag, active: false };
      })
    );
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
        tasks={tasks}
        searchInputValue={searchInputValue}
        taskClickHandler={taskClickHandler}
        handleDelete={handleDelete}
      />
    </Fragment>
  );
};

export default Home;
