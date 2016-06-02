import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import callApi from '../api'

/*
Currently asking server if a user exists or not.
So a 404 response would actually be the preferred status.
Not sure if this is the recommended approach;
The browser is logging this as error due to the status code.

Currently all presentation logic - like form logic is not maintained by redux state
*/
const checkUsernameIsAvailable = (username) => {
    return new Promise((resolve, reject) => {
        callApi(`/users?username=${username}`, 'HEAD')
            .then(response => {
                const status = response.status
                if (status === 404) {
                    resolve('username is available') 
                } else if (status == 200) {
                    reject('username is already taken')
                } else {
                    reject('rejected with code ' + status)
                }
            })
    })
}

const validateUsername = (username) => { 
    const errMessage = "Username should be at least 4 characters!"
    if (username.length >= 4) {
        return {
            valid: true,
            error: null
        }
    }
    return {
        valid: false,
        error: errMessage
    }
}

export default class EditUsernameField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            editing: false,
            canUpdate: false,
            error: null 
        }
        this.style = {
            input: {},
            button: {},
        }
        this.enterEditMode = this.enterEditMode.bind(this)
        this.saveUsername = this.saveUsername.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.showActions = this.showActions.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.username === this.state.username) {
            // edited username saved successfully
            const nextState = {
                editing: false,
                canUpdate: false,
                error: null
            }
            this.setState(nextState)
        }    
    }
    
    enterEditMode() {
        this.setState({editing: true})
    }
    
    saveUsername() {
        this.props.updateUsername(this.state.username)
    }
    
    cancelEditing() {
        this.setState({
            username: this.props.username,
            editing: false,
            canUpdate: false,
            error: null 
        })
    }
    
    handleUsernameChange(event) {
        // unchanged username shouldn't bother be saved
        const username = event.target.value
        var nextState = { username }
        
        if (username === this.props.username) {
            nextState['canUpdate'] = false
            this.setState(nextState)
        }
        
        else {
            const res = validateUsername(username)
            if (!res.valid) {
                nextState = Object.assign(nextState, {
                    error: res.error,
                    canUpdate: false
                })
                this.setState(nextState)
            } else {
                const onAvailable = () => {
                    nextState = Object.assign(nextState, {
                        error: null,
                        canUpdate: true
                    })
                    this.setState(nextState)                    
                }
                const onUnavailable = (err) => {
                    nextState = Object.assign(nextState, {
                        error: err,
                        canUpdate: false
                    })
                    this.setState(nextState)
                }
                checkUsernameIsAvailable(username)
                    .then(onAvailable, onUnavailable)
            }            
        }
    }
    
    showActions() {
        if (!this.state.editing) {
            return (
                <RaisedButton
                    style={this.style.button}
                    label='Edit username'
                    onClick={this.enterEditMode}
                    />                
            )        
        } 
        return ([
            <RaisedButton
                style={this.style.button}
                label='Save'
                disabled={!this.state.canUpdate}
                onClick={this.saveUsername}
                />, 
            <RaisedButton
                style={this.style.button}
                label='Cancel'
                onClick={this.cancelEditing}
                />
        ])
    }    
    
    render() {
        return (
            <div>
                <TextField 
                    name='usernameInput'
                    style={this.style.usernameInput}
                    value={this.state.username}
                    disabled={!this.state.editing}
                    errorText={this.state.error}
                    onChange={this.handleUsernameChange}
                    />
                { this.showActions() }                        
            </div>
        ) 
    }
    
}