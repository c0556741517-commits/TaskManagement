import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateProject } from '../../Store/ProjectsSlice';
import { Container, Paper, Box, Typography, TextField, Button, Stack, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
export default function ProjectEditing() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
 const existingProject = useSelector((state) => 
    state.projects?.projectsList?.find((p) => p.id === id)
  );
   const { register, handleSubmit, reset, formState: { errors }, } =
    useForm({
      defaultValues: {
       name: existingProject?.name || '',
      description: existingProject?.description || '',
      startDate: existingProject?.startDate || '',
      endDate: existingProject?.endDate || '',
      },
    });
  const onSubmit = (data) => {
    dispatch(
      updateProject({
       id: id, 
        ...data
      })

    );
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
            Edit Project
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            Update project details and press save.
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
         successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
