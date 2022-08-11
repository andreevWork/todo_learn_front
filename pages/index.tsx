import type { NextPage } from 'next';
import React, {createRef, Fragment, useState} from 'react';
import { Header } from '../src/components/Header/Header';
import { TodoCreateForm } from '../src/components/TodoCreateForm/TodoCreateForm';
import { TodoList } from '../src/components/TodoList/TodoList';
import { TagCreateForm } from '../src/components/TagCreateForm/TagCreateForm';
import { TagList } from '../src/components/TagList/TagList';
import {TagId, Task} from '../src/types';
import { saveData } from '../utils/handleData';
import { getRandomNumber } from '../utils/generateRandomNumber';
import { SearchInput } from '../src/components/SearchInput/SearchInput';
import { useSearchInputValue, useTaskAndTags } from '../utils/customHooks';

// separate your hooks
// one for retrieving initial data (maybe a function here).
// second hook for all the states
// a hook for filter with search input value. Reactivity is important in hooks.

const Home: NextPage = () => {
  const [tagText, setTagText] = useState<string>('');

  const { state, setTask, setTag } = useTaskAndTags();

  const [searchInputValue, setSearchInputValue] = useState<string>('');

  // a hook for the search input value
  const { search, searchResult } = useSearchInputValue(searchInputValue, state.tasks);

  const addTask = (title: string) => {
    const newTasks = [
      ...state.tasks,
      {
        title,
        tags: state.tags
          .filter(({ active }) => Boolean(active))
          .map(({ id }) => id),
      },
    ];

    setTask(newTasks);
    setTag(state.tags.map((tag) => ({ ...tag, active: false })));
  };

  console.log('state', state);

  const addTag = () => {
    if (!tagText) return;

    const newTags = [
      ...state.tags,
      {
        id: getRandomNumber(),
        title: tagText
      }
    ];

    setTag(newTags);

    saveData('tags', newTags);

    setTagText('');
  };

  const handleDelete = (index: number) => {
    const filteredTasks = state.tasks.filter((_, taskIndex) => taskIndex !== index);

    saveData('tasks', filteredTasks);
    setTask(filteredTasks);
  };

  const selectTag = (tagId: TagId) =>
      setTag(state.tags.map((tag) => tag.id === tagId ? { ...tag, active: !tag.active } : tag));

  const taskClickHandler = (task: Task) =>
      setTag(state.tags.map((tag) => ({ ...tag, active: task.tags.includes(tag.id) })));

  return (
    <Fragment>
      <Header />

      <TagCreateForm
        tagText={tagText}
        setTagText={setTagText}
        addTag={addTag}
      />

      <TagList allTags={state.tags} selectTag={selectTag} />

      <SearchInput
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />

      <TodoCreateForm addTask={addTask} />

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
