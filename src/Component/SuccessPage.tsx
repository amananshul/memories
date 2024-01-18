import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme:any) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const SuccessPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigateToStep1 = () => {
    navigate('/step-1');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Typography variant="h5" align="center">
          Form Submitted Successfully!
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleNavigateToStep1}
        >
          Fill Another Form
        </Button>
      </div>
    </Container>
  );
};

export default SuccessPage;
