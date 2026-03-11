import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
  Avatar,
  IconButton,
  Menu,
  Alert,
  Snackbar,
} from '@mui/material';
import { PhotoCamera, CameraAlt, PhotoLibrary } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../Store/LoginSlice';
export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: '',
      avatar: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = watch();
  const [avatarPreview, setAvatarPreview] = React.useState('');
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleFileUpload = () => {
    document.getElementById('file-upload').click();
    handleMenuClose();
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setValue('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowCamera(true);
      handleMenuClose();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };
  
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const dataURL = canvas.toDataURL('image/png');
    setAvatarPreview(dataURL);
    setValue('avatar', dataURL);
    
    video.srcObject.getTracks().forEach(track => track.stop());
    setShowCamera(false);
  };
  
  const cancelCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };
  const onSubmit = (data) => {
    dispatch(
      logIn({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password,
        avatar: data.avatar,
      })
    );
    setSuccessOpen(true);
    setTimeout(() => navigate('/projects'), 800);
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
          <Box sx={{ mb: 2 }}>
            <TextField
              {...register('avatar', {
                validate: value => value !== '' || 'Profile picture is required',
              })}
              error={!!errors.avatar}
              helperText={errors.avatar?.message}
              sx={{ display: 'none' }}
            />
            <Avatar
              src={avatarPreview}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {errors.avatar && (
              <Typography color="error" variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                {errors.avatar.message}
              </Typography>
            )}
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color:  '#a5dce9', mb: 1 }}>
            Welcome
          </Typography>
          <Typography variant="body2" sx={{ color: '#ffda3e' }}>
            Please fill in your information to continue
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="First Name"
                size="medium"
                fullWidth
                {...register('firstName', {
                  required: 'First name is required',
                  maxLength: { value: 80, message: 'Maximum 80 characters' },
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
              />
              <TextField
                label="Last Name"
                size="medium"
                fullWidth
                {...register('lastName', {
                  required: 'Last name is required',
                  maxLength: { value: 100, message: 'Maximum 100 characters' },
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="outlined"
              />
            </Box>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
            />
             <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Invalid password',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
            />
            <TextField
              label="Mobile Number"
              type="tel"
              fullWidth
              {...register('mobileNumber', {
                required: 'Mobile number is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                maxLength: { value: 12, message: 'Maximum 12 characters' },
              })}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                   backgroundColor: '#a5dce9',
                '&:hover': {
                backgroundColor: '#96cfdd',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={successOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
          התחברת בהצלחה!!
          מעביר אותך לדף הפרויקטים...
        </Alert>
      </Snackbar>
    </Container>
  );
}