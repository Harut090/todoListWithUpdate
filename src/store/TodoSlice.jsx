import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const todosFetch = createAsyncThunk(
    "users/todosFetch",
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos/?_limit=5");
            if (!response.ok) {
                throw new Error("The address is not valid");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);

        }
    }
);

export const deleteTodo = createAsyncThunk(
    "users/deleteTodo",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Can't delete this item");
            }
            dispatch(removeTodo(id))
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    "todo/fetchTodo",
    async function (item, { rejectWithValue, dispatch }) {

        const todo = { userId: 1, title: item, completed: false }
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(todo) });
            if (!response.ok) {
                throw new Error("Can't add this item");
            }
            const data = await response.json();

            dispatch(addTodo(data))
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const completeATodo = createAsyncThunk(
    "completetodo/chengeTodo",
    async function (id, { rejectWithValue, dispatch,getState}) {
        
        try {
            const item=getState().todos.todos.find((todo)=>{
                return id==todo.id
            })
            
           
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({completed:!item.completed}) })
            if (!response.ok) {
                throw new Error("Can't complete this item");
            }
            dispatch(completeTodo(id))
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const editAtodo = createAsyncThunk(
    "edite/editTodo",
    async function (item, { rejectWithValue, dispatch }) {
        try {
            const id = item.id;
            const todo = { userId: 1, title: item.title, completed: false };
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(todo) })
            if (!response.ok) {
                throw new Error("Can't edit this item");
            }
            const data = await response.json();
            dispatch(editTodo(data))
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            // console.log(action.payload)
            state.todos.push(action.payload);
        },
        completeTodo(state, action) {
            console.log(action.payload);
            state.todos=state.todos.map((todo) => {
                if (todo.id === parseInt(action.payload)) {
                   
                    return {...todo,completed:!todo.completed};
                }
                return todo;
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter((todo) => {
                return todo.id !==parseInt(action.payload)
            })
        },
        editTodo(state, action) {
            console.log(action.payload);
           state.todos= state.todos.map((todo) => {
                if (todo.id === parseInt(action.payload.id)) {
                    return action.payload;
                }
                return todo;
            })
        }
    },
    extraReducers: {
        [todosFetch.pending]: (state, action) => {
            state.status = "Loading";
            state.error = null;
        }, [todosFetch.fulfilled]: (state, action) => {
            state.status = "Resolveed";
            state.todos = action.payload;
        },
        [todosFetch.rejected]: (state, action) => {
            state.status = "Rejected";
            state.error = action.payload;
        }

    }

})

const { addTodo, completeTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;



