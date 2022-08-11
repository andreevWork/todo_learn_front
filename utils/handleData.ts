import {Tag, Task} from '../src/types';
export const saveData = (
  dataName: string,
  dataValue: any,
  { serialize = JSON.stringify } = {}
): void => {
  window.localStorage.setItem(dataName, serialize(dataValue));
};

export const getData = <T>(
  dataName: any,
  { deserialize = JSON.parse } = {}
): T | null => {
  let data;

  try {
    data = window.localStorage.getItem(dataName);
  } catch(e) {}

  return data ? deserialize(data) : null;
};


export function getTagTitlesAndIds(allTags: Tag[], allTasks: Task[]) {
  const tagDictionary: { [index: string]: string } = {};

  allTags?.forEach((tag) => {
    const key = tag.id;
    tagDictionary[key] = tag.title;
  });

  return allTasks?.map((task) => {
    return {
      ...task,
      tags:
        task.tags.length > 0 ? task.tags.map((tag) => tagDictionary[tag]) : [],
    };
  });
}
