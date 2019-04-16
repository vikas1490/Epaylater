import React from 'react'
import { GoogleLogin } from 'react-google-login';
import classes from './login.module.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';


export default function login(props){
    
    let signInContent;
    if (props.values.isLoggedIn) {
      signInContent = (

        <AppBar position="static">
        <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container 
          spacing={24}
        >
          <Grid item>
          <Typography variant="h6" color="inherit" className={classes.grow} >
            EpayLater Open Library
          </Typography>
          </Grid>
          <Grid item>
          <Typography color="inherit" className={classes.in} variant="h6">
            Welcome {props.values.username}
          </Typography>
          <Button onClick={props.logout} color="inherit" className={classes.right}>
          Logout
          </Button>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
      );
    } else {
      signInContent = (
        <div className={classes.login}>
        <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Please Login with Google to Access Epaylater Library
        </Typography>
        <Typography variant="h5" component="h2">
        <GoogleLogin
            clientId="811271664442-mticckj2rn6t17pnhn5bjrmsfvrml0r2.apps.googleusercontent.com"
            render={renderProps => (
                <Button variant="contained" color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                 <Typography>
                  Google Login Button
                  </Typography>
                </Button>
            )}
            buttonText="Login"
            onSuccess={props.login}
            onFailure={props.login}
            cookiePolicy={'single_host_origin'}
        />
        
        </Typography>
      </CardContent>
    
    </Card>
        </div>
       
      );
    }

    return <div>{signInContent}</div>;
  }

