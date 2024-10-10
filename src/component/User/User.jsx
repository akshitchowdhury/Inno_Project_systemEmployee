



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProjects, fetchUsers, loggedOutUser, updateWorkMode } from '../Reducers/AuthSlice';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import { Email as EmailIcon, Work as WorkIcon, Logout as LogoutIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const User = () => {
  const { user, projectList } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workMode, setWorkMode] = useState('');

  const handleLogout = () => {
    dispatch(loggedOutUser())
      .unwrap()
      .then(() => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login');
      })
      .catch((err) => console.error(err));
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    dispatch(updateWorkMode({ id: user._id, isPresent: workMode }))
      .unwrap()
      .then((response) => {
        console.log('Work Mode Updated:', response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  const assignedProject = projectList.find(
    (project) => project.assignedTo === user.username
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{user.username[0]}</Avatar>
                <Typography variant="h4" component="h1">
                  Welcome, {user.username}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              Employee ID: {user.empId}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Department: {user.department}
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Work Mode
              </Typography>
              <form onSubmit={handleSubmission}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="work-mode-label">Select Work Mode</InputLabel>
                  <Select
                    labelId="work-mode-label"
                    id="workMode"
                    value={workMode}
                    label="Select Work Mode"
                    onChange={(e) => setWorkMode(e.target.value)}
                  >
                    <MenuItem value="" disabled>-- Select an Option --</MenuItem>
                    <MenuItem value="WFO">Working from Office (WFO)</MenuItem>
                    <MenuItem value="WFH">Working from Home (WFH)</MenuItem>
                    <MenuItem value="Leave">Leave</MenuItem>
                    <MenuItem value="Off Duty">Logging Out</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </form>
              <Typography variant="body2" color="textSecondary" mt={2}>
                Current Mode: {user.isPresent}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assigned Project
              </Typography>
              {assignedProject ? (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {assignedProject.projectName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Status: {!assignedProject.projectStatus ? 'Ongoing' : 'Completed'}
                  </Typography>
                  <Typography variant="body2">
                    Description: {assignedProject.projectDescription}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">No assigned project found</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  component={Link}
                  to="/sendMail"
                  variant="contained"
                  color="primary"
                  startIcon={<EmailIcon />}
                  fullWidth
                >
                  Send Mail
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  component={Link}
                  to="/receiveMail"
                  variant="contained"
                  color="secondary"
                  startIcon={<EmailIcon />}
                  fullWidth
                >
                  Check Mail
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default User;