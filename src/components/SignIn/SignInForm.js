import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/TextField'
import RaisedButton from 'material-ui/lib/raised-button'
import config from '../../../config/client-config'

export default class SignInForm extends Component {
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
              width: '15%',
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
        
        if (email && password) {
            console.log("Clicking signin")             
            this.props.signIn(email, password)
        }
        else {
            alert('Must provide both email and password.')
        }
        
    }
        
    render() {
        return (           
            <div id='add-post-form'> 
            {/* change id=add-post-form to some class=sign-in-form and apply styling */}
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
                    <RaisedButton 
                        label="SignIn" 
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

SignInForm.PropTypes = {
    // TODO add currentUser
    signIn: PropTypes.func.isRequired, 
}

SignInForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}