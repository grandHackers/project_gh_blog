import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/TextField'
import RaisedButton from 'material-ui/lib/raised-button'
import config from '../../../config/client-config'

export default class signUpForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.style = {
            input: {
                display: 'block',
                width: '50%',
                margin: 'auto',
                fontSize: '32px',
                fontWeight: 'bold',  
            },
            button: {
              display: 'block',
              width: '10%',
              margin: 'auto',
            }
        }
        this.transferToMainIfSignedIn = this.transferToMainIfSignedIn.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    transferToMainIfSignedIn() {
        if (!!this.props.currentUser.id) {
            const path = config.SUBDIR_URL + '/'
            this.context.router.push(path)
        }
    }
    
    componentWillMount() {
        this.transferToMainIfSignedIn()
    }
    
    componentDidUpdate() {
        this.transferToMainIfSignedIn()
    }

    handleSubmit(event) {
        event.preventDefault()       
        const email = this.refs.email.getValue()
        const password = this.refs.password.getValue() 
        const firstname = this.refs.firstname.getValue()
        const lastname = this.refs.lastname.getValue()
        // TODO provide better validation
        // may instead use a form library 
        if (email && password && firstname && lastname) {
            console.log("Clicking signup")
            this.props.signUp(email, password, firstname, lastname)
        }
        else {
            alert('Must provide both email and password.')
        }
        
    }
        
    render() {
        return (
            <div id='add-post-form'>
                <form action="" onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="email"
                        ref='email'
                        style={this.style.input}/>
                    <br />
                    <TextField 
                        hintText="Password"
                        ref='password'
                        style={this.style.input}/>
                    <br />               
                    <TextField 
                        hintText="first name"
                        ref='firstname'
                        style={this.style.input}/>
                    <br />            
                    <TextField 
                        hintText="last name"
                        ref='lastname'
                        style={this.style.input}/>
                    <br />                                            
                    <RaisedButton 
                        label="signUp" 
                        primary={true} 
                        style={this.style.button} 
                        ref='submitButton'
                        onClick={this.handleSubmit}
                    />
                </form>
            </div>
        );
    }    
}

signUpForm.PropTypes = {
    // TODO add currentUser
    signUp: PropTypes.func.isRequired, 
}

signUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}