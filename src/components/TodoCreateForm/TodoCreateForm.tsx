import React, {ForwardedRef, useImperativeHandle, useState} from 'react';
import styles from './TodoCreateForm.module.css';

interface FormProps {
  addTask: (title: string) => void;
}

export const TodoCreateForm = ({ addTask }: FormProps) => {
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div className={styles.container}>
            <input
                type='text'
                className={styles.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className={styles.button} onClick={() => addTask(inputValue)}>
                Add task
            </button>
        </div>
    );
};
