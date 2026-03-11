import React from 'react';
import { useForm } from 'react-hook-form';
import {Container,Box,Paper,Typography,TextField,Button,MenuItem,Stack,Alert,Snackbar} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate ,useParams} from 'react-router-dom';
import { add } from '../../Store/TasksSlice';

export default function AddTask() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
    Preference: 'Low',
    Status: 'ToDo',
    endDate: new Date().toISOString().split('T')[0],
    Name: '',
    Description: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const { id } = useParams();

  const onSubmit = (data) => {
    const newTask = {
      id: Date.now(),
      projid: id,
      name: data.Name,
      description: data.Description,
      endDate: data.endDate,
      status: data.Status,
      preference: data.Preference,
    };
    dispatch(add(newTask));
    setSuccessOpen(true);
    setTimeout(() => navigate(`/tasks/${id}`), 800);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)', py: 0, mt: '64px' }}>
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          borderRadius: 2,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#ffda3e' }}>
            Please fill in the details of your task
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              fullWidth
              {...register('Name', {
                required: 'Name is required',
                maxLength: { value: 80 },
              })}
              error={!!errors.Name}
              helperText={errors.Name?.message}
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              {...register('Description', {
                required: 'Description is required',
                maxLength: { value: 80 },
              })}
              error={!!errors.Description}
              helperText={errors.Description?.message}
              variant="outlined"
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              {...register('endDate', {
                required: 'End date is required',
              })}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Status"
              select
              fullWidth
              defaultValue="ToDo"
              {...register('Status')}
              variant="outlined"
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
              defaultValue="Low"
              {...register('Preference')}
              variant="outlined"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" fullWidth>
              Add Task
            </Button>
          </Stack>
        </form>
      </Paper>
      <Snackbar open={successOpen} autoHideDuration={800}>
        <Alert severity="success">Task added successfully!</Alert>
      </Snackbar>
    </Container>
  );
}
