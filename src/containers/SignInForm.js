import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Actions from '../actions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { renderError } from '../utils/validator'

const style = {
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

const validate = values => {
    var errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } 
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

export class SignInForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onSubmit(values, dispatch) {
        const { email, password } = values
        return dispatch(Actions.signIn(email, password, this.context.router))
            .catch((errorText) => {
                console.error("Form: failing sign in")
                return Promise.reject({_error: errorText})
            })        
    }

    
    render() {
        const {fields: {email, password}, error,
               handleSubmit, submitting } = this.props
        return (
            <form>
                <TextField 
                    hintText="email"
                    ref='email'
                    style={style.input}
                    errorText={renderError(email)}
                    {...email}
                    />
                <br />
                
                <TextField 
                    hintText="password"
                    ref='password'
                    style={style.input}
                    errorText={renderError(password)}
                    {...password}
                    />
                <br />
                
                {error && <div>{error}</div>} 
                <RaisedButton 
                    label="SignIn" 
                    primary={true} 
                    style={style.button} 
                    ref='submitButton'
                    onClick={handleSubmit(this.onSubmit)}
                    disabled={submitting}
                >
                </RaisedButton>                             
            </form>
        )
        
    }
} 

SignInForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default reduxForm({
    form: 'SignIn',
    fields: ['email', 'password'],
    validate, 
})(SignInForm)
