import React from 'react';
import styles from './TagList.module.css';
import clsx from 'clsx';

interface TagListProps {
  allTags: { title: string; active: boolean }[];
  selectTag: (index: number) => void;
}

export function TagList({ allTags, selectTag }: TagListProps) {
  return (
    <div className={styles.tags}>
      {allTags?.map(({ title, active }, index) => (
        <div
          key={index}
          className={clsx({
            [styles.activeTag]: active,
            [styles.tag]: !active,
          })}
          onClick={() => selectTag(index)}
        >
          {title}
        </div>
      ))}
    </div>
  );
}
