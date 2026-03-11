
import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    tasksList: [] ,

}

const TasksSlice = createSlice({
    name: "tasks",
    initialState: initVal,
    reducers: {
        add: (state, action) => {
            state.tasksList.push(action.payload);
        },
        deleteTasks: (state, action) => {
            state.tasksList = state.tasksList.filter(p => p.id !== action.payload);
        },
        updateTasks: (state, action) => {
            const index = state.tasksList.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.tasksList[index] = action.payload;
            }
        },
        updateTaskStatus: (state, action) => {
            const { id, newStatus } = action.payload;
            const task = state.tasksList.find(task => task.id === id);
            if (task) {
                task.status = newStatus;
            }
        }
    }
})

export const { add, deleteTasks, updateTasks } = TasksSlice.actions
export default TasksSlice.reducer