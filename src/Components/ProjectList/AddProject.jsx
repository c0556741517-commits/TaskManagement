import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { add } from '../../Store/ProjectsSlice';
import { Container, Paper, Box, Typography, TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function AddProject() {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const { register,handleSubmit,reset, formState: { errors },} = 
  useForm({
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  });
  const onSubmit = (data) => {
    dispatch(
      add({
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      })
      
    );
    navigate('/projects');
    reset();
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)', py: 0, mt: '64px' }}>
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          borderRadius: 3,
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
            Add New Project
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Enter project details and press save.
          </Typography>
        </Box>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <TextField
              label="Project Name"
              fullWidth
              variant="outlined"
              {...register('name', { required: 'Project name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              {...register('description')}
            />

            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...register('startDate')}
            />

            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...register('endDate')}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Save Project
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Project added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
