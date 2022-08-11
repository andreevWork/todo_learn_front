import React, { useState } from 'react';

import {Task, Tag, RawTag, State} from '../src/types';
import { getData, getTagTitlesAndIds } from '../utils/handleData';
import { levenshteinDistance } from './levenshtein';

// rewrite this and use it in index.tsx, create a function separately for retrieving data.
// check your code and ensure simplicity.

export const useSearchInputValue = (
  searchInputValue: string,
  tasks: Task[]
) => {
  const search:string = searchInputValue.toLowerCase().trim();
  const searchResult: Task[] = tasks.filter((task) => {
    return (
      levenshteinDistance(task.title.toLowerCase(), search) <= 2 ||
      task.tags.join('').toLowerCase().includes(search) ||
      task.title.toLocaleLowerCase().includes(search)
    );
  });

  return { search, searchResult };
};


export function useTaskAndTags(): { state: State, setTask: any, setTag: any } {
  const [state, setState] = useState<State>({
    tasks: [],
    tags: [],
  });

  React.useEffect(() => {
    const tasks = getData<Task[]>('tasks') || [];
    const tags = getData<RawTag[]>('tags') || [];

    setState({ tasks, tags });

    // const titleFromTagId = getTagTitlesAndIds(allTags, tasks);
  }, []);

  let cachedState = state;

  return {
    state,
    setState,
  };
}
