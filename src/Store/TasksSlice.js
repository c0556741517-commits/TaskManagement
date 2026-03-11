
import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    tasksList: [
        {
            projid: '1',
            id: 1,
            name: "Task 1", 
            description: "Description 1",
            endDate: "2020-12-31",
            status: "ToDo",
            preference: "High"
        },
        {
            projid: '1',
            id: 2,
            name: "Task 2", 
            description: "Description 2",
            endDate: "2020-12-31",
            status: "In Progress",
            preference: "Medium"
        },
        {
            projid: '2',
            id: 3,
            name: "Task 3", 
            description: "Description 3",
            endDate: "2020-12-31",
            status: "Review",
            preference: "Low"
        }
    ],
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