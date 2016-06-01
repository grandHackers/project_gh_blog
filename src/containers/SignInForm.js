import { connect } from 'react-redux'
import Actions from '../actions'
import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/lib/TextField'
import RaisedButton from 'material-ui/lib/raised-button'

export class SignInForm extends Component {
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
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    handleSubmit(event) {
        event.preventDefault()       
        const email = this.refs.email.getValue()
        const password = this.refs.password.getValue() 
        
        if (email && password) {
            console.log("Clicking signin")             
            this.props.signIn(email, password, this.context.router)
        }
        else {
            alert('Must provide both email and password.')
        }
        
    }
        
    render() {
        return (           
            <div id='add-post-form'> 
            {/* change id=add-post-form to some class=sign-in-form and apply styling */}
                <form>
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
    signIn: PropTypes.func.isRequired, 
}

SignInForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password, router) => {
        dispatch(Actions.signIn(email, password, router))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm)