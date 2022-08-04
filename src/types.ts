// Global types.
type TagId = string;

export type Task = {
  title: string;
  tags: TagId[];
};


export type Tag = {
  id: TagId;
  title: string;
};

export type statefulTag = Tag & { active: boolean; };


export type tagsAndTagsType = {
  tasks: Task[];
  statefulTags: statefulTag[];
};