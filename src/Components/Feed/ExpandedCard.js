import React from 'react';
import { Grid, Typography,Button } from "@material-ui/core";
import firebase from 'firebase';
import axios from 'axios';
import AppBar from './AppBarWithBack';
import './ExpandedCard.css'


import { ReactComponent as Logo } from '../../Assets/svg/telegram.svg';
import { ReactComponent as Like } from '../../Assets/svg/like.svg';
import Fab from '@material-ui/core/Fab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Link } from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import { async } from 'q';
import {success} from '../../Helpers/validates';

const theme = createMuiTheme({
    palette: {
      primary: { main: "#44a1f2" },
      secondary: { main: '#11cb5f' },
    },
    typography: { useNextVariants: true },
    overrides: {
        MuiButton: {
          raisedPrimary: {
            color: 'white',
          },
        },
    },
});

class ExpandedCard extends React.Component {
    
    state = {
        tutoringName: '',
        tutoringDescription: '',
        tutoringTheme: '',
        monitorName: '',
        photo: '',
        telegram:'',
        id_monitor:'',
        id_user:'',
        id_tutoring:'',
        likes: '',
        total_likes: 0,
        object_like: [],
        user_liked: false,
        person: [],
    }

    componentDidMount =  async () => {
        var token = {};
        var idTutoring = this.props.match.params.id_tutoring;
        
        this.setState({id_tutoring:idTutoring});
        await firebase.auth().onAuthStateChanged(user =>{
            this.setState({isSignedIn: !!user});
            if(user){
                this.setState({id_user:user.uid})
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                    token["id_tutoring_session"] = idTutoring;
                });
                
                axios.post(process.env.REACT_APP_GATEWAY+"/get_tutoring/", token)
                    .then(res => {
                        this.setState({person:res.data});
                        console.log(this.state.person);
                        for(let cont = 0; cont < this.state.person.total_likes; cont++){
                            this.state.object_like[cont]= this.state.person.likes[cont];
                        }
                       for(let cont = 0; cont < this.state.person.total_likes; cont++){
                            if(this.state.object_like[cont].user_that_likes.user_account_id == this.state.id_user){
                                this.setState({user_liked:true});
                            }
                       } 
                       this.setState({tutoringName:this.state.person.name, tutoringTheme:this.state.person.subject, tutoringDescription:this.state.person.description,
                        monitorName: this.state.person.monitor.name, photo:this.state.person.monitor.photo, telegram:this.state.person.monitor.telegram,
                        id_monitor:this.state.person.monitor.user_account_id, likes:this.state.person.likes,
                        total_likes:this.state.person.total_likes});      
                    });
            
            }else{
                this.props.history.push('/');
            }
        });    
    }
    
    
    validateLike = async() => {
        
        if(this.user_liked == false){
            this.createLike();
        }
        

}

    createLike = async() =>{
        
        var token = {};
        var idTutoring = this.props.match.params.id_tutoring;
        token["user_that_likes"] = this.state.id_user;
        token["tutoring_session"] = idTutoring;

        firebase.auth().onAuthStateChanged(user =>{
            this.setState({isSignedIn: !!user});
            if(user){
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                });
                axios.post(process.env.REACT_APP_GATEWAY+"/like_tutoring/", token).then((x)=>{
                    if(success(x)) {
                      
                    }
                  });
            }
        });  
    }
    
    deleteLike = async() =>{
        
        var token = {};
        var idTutoring = this.props.match.params.id_tutoring;
        
        
        for(let cont = 0; cont < this.state.total_likes; cont++){
            if(this.state.object_like[cont].user_that_likes.user_account_id == this.state.id_user){
                token["id_like"] = this.state.object_like[cont].id_like;
                this.state.object_like.splice(cont, 1);
            }
       }
        await firebase.auth().onAuthStateChanged(user =>{
            this.setState({isSignedIn: !!user});
            if(user){
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["access_token"] = idToken;
                });
                axios.post(process.env.REACT_APP_GATEWAY+"/like_delete/", token).then((x)=>{
                    if(success(x)) {
                        
                    }
                  });
            }
        });
    }
  render() {
    var texto =  this.state.telegram;
    var er = texto;
    texto = er.replace('@','');
        
    var photoUrl = this.state.photo;
    if( photoUrl != null ){
        photoUrl = photoUrl.replace("api-monitoria","localhost")
      } else {
        photoUrl = "https://cdn-eleicoes.gazetadopovo.com.br/fotos/sao-paulo/deputado-federal/batore-1444.jpg"
      }

    return (
        <div className='div'>
            
            <Grid style={{position: "absolute"}} container justify="center" alignItems="stretch">
               <AppBar/>    
            </Grid>            
            <Grid container justify="center" direction="row" style={{paddingTop:80, paddingLeft:15,paddingBottom:15}} className="teste" >              
                <Grid item>                            
                    <img src={photoUrl} style={{width:140, height:140}}></img>
                </Grid>
                <Grid item>    
                    <Grid container justify="center" direction="column" alignItems="center" alignContent="center">
                        <Grid item style={{marginTop:50}} style={{marginLeft:50}} >
                            <h1>Monitor</h1>
                        </Grid>
                        <Grid item>
                            <Typography style={{marginLeft:50}}>
                                Nome: {this.state.monitorName}
                            </Typography>
                        </Grid>
                        <Grid container justify="center" direction="column" alignItems="center" alignContent="center" >
                        {(this.state.id_monitor === this.state.id_user)? 
                            <MuiThemeProvider  theme={theme}>
                                <Button style={{marginTop:40,marginLeft:50}} component={Link} variant="contained" to={`/editmonitoring/${this.state.id_tutoring}`} color="primary">
                                    Editar
                                </Button>
                            </MuiThemeProvider>: null}                           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                <Grid item style={{paddingLeft:15}}> 
                    <Grid container direction="column">
                        <Grid item >
                            <h1>Monitoria</h1>
                        </Grid>
                        <Grid item>
                            <h3>Matéria:</h3>
                            <Typography>
                                {this.state.tutoringName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <h3>Tema:</h3>
                            <Typography>
                                {this.state.tutoringTheme}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <h3>Descrição:</h3>
                            <Typography>
                                {this.state.tutoringDescription}
                            </Typography>
                        </Grid>
                        <Grid container alignContent="center" justify="center" direction="row" spacing={24} alignItems="center" style={{marginTop: 25}} >
                                                 
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Grid container alignContent="center" justify="center" direction="row" spacing={24} alignItems="center" style={{marginTop: 25}}>
              <Grid item >
                <MuiThemeProvider theme={theme}>
                    <Fab onClick={this.validateLike} color="primary" aria-label="Edit" >
                        <Like/>
                    </Fab>
                </MuiThemeProvider>
              </Grid>
              <Grid item>
                    <a href={"https://"+"t.me/" + texto}>{
                        <MuiThemeProvider theme={theme}>
                            <Fab color="primary" aria-label="Edit" >
                                <Logo/>
                            </Fab>
                        </MuiThemeProvider>}
                    </a>
              </Grid>
            </Grid>
        </div>
    );
  }
}

ExpandedCard = withRouter(ExpandedCard);
export default (ExpandedCard);