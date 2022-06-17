import styles from './TodoList.module.css';
import {RemoveIcon} from "./RemoveIcon";

export function TodoList(props: any) {
    return <div className={styles.container}>
        {props.tasks?.map((task: any, index: number) => <div key={index} className={styles.task}>
            <div>
                {task.title}
            </div>
            <RemoveIcon onClick={() => props.onRemoveTask(task.title)} className={styles.removeIcon} />
        </div>)}
    </div>
}
