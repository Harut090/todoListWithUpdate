import React from 'react';
import {useState} from "react";
import {addNewTodo} from "../store/TodoSlice";
import { useDispatch } from 'react-redux';
import "./TodoForm.css";

const TodoForm=(e)=>{
   
    const [title,setTitle]=useState("");
    const dispatch = useDispatch();
    const submit=(e)=>{
        e.preventDefault();
        dispatch(addNewTodo(title));
        setTitle('');
    }
    return (
        
            <form className="TodoForm" onSubmit={submit}>
                <input type="text" className="todoFormInput" placeholder="TodoItem" value={title} onChange={(e)=>{e.preventDefault();setTitle(e.target.value)}}/>
                <button className="submitItem">Submit</button>
            </form>
       
    )
}
export default TodoForm;
