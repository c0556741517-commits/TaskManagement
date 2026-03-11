import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';
import projectsReducer from './ProjectsSlice';
import tasksReducer from './TasksSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export default store;
