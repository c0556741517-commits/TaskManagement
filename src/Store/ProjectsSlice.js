import { createSlice } from '@reduxjs/toolkit'
import { deleteTasks } from './TasksSlice';
import { useDispatch } from 'react-redux';
const initVal = {
    projectsList: [
        {
            id: 1,
            name: "Project 1",
            description: "Description 1",
            startDate: "2020-01-01",
            endDate: "2020-12-31",
            status: "Active",
            preference: "High"
        },
           {
            id: 2,
            name: "Project 2",
            description: "Description 2",
            startDate: "2020-01-01",
            endDate: "2020-12-31",
            status: "Active",
            preference: "High"
        }
    ] 
}

const ProjectsSlice = createSlice({
    name: "Projects",
    initialState: initVal,
    reducers: {
        add: (state, action) => {
            state.projectsList.push(action.payload);
        },
        deleteProject: (state, action) => {
            state.projectsList = state.projectsList.filter(p => p.id !== action.payload.id);
            const dispatch = useDispatch();
            dispatch(deleteTasks(action.payload.id))
        },
        updateProject: (state, action) => {
            const index = state.projectsList.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projectsList[index] = action.payload;
            }
        },
        updateProjectName: (state, action) => {
            const index = state.projectsList.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.projectsList[index].name = action.payload.name;
            }
        }
    }
})

export const { add, deleteProject, updateProject, updateProjectName } = ProjectsSlice.actions
export default ProjectsSlice.reducer