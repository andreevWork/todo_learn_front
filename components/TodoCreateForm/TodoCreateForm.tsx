import styles from './TodoCreateForm.module.css';

export function TodoCreateForm() {
    return <div className={styles.container}>
        <input type="text" className={styles.input} />
        <button className={styles.button}>Add task</button>
    </div>
}
