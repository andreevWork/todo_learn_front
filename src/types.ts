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
