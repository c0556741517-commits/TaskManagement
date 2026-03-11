import React, { useState,Suspense } from 'react'
import viteLogo from './assets/icon.png'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './Components/ResponsiveAppBar'
import LoginForm from './Components/Auth/LoginForm'


import AddProject from './Components/ProjectList/AddProject'
import ViewProjects from './Components/ProjectList/ViewProjects'
import AddTask from './Components/Tasks/AddTask'
import ViewTasks from './Components/Tasks/ViewTasks'
import UpdateTask from './Components/Tasks/UpdateTask'


const lazyLogin=React.lazy(() => import('./Components/Auth/LoginForm')) 
// const lazyHome=React.lazy(() => import('./Components/Home/HomePage'))
const LazyResponsiveAppBar=React.lazy(() => import('./Components/ResponsiveAppBar'))
const LazyAddProject=React.lazy(() => import('./Components/ProjectList/AddProject')) 
const LazyViewProjects=React.lazy(() => import('./Components/ProjectList/ViewProjects'))
const LazyAddTask=React.lazy(() => import('./Components/Tasks/AddTask'))
const LazyViewTasks=React.lazy(() => import('./Components/Tasks/ViewTasks'))
const LazyUpdateTask=React.lazy(() => import('./Components/Tasks/UpdateTask')) 
const LazyProjectEditing=React.lazy(() => import('./Components/ProjectList/ProjectEditing.jsx')) 
function App() {

  return (
    <BrowserRouter>
      <div style={{ paddingTop: '64px' }}>
        <ResponsiveAppBar/>
        <Routes>
          <Route path='/' element={<Suspense fallback={<div className="loading">טוען...</div>}><LoginForm /></Suspense>} />
          <Route path='/login' element={<Suspense fallback={<div className="loading">טוען...</div>}><LoginForm /></Suspense>} />
          <Route path='/projects' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyViewProjects /></Suspense>} />
          <Route path='/projects/add' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyAddProject /></Suspense>} />
          <Route path='/tasks' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyViewTasks /></Suspense>} />
          <Route path='/tasks/add' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyAddTask /></Suspense>} />
          <Route path='/tasks/update/:id' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyUpdateTask /></Suspense>} />
          <Route path='/projects/edit/:id' element={<Suspense fallback={<div className="loading">טוען...</div>}><LazyProjectEditing /></Suspense>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
