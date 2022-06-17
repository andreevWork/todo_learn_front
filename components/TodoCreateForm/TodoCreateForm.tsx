import styles from './TodoCreateForm.module.css';
import {useRef, useState} from "react";

export function TodoCreateForm({ onCreateTask }: any) {
    const onButtonClick = () => {
        onCreateTask(value);

        // Clear input after creating a task
        setValue('');
    };
    const inputRef = useRef(null);
    const [value, setValue] = useState('');


    return <div className={styles.container}>
        <input
            type="text"
            className={styles.input}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
            value={value}
        />
        <button className={styles.button} onClick={onButtonClick}>Add task</button>
    </div>
}
