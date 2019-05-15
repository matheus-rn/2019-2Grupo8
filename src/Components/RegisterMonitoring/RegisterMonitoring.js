import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core' ;
import AppBar from '../AppBar/AppBar.js';
import axios from 'axios';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { validateRegisterMonitoring, success } from '../../Helpers/validates.js';
import {withRouter} from 'react-router-dom';

class RegisterMonitoring extends Component {
    
    state ={
        monitoring:{
            name: '',
            subject: '',
            description: '',
        },
        error:''
    }

    registerMonitoring = (e) =>{
        var token = {};
        const {monitoring} = this.state;

        if(!validateRegisterMonitoring(monitoring)){
            this.setState({ error: "Digite os campos obrigatorios." });
            e.preventDefault();
            return;
        }
        firebase.auth().onAuthStateChanged(user =>{
            this.setState({isSignedIn: !!user});
            if(user){
                firebase.auth().currentUser.getIdToken().then(function(idToken){
                    token["name"] = monitoring.name;
                    token["access_token"] = idToken;
                    token["subject"] = monitoring.subject;
                    token["description"] = monitoring.description;
                });
                
                axios.post(process.env.REACT_APP_GATEWAY+"/create_tutoring/", token).then((x)=>{
                    if(success(x)) this.props.history.push('/feed');
                  });
            }
          });
    }

  render() {
      
    return (
    
        <div style={{overflowX:'hidden'}}>
            <div>
                <Grid container justify="center" alignItems="stretch">
                    <AppBar/>
                </Grid>
            </div>
            <div>    
                <Grid container  alignContent="center" justify="center" direction="column" alignItems="center" spacing={16} style={{ padding: 60 }}>   
                    <Grid item md-auto>
                        <TextField
                        id="temaTextField"
                        label="Tema"
                        margin="normal"
                        onChange={(event)=>this.setState({ ...this.state, monitoring: { ...this.state.monitoring, name: event.target.value } })}
                        />
                    </Grid>
                    <Grid item md-auto>
                        <TextField
                        id="temaTextField"
                        label="Matéria"
                        margin="normal"
                        onChange={(event)=>this.setState({ ...this.state, monitoring: { ...this.state.monitoring, subject: event.target.value } })}
                        />
                    </Grid>
                    <Grid  item md-auto>
                        <TextField
                            id="descricaoTextfild"
                            label="Descrição"
                            placeholder="Descrição"
                            multiline
                            margin="normal"
                            variant="outlined"
                            onChange={(event)=>this.setState({ ...this.state, monitoring: { ...this.state.monitoring, description: event.target.value } })}
                            />
                        
                    </Grid>
                    <Grid>
                        {this.state.error && <p>{this.state.error}</p>}
                    </Grid>
                    <Grid container  alignContent="center" justify="center" direction="row" alignItems="center" spacing={16} style={{paddingTop:40}}>
                        <Grid item>
                            <Button variant="outlined" component={Link}  color="primary" onClick={this.registerMonitoring} >
                                Registrar
                            </Button>
                        </Grid>
                        <Grid item> 
                            <Button variant="outlined" color="primary" component={Link} to="/Feed" >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    
    );   
  }
}

export default withRouter(RegisterMonitoring);