import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import config from '../../../config/client-config'

export default class SignInOptions extends Component {
    constructor(props) {
        super(props)
        this.style = {
            container: {
              margin: 'auto',
            },
            button: {
              display: 'block',
              width: '40%',
              textAlign: 'center'
            }            
        } 
        this.loadSignInForm = this.loadSignInForm.bind(this)
        this.loadSignUpForm = this.loadSignUpForm.bind(this)
                
    }
    
    loadSignInForm() {
        this.props.setContent(
            'Sign in with your email',
            'signInLocal')
    }
    
    loadSignUpForm() {
        this.props.setContent(
            'Sign up with your email',
            'signUpLocal')
    }
    
    render() {
        /*
            //sign in intro
            logo
            continue with google
            use email to sign in or sign up
        */
        return (
            <div id='sign-in'>
                <div id='sign-in-intro' style={this.style.container}>
                    <RaisedButton 
                        label="Continue with Google"
                        primary={true}
                        style={this.style.button}
                        linkButton={true}
                        href={config.SUBDIR_URL + '/auth/google'}
                    />
                    <br />
                    <span> Or use your email to </span>
                    <br/>
                    <FlatButton 
                        label="Sign in"
                        onClick={this.loadSignInForm} />
                    <span> / </span> 
                    <FlatButton 
                        label="Sign up"
                        onClick={this.loadSignUpForm} />                       
                </div>
            </div>
        )    
    }
}