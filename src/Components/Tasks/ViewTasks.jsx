// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import {Container,Box,Typography,Button,Card,CardContent,CardActions,Stack,Divider,Alert,IconButton} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, {  useEffect } from 'react'
// import { useParams } from "react-router-dom"
// export default function ViewTasks() {
//   const Tasks = useSelector(state => state.Tasks?.tasklist ?? []);
//   const { id } = useParams();
//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//         (
//           <>
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
//               <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
//                 Tasks
//               </Typography>
//               <Button
//                 component={Link}
//                 to="/tasks/add"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 sx={{ textTransform: 'none', mt: 2 }}
//               >
//                 + Add Tasks
//               </Button>
//             </Box>

//             {Tasks.length === 0 ? (
//               <Typography variant="body1" color="text.secondary">
//                 No tasks yet. Click “Add Task" to create one.
//               </Typography>
//             ) : (
//               <Stack spacing={2}>
//                 {Tasks.map(task => (
//                     task.projid==id&&
//                  (task.status==="ToDo"&&(
//                   <Card key={task.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
//                     <CardContent>
//                       <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
//                         {task.name}
//                       </Typography>
//                       {task.description && (
//                         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                           {task.description}
//                         </Typography>
//                       )}
//                       <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
//                         {task.endDate && (
//                           <Typography variant="caption" color="text.secondary">
//                             EndingDate: {task.endDate}
//                           </Typography>
//                         )}
//                       </Box>
//                          <TextField
//                        label="status"
//                        select
//                        fullWidth
//                        {...register('status')}
//                       defaultValue="ToDo"
//                        variant="outlined"
//                     >
//               <MenuItem value="ToDo">ToDo</MenuItem>
//               <MenuItem value="In Progress">In Progress</MenuItem>
//               <MenuItem value="Reveiw">Reveiw</MenuItem>
//               <MenuItem value="Complited">Complited</MenuItem>
//             </TextField>
//                <TextField
//                        label="preference"
//                        select
//                        fullWidth
//                        {...register('preference')}
//                       defaultValue="ToDo"
//                        variant="outlined"
//                     >
//               <MenuItem value="High">High</MenuItem>
//               <MenuItem value="Medium">Medium</MenuItem>
//               <MenuItem value="Low">Low</MenuItem>
//             </TextField>
//                     </CardContent>
//                     <Divider />
//                     <CardActions sx={{ justifyContent: 'flex-end' }}>
//                       <Button
//                         component={Link}
//                         to={`/tasks/${task.id}`}
//                         size="small"
//                         sx={{ textTransform: 'none' }}
//                       >
//                         View / Edit
//                       </Button>
//                       <IconButton color="error" size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </CardActions>
//                   </Card>
//                     ))
//                 ))}
//               </Stack>
//             )}
//           </>
//         )
//     </Container>
//   );
// }
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, Stack, Divider, IconButton, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { updateTasks } from '../../Store/TasksSlice';

export default function ViewTasks() {
  const Tasks = useSelector(state => state.Tasks?.tasklist ?? []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editedTasks, setEditedTasks] = useState({});

  const handleFieldChange = (taskId, field, value) => {
    setEditedTasks(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  };

  const handleSave = (task) => {
    const updates = editedTasks[task.id];
    if (updates) {
      const updatedTask = { ...task, ...updates };
      dispatch(updateTasks(updatedTask));
      setEditedTasks(prev => {
        const newState = { ...prev };
        delete newState[task.id];
        return newState;
      });
    }
  };

  const getTaskValue = (task, field) => {
    return editedTasks[task.id]?.[field] ?? task[field] ?? "";
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Tasks
        </Typography>
        <Button
          component={Link}
          to="/tasks/add"
          variant="contained"
          color="primary"
          size="large"
          sx={{ textTransform: 'none', mt: 2 }}
        >
          + Add Tasks
        </Button>
      </Box>

      {Tasks.filter(task => task.projid == id).length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tasks yet. Click "Add Task" to create one.
        </Typography>
      ) : (
        <>
        <Container>
        <Stack spacing={2}>
          {Tasks.filter(task => task.projid == id).filter(task=>task.status==="ToDo").map(task => (
            <Card key={task.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <TextField
                  label="Name"
                  fullWidth
                  value={getTaskValue(task, 'name')}
                  onChange={(e) => handleFieldChange(task.id, 'name', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={getTaskValue(task, 'description')}
                  onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={getTaskValue(task, 'endDate')}
                  onChange={(e) => handleFieldChange(task.id, 'endDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Status"
                  select
                  fullWidth
                  value={getTaskValue(task, 'status') || "ToDo"}
                  onChange={(e) => handleFieldChange(task.id, 'status', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="ToDo">ToDo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  label="Preference"
                  select
                  fullWidth
                  value={getTaskValue(task, 'preference') || "Medium"}
                  onChange={(e) => handleFieldChange(task.id, 'preference', e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave(task)}
                  disabled={!editedTasks[task.id]}
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
                <Box>
                  <Button
                    component={Link}
                    to={`/tasks/${task.id}`}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View / Edit
                  </Button>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Stack>
        <Stack spacing={2}>
          {Tasks.filter(task => task.projid == id).filter(task=>task.status==="In Progress").map(task => (
            <Card key={task.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <TextField
                  label="Name"
                  fullWidth
                  value={getTaskValue(task, 'name')}
                  onChange={(e) => handleFieldChange(task.id, 'name', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={getTaskValue(task, 'description')}
                  onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={getTaskValue(task, 'endDate')}
                  onChange={(e) => handleFieldChange(task.id, 'endDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Status"
                  select
                  fullWidth
                  value={getTaskValue(task, 'status') || "In Progress"}
                  onChange={(e) => handleFieldChange(task.id, 'status', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="ToDo">ToDo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  label="Preference"
                  select
                  fullWidth
                  value={getTaskValue(task, 'preference') || "Medium"}
                  onChange={(e) => handleFieldChange(task.id, 'preference', e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave(task)}
                  disabled={!editedTasks[task.id]}
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
                <Box>
                  <Button
                    component={Link}
                    to={`/tasks/${task.id}`}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View / Edit
                  </Button>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Stack>
        <Stack spacing={2}>
          {Tasks.filter(task => task.projid == id).filter(task=>task.status==="Review").map(task => (
            <Card key={task.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <TextField
                  label="Name"
                  fullWidth
                  value={getTaskValue(task, 'name')}
                  onChange={(e) => handleFieldChange(task.id, 'name', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={getTaskValue(task, 'description')}
                  onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={getTaskValue(task, 'endDate')}
                  onChange={(e) => handleFieldChange(task.id, 'endDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Status"
                  select
                  fullWidth
                  value={getTaskValue(task, 'status') || "Review"}
                  onChange={(e) => handleFieldChange(task.id, 'status', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="ToDo">ToDo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  label="Preference"
                  select
                  fullWidth
                  value={getTaskValue(task, 'preference') || "Medium"}
                  onChange={(e) => handleFieldChange(task.id, 'preference', e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave(task)}
                  disabled={!editedTasks[task.id]}
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
                <Box>
                  <Button
                    component={Link}
                    to={`/tasks/${task.id}`}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View / Edit
                  </Button>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Stack>
        <Stack spacing={2}>
          {Tasks.filter(task => task.projid == id).filter(task=>task.status==="Completed").map(task => (
            <Card key={task.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
              <CardContent>
                <TextField
                  label="Name"
                  fullWidth
                  value={getTaskValue(task, 'name')}
                  onChange={(e) => handleFieldChange(task.id, 'name', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={getTaskValue(task, 'description')}
                  onChange={(e) => handleFieldChange(task.id, 'description', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={getTaskValue(task, 'endDate')}
                  onChange={(e) => handleFieldChange(task.id, 'endDate', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Status"
                  select
                  fullWidth
                  value={getTaskValue(task, 'status') || "Completed"}
                  onChange={(e) => handleFieldChange(task.id, 'status', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="ToDo">ToDo</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField
                  label="Preference"
                  select
                  fullWidth
                  value={getTaskValue(task, 'preference') || "Medium"}
                  onChange={(e) => handleFieldChange(task.id, 'preference', e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave(task)}
                  disabled={!editedTasks[task.id]}
                  sx={{ textTransform: 'none' }}
                >
                  Save
                </Button>
                <Box>
                  <Button
                    component={Link}
                    to={`/tasks/${task.id}`}
                    size="small"
                    sx={{ textTransform: 'none' }}
                  >
                    View / Edit
                  </Button>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Stack>
        </Container>
        </>
      )}
    </Container>
  );
}
