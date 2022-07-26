import React, { useState } from 'react';
import styles from './TodoList.module.css';
import { Task } from '../../types';
import { levenshteinDistance } from '../../../utils/levenshtein';
import clsx from 'clsx';
import { debounce } from '../../../utils/debounce';

interface TodoListProps {
  tasks: Task[];
  handleDelete: (index: number) => void;
  taskClickHandler: (task: Task) => void;
  searchInputValue: string;
}

//create use effect and recalculate how you display tag titles.

// create custom hooks as well.

export function TodoList({
  tasks,
  handleDelete,
  taskClickHandler,
  searchInputValue,
}: TodoListProps) {
  const search = searchInputValue.toLowerCase().trim();
  const searchResult = tasks.filter((task) => {
    return (
      levenshteinDistance(task.title.toLowerCase(), search) <= 2 ||
      task.tags.join('').toLowerCase().includes(search) ||
      task.title.toLocaleLowerCase().includes(search)
    );
  });

  


  // const searchFunction: () => any = () => {
  //   searchResult.length > 0
  //       ? searchResult?.map((task: Task, index: number) => {
  //           const match = task.title.replace(
  //             new RegExp(search, 'gi'),
  //             (match) => `<span style="color:green">${match}</span>`
  //           );

  //           return (
  //             <div
  //               key={index}
  //               className={clsx(styles.task, {
  //                 [styles.searchedTask]:
  //                   search && task.title.toLowerCase().includes(search),
  //               })}
  //             >
  //               <div
  //                 className={styles.title}
  //                 onClick={() => taskClickHandler(task)}
  //               >
  //                 {search ? (
  //                   <span dangerouslySetInnerHTML={{ __html: match }} />
  //                 ) : (
  //                   task.title
  //                 )}
  //                 <span
  //                   className={clsx(styles.taskTag, {
  //                     [styles.searchedTaskTag]:
  //                       search &&
  //                       task.tags.join('').toLowerCase().includes(search),
  //                   })}
  //                 >
  //                   {' '}
  //                   {task.tags.join(',')}
  //                 </span>
  //               </div>
  //               <div
  //                 className={styles.delete}
  //                 onClick={() => handleDelete(index)}
  //               >
  //                 delete
  //               </div>
  //             </div>
  //           );
  //         })
  //       : tasks.length > 0
  //       ? 'Sorry, no results found 🤷🏻‍♂️ 🤷🏻‍♂️ 🤷🏻‍♂️ ¯\\__(ツ)__/¯ '
  //       : ''
  // }


  // const debouncedSearch = debounce(searchFunction, 300)

  return (
    <div className={styles.container}>
      {/* {debouncedSearch()} */}


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
        : tasks.length > 0
        ? 'Sorry, no results found 🤷🏻‍♂️ 🤷🏻‍♂️ 🤷🏻‍♂️ ¯\\__(ツ)__/¯ '
        : ''}
    </div>
  );
}
