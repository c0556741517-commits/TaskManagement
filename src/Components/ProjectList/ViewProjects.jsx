import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Card, CardContent, CardActions, Stack, Divider, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from '../../Store/ProjectsSlice';

export default function ViewProjects() {
  const projects = useSelector(state => state.projects?.projectsList ?? []);
  const userFirstName = useSelector(state => state.login.userFirstName);
  const isLoggedIn = Boolean(userFirstName);
  const dispatch = useDispatch();

 
  return (

    <Container maxWidth="md" sx={{ py: 4 }}>
      {!isLoggedIn ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          כדי לראות את הפרויקטים ולהוסיף חדשים, יש להתחבר או להירשם.
        </Alert>
      ) :
        (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                Projects
              </Typography>
              <Button
                component={Link}
                to="/projects/add"
                variant="contained"
                color="primary"
                size="large"
                sx={{ textTransform: 'none', mt: 2 }}
              >
                + Add Project
              </Button>
            </Box>

            {projects.length === 0 ? (
              <Typography variant="body1" color="text.secondary">
                No projects yet. Click “Add Project” to create one.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {projects.map(project => (
                  <Card key={project.id} variant="outlined" sx={{ '&:hover': { boxShadow: 3 } }}>
                    <Link to={`/tasks/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <CardContent>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                          {project.name}
                        </Typography>
                        {project.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {project.description}
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                          {project.startDate && (
                            <Typography variant="caption" color="text.secondary">
                              Start: {project.startDate}
                            </Typography>
                          )}
                          {project.endDate && (
                            <Typography variant="caption" color="text.secondary">
                              End: {project.endDate}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Link>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button
                        component={Link}
                        to={`/projects/edit/${project.id}`}
                        size="small"
                        sx={{ textTransform: 'none', zIndex: 1 }} // zIndex to ensure it's clickable over the link
                      >
                        View / Edit
                      </Button>
                      <IconButton color="error" size="small" onClick={() => dispatch(deleteProject(project.id))} sx={{ zIndex: 1 }}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            )}
          </>
        )}
    </Container>
  );
}
