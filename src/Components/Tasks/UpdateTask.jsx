// import { useParams } from "react-router-dom"
// import '../../Store/TasksSlice';

//  function getAllToDo( projid){
//  yield return (

//  )
// }
//  function getAllInProgress(projid){
//  yield return (

//  )
// }
//  function getAllComplitedComplited(projid){
//  yield return (

//  )
// }
//  function getAllReveiw(projid){
//  yield return (

//  )
// }
export default function UpdateTask()
 {
  return (
    <div>
      <h1> UpdateTask</h1>
    </div>
    // <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 64px)', py: 0, mt: '64px' }}>
    //   <Paper
    //     elevation={4}
    //     sx={{
    //       padding: 2,
    //       borderRadius: 2,
    //       width: '100%',
    //       backgroundColor: '#ffffff',
    //     }}
    //   >
    //       <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color:  '#a5dce9', mb: 1 }}>
    //         Welcome
    //       </Typography>
    //       <Typography variant="body2" sx={{ color: '#ffda3e' }}>
    //         Please fill in your information to continue
    //       </Typography>
    //     </Box>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Stack spacing={2.5}>
    //         <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    //           <TextField
    //             label="First Name"
    //             size="medium"
    //             fullWidth
    //             {...register('firstName', {
    //               required: 'First name is required',
    //               maxLength: { value: 80, message: 'Maximum 80 characters' },
    //             })}
    //             error={!!errors.firstName}
    //             helperText={errors.firstName?.message}
    //             variant="outlined"
    //           />
    //           <TextField
    //             label="Last Name"
    //             size="medium"
    //             fullWidth
    //             {...register('lastName', {
    //               required: 'Last name is required',
    //               maxLength: { value: 100, message: 'Maximum 100 characters' },
    //             })}
    //             error={!!errors.lastName}
    //             helperText={errors.lastName?.message}
    //             variant="outlined"
    //           />
    //         </Box>
    //         <TextField
    //           label="Email Address"
    //           type="email"
    //           fullWidth
    //           {...register('email', {
    //             required: 'Email is required',
    //             pattern: {
    //               value: /^\S+@\S+$/i,
    //               message: 'Invalid email address',
    //             },
    //           })}
    //           error={!!errors.email}
    //           helperText={errors.email?.message}
    //           variant="outlined"
    //         />
    //          <TextField
    //           label="Password"
    //           type="password"
    //           fullWidth
    //           {...register('password', {
    //             required: 'Password is required',
    //             pattern: {
    //               value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //               message: 'Invalid password',
    //             },
    //           })}
    //           error={!!errors.password}
    //           helperText={errors.password?.message}
    //           variant="outlined"
    //         />
    //         <TextField
    //           label="Mobile Number"
    //           type="tel"
    //           fullWidth
    //           {...register('mobileNumber', {
    //             required: 'Mobile number is required',
    //             minLength: { value: 6, message: 'Minimum 6 characters' },
    //             maxLength: { value: 12, message: 'Maximum 12 characters' },
    //           })}
    //           error={!!errors.mobileNumber}
    //           helperText={errors.mobileNumber?.message}
    //           variant="outlined"
    //         />
    //         <TextField
    //           label="Stage"
    //           select
    //           fullWidth
    //           {...register('Stage')}
    //           defaultValue="ToDo"
    //           variant="outlined"
    //         >
    //           <MenuItem value="ToDo">ToDo</MenuItem>
    //           <MenuItem value="In Progress">In Progress</MenuItem>
    //           <MenuItem value="Reveiw">Reveiw</MenuItem>
    //           <MenuItem value="Complited">Complited</MenuItem>
    //         </TextField>
    //         <Button
    //           type="submit"
    //           variant="contained"
    //           size="large"
    //           fullWidth
    //           sx={{
    //             mt: 2,
    //             py: 1.5,
    //             fontSize: '1rem',
    //             fontWeight: 600,
    //             textTransform: 'none',
    //                backgroundColor: '#a5dce9',
    //             '&:hover': {
    //             backgroundColor: '#96cfdd',
    //             },
    //           }}
    //         >
    //           Sign In
    //         </Button>
    //       </Stack>
    //     </form>
              
    // </Container>
  );
}

//  return (
//     <div className="recipe-details-container">
//       {rec.favorite && <div className="favorite-badge">⭐ מתכון מועדף</div>}
//       <h2 style={{color: '#667eea', marginBottom: '20px', fontSize: '2em'}}>
//         {rec.name}
//       </h2>
//       <p><strong>⏱️ זמן הכנה:</strong> {rec.time} דקות</p>
//       <p><strong>🏷️ קטגוריה:</strong> {rec.category}</p>
//       <p><strong>🥘 מרכיבים:</strong> {rec.ingridients.join(', ')}</p>
//       <button onClick={Favorite}>
//         {rec.favorite ? "💔 הסר מהמועדפים" : "💖 הוסף למועדפים"}
//       </button>
//     </div>
//   )