import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Actions from '../actions'
import { 
    validateEmail, 
    validateMinLength, 
    validateMaxLength 
} from '../utils/validator'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const fieldNames = ['email', 'password', 'firstname', 'lastname']

const renderError = (field) => { // TODO MOVE ME TO UTILS
    return (field.touched && field.error && 
            <div>{field.error}</div>) 
}

const style = { // TODO refactor me to somewhere else
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
    fieldNames.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        } 
    })
    const { email, password, firstname, lastname } = values
    if (!!email) {
        errors.email = validateEmail(email)
    }
    if (!!password) {
        errors.password = (validateMinLength(4)(password) || 
            validateMaxLength(20)(password))
    }
    if (!!firstname) {
        errors.firstname = (validateMinLength(4)(firstname) || 
            validateMaxLength(35)(firstname))
    }
    if (!!lastname) {
        errors.lastname = (validateMinLength(4)(lastname) || 
            validateMaxLength(35)(lastname))
    }

    return errors
}


export class SignUpForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onSubmit(values, dispatch) {
        const { email, password, firstname, lastname} = values
        return dispatch(Actions.signUp(
            email, password, firstname, lastname, this.context.router))
            .catch((errorText) => {
                console.error("Sign up form: submit error")
                return Promise.reject({_error: errorText})
            })        
    }

    render() {
        const {fields: {email, password, firstname, lastname}, 
               error, handleSubmit, submitting } = this.props
        console.log(email)
        return (
            <form>
                <TextField 
                    hintText="email"
                    ref='email'
                    style={style.input}
                    {...email}
                    />
                {renderError(email)}
                <br />
                
                <TextField 
                    hintText="password"
                    ref='password'
                    style={style.input}
                    {...password}
                    />
                {renderError(password)}
                <br />
                
                <TextField 
                    hintText="first name"
                    ref='firstname'
                    style={style.input}
                    {...firstname}
                    />
                <br />
                {renderError(firstname)}
                
                <TextField 
                    hintText="last name"
                    ref='lastname'
                    style={style.input}
                    {...lastname}
                    />
                <br />                  
                {renderError(lastname)}
                
                {error && <div>{error}</div>} 
                <RaisedButton 
                    label="SignUp" 
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

SignUpForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default reduxForm({
    form: 'SignUp',
    fields: fieldNames,
    validate, 
})(SignUpForm)