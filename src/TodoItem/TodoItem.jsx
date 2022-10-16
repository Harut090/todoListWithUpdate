import React from 'react';
import "./TodoItem.css";
import {useState} from "react";
import TodoForm from '../TodoForm';
import {deleteTodo, completeATodo,editAtodo} from "../store/TodoSlice";
import { useDispatch } from 'react-redux';

const TodoIteem =({todo})=>{
    const dispatch = useDispatch();
    const [id,setId]=useState("");
    const [newName,setNewName]=useState("");
    const confirme=(e)=>{
        e.preventDefault();
       dispatch( editAtodo({id:id,title:newName}));
       setNewName("");
       setId("");
    }
    return <div className="TodoItem">
        {id?<form className='editForm' onSubmit={confirme}><input type="text" className="editFormTodo" value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
        <button className="editButton">Submit</button></form>:<li className={todo.completed?"checked":""}><span className="todoSpan">{todo.title}</span><input  type="checkbox" onClick={(e)=>{e.preventDefault();dispatch(completeATodo(todo.id))}}/><button className="button" onClick={(e)=>{e.preventDefault();setId(todo.id)}}>Edit</button><button className="button" onClick={(e)=>{e.preventDefault();dispatch(deleteTodo(todo.id))}}>Cancel</button></li>}
    </div>
}

export default TodoIteem;