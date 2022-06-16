import type { NextPage } from 'next'
import React, {Fragment} from "react";
import {Header} from "../components/Header/Header";
import {TodoCreateForm} from "../components/TodoCreateForm/TodoCreateForm";
import {TodoList} from "../components/TodoList/TodoList";

const Home: NextPage = (p) => {
  return <Fragment>
    <Header />

    <TodoCreateForm />

    <TodoList tasks={[{ title: 'test' }]} />
  </Fragment>
}

export default Home
