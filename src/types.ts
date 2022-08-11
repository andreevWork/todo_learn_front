// Global types.
export type TagId = string;

export type Task = {
  title: string;
  tags: TagId[];
};


export type RawTag = {
  id: TagId;
  title: string;
};

export type Tag = RawTag & { active?: boolean; };


export type State = {
  tasks: Task[];
  tags: Tag[];
};
