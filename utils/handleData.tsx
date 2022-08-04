import { Task, statefulTag } from '../src/types';
export const saveData = (
  dataName: string,
  dataValue: any,
  { serialize = JSON.stringify } = {}
): void => {
  window.localStorage.setItem(dataName, serialize(dataValue));
};

export const getData = (
  dataName: any,
  { deserialize = JSON.parse } = {}
): any => {
  const data = window.localStorage.getItem(dataName);

  return data ? deserialize(data) : null;
};


export function getTagTitlesAndIds(allTags: statefulTag[], allTasks: Task[]) {
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