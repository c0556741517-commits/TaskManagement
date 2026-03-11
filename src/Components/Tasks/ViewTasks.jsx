import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, Grid, Divider, IconButton, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { updateTasks,deleteTasks } from '../../Store/TasksSlice';

export default function ViewTasks() {
  const Tasks = useSelector(state => state.tasks?.tasksList ?? []);
  const dispatch = useDispatch();
  const { projectId } = useParams();
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

  const renderTaskCard = (task) => (
    <Card key={task.id} variant="outlined" sx={{ width: '100%', '&:hover': { boxShadow: 3 } }}>
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
          value={getTaskValue(task, 'status')}
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
        <IconButton color="error" size="small" onClick={() => dispatch(deleteTasks(task.id))}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  const filteredTasks = Tasks.filter(task => task.projid == projectId);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Tasks
        </Typography>
        <Button
          component={Link}
          to={`/tasks/add/${projectId}`}
          variant="contained"
          color="primary"
          size="large"
          sx={{ textTransform: 'none' }}
        >
          + Add Task
        </Button>
      </Box>

      {filteredTasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tasks yet. Click "Add Task" to create one.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Box sx={{ flex: '1 1 0', backgroundColor: '#f5f5f5', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, width: '100%', textAlign: 'center' }}>
              ToDo
            </Typography>
            <Box sx={{ width: '95%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredTasks.filter(task => task.status === "ToDo").map(renderTaskCard)}
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 0', backgroundColor: '#fff3e0', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, width: '100%', textAlign: 'center' }}>
              In Progress
            </Typography>
            <Box sx={{ width: '95%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredTasks.filter(task => task.status === "In Progress").map(renderTaskCard)}
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 0', backgroundColor: '#e3f2fd', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, width: '100%', textAlign: 'center' }}>
              Review
            </Typography>
            <Box sx={{ width: '95%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredTasks.filter(task => task.status === "Review").map(renderTaskCard)}
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 0', backgroundColor: '#e8f5e9', p: 2, borderRadius: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, width: '100%', textAlign: 'center' }}>
              Completed
            </Typography>
            <Box sx={{ width: '95%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredTasks.filter(task => task.status === "Completed").map(renderTaskCard)}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
