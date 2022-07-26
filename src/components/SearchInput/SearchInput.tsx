import React from 'react';
import styles from './SearchInput.module.css';

type SearchInputPropType = {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchInput = ({
  searchInputValue,
  setSearchInputValue,
}: SearchInputPropType) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        onChange={(event) => handleChange(event)}
        value={searchInputValue}
      />
      <button className={styles.button}>Search</button>
    </div>
  );
};
