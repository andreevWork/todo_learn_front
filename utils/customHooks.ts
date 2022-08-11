import React, { useState } from 'react';

import { Task, statefulTag, Tag, tagsAndTagsType } from '../src/types';
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


export function useTaskAndTags() {
  const [state, setState] = useState<tagsAndTagsType>({
    tasks: [],
    statefulTags: [],
  });

  const loadData = React.useCallback(function loadDataFromLocalStorage(): void {
    const tasks = getData('tasks');

    const tags = getData('tags');

    const allTasks: Task[] = tasks && tasks;

    const allTags: statefulTag[] =
      tags &&
      tags.map(({ id, title }: Tag) => ({
        id,
        title,
        active: false,
      }));

    const titleFromTagId = getTagTitlesAndIds(allTags, allTasks);
    setState({ tasks: titleFromTagId ?? [], statefulTags: allTags ?? [] });
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return { state, setState };
}