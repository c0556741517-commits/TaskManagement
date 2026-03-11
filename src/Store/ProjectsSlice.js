import { createSlice } from '@reduxjs/toolkit'
const initVal = {
    projectsList: [] 
}

const ProjectsSlice = createSlice({
    name: "Projects",
    initialState: initVal,
    reducers: {
        add: (state, action) => {
            state.projectsList.push(action.payload);
        },
        deleteProject: (state, action) => {
            state.projectsList = state.projectsList.filter(p => p.id !== action.payload);
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