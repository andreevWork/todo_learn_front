import styles from './TodoList.module.css';

export function TodoList(props: any) {
    return <div className={styles.container}>
        {props.tasks?.map((task: any) => <div className={styles.task}>
            {task.title}
        </div>)}
    </div>
}
