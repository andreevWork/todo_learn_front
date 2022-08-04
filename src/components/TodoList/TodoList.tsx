import React from 'react';
import styles from './TodoList.module.css';
import { Task } from '../../types';
import clsx from 'clsx';


interface TodoListProps {
  search: string,
  searchResult: Task[],
  handleDelete: (index: number) => void;
  taskClickHandler: (task: Task) => void;
}

// write a custom hook to take all the search tasks and searchInputValue and make TodoList display
// put all the business logic in the index file and see if you need context ....


export function TodoList({
  search,
  searchResult,
  handleDelete,
  taskClickHandler,
}: TodoListProps) {

  return (
    <div className={styles.container}>
      {searchResult.length > 0
        ? searchResult?.map((task: Task, index: number) => {
            const match = task.title.replace(
              new RegExp(search, 'gi'),
              (match) => `<span style="color:green">${match}</span>`
            );

            return (
              <div
                key={index}
                className={clsx(styles.task, {
                  [styles.searchedTask]:
                    search && task.title.toLowerCase().includes(search),
                })}
              >
                <div
                  className={styles.title}
                  onClick={() => taskClickHandler(task)}
                >
                  {search ? (
                    <span dangerouslySetInnerHTML={{ __html: match }} />
                  ) : (
                    task.title
                  )}
                  <span
                    className={clsx(styles.taskTag, {
                      [styles.searchedTaskTag]:
                        search &&
                        task.tags.join('').toLowerCase().includes(search),
                    })}
                  >
                    {' '}
                    {task.tags.join(',')}
                  </span>
                </div>
                <div
                  className={styles.delete}
                  onClick={() => handleDelete(index)}
                >
                  delete
                </div>
              </div>
            );
          })
        : searchResult.length === 0
        ? 'Sorry, no results found 🤷🏻‍♂️ 🤷🏻‍♂️ 🤷🏻‍♂️ ¯\\__(ツ)__/¯ '
        : ''}
    </div>
  );
}
