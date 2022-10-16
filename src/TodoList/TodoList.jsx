import React from 'react';
import {todosFetch} from "../store/TodoSlice";
import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import "./TodoList.css";
import TodoForm from '../TodoForm';
import TodoItem from '../TodoItem';
const TodoList=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(todosFetch()) 
    },[dispatch]);
    const todos=useSelector(state=>state.todos.todos);

    console.log(todos)
    return <div className="TodoList">
        <TodoForm/>
        {todos.map((todo)=>{
            return <TodoItem todo={todo} key={todo.id}/>
        })}
        
    </div>
}

export default TodoList 