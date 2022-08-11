import React from 'react';
import styles from './TagList.module.css';
import clsx from 'clsx';
import {Tag, TagId} from "../../types";

interface TagListProps {
  allTags: Tag[];
  selectTag: (tagId: TagId) => void;
}

export function TagList({ allTags, selectTag }: TagListProps) {
  return (
    <div className={styles.tags}>
      {allTags?.map(({ title, active, id }) => (
        <div
          key={id}
          className={clsx(styles.tag, { [styles.activeTag]: Boolean(active) })}
          onClick={() => selectTag(id)}
        >
          {title}
        </div>
      ))}
    </div>
  );
}
