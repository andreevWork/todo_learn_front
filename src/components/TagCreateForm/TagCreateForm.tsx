import React from 'react';
import styles from './TagCreateForm.module.css';

interface TagCreateFormProps {
  tagText: string;
  setTagText: React.Dispatch<React.SetStateAction<string>>;
  addTag: () => void;
}

export function TagCreateForm({ tagText, setTagText, addTag }: TagCreateFormProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={tagText}
        onChange={(e) => setTagText(e.target.value)}
      ></input>
      <button className={styles.button} onClick={addTag}>
        Add tag
      </button>
    </div>
  );
}
