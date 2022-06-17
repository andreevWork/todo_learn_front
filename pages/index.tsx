import type { NextPage } from 'next'
import React, {Fragment, useState} from "react";
import {Header} from "../components/Header/Header";
import {TodoCreateForm} from "../components/TodoCreateForm/TodoCreateForm";
import {TodoList} from "../components/TodoList/TodoList";

const Home: NextPage = (p) => {
  const [tasks, setTasks] = useState<any>([]);
  const onCreateTask = (title: any) => {
      setTasks((stateTasks: any) => [...stateTasks, { title }]);
  }
  const onRemoveTask = (titleForRemove: any) => {
      setTasks((stateTasks: any) => stateTasks.filter(({ title }: any) => title !== titleForRemove));
  }

  return <Fragment>
    <Header />

    <TodoCreateForm onCreateTask={onCreateTask} />

    <TodoList onRemoveTask={onRemoveTask} tasks={tasks} />
  </Fragment>
}

export default Home
