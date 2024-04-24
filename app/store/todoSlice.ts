import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TodoState {
  todoLists: Todo[];
}

export interface Todo {
  id: string;
  text: string;
  priority: "low" | "medium" | "high";
  date: string;
}

// Define the initial state using that type
const initialState: TodoState = {
  todoLists: [],
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todoLists.push(action.payload);
      console.log(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoLists = state.todoLists.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodo: (state, action: PayloadAction<any>) => {
      state.todoLists = state.todoLists.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
      });
    },
  },
});

export const { test, addTodo, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
