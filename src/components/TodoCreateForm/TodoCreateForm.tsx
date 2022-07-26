import React from 'react';
import styles from './TodoCreateForm.module.css';

interface Formprops {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
}

export function TodoCreateForm({ addTask, inputValue, setInputValue }: Formprops) {
  return (
    <div className={styles.container}>
      <input
        type='text'
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.button} onClick={addTask}>
        Add task
      </button>
    </div>
  );
}
