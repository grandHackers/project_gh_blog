import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import TextField from 'material-ui/lib/TextField'
import RaisedButton from 'material-ui/lib/raised-button'

export class SignUpForm extends Component {
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
        this.handleSubmit = this.handleSubmit.bind(this)
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
            this.props.signUp(email, password, firstname, lastname, this.context.router)
            return false
        }
        else {
            alert('Must provide both email and password.')
        }
        
    }
        
    render() {
        return (
            <div id='add-post-form'>
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

SignUpForm.PropTypes = {
    // TODO add currentUser
    signUp: PropTypes.func.isRequired, 
}

SignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email, password, firstname, lastname, router) => {
        dispatch(Actions.signUp(email, password, firstname, lastname, router))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
