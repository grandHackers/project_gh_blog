import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SignInOptions from './SignInOptions'
import SignInForm from '../containers/SignInForm'
import SignUpForm from '../containers/SignUpForm'


export default class SignInModal extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            open: false,
            title: 'Sign in / Sign up',
            content: 'default'
        } 
        this.loadContent = this.loadContent.bind(this)
        this.setContent = this.setContent.bind(this) 
        this.openDialog = this.openDialog.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        console.log('sign in modal constructor!')
    }
    
    openDialog() {
        console.log('opening dialog')
        this.setState({open: true})
    }
    
    closeDialog() {
        console.log('closing and resetting dialog')
        this.setState({
            open: false,
            content: 'default' 
        })
    }
    
    setContent(title, content) {
        this.setState({title, content})
    }
    
    loadContent() {
        const content = this.state.content
        switch (content) {
            case 'signInLocal':
                return <SignInForm  />
            case 'signUpLocal':
                return <SignUpForm  />
            default:
                return <SignInOptions setContent={this.setContent} />
        }
    }
    
    
    render() {
        const signinStyle = {
            color:'white',
            height: this.context.muiTheme.appBar.height,
            lineHeight: this.context.muiTheme.appBar.height + 'px'          
        }
        
        const actions = [
            <FlatButton 
                label="Cancel"
                primary={true}
                onClick={this.closeDialog}
            />             
        ] 
        return (
            <div id='sign-in'>
                <FlatButton 
                    label="Sign in / Sign up"
                    primary={true}
                    onClick={this.openDialog}
                    style={signinStyle}
                />                
                <Dialog
                    title={this.state.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.closeDialog}
                    autoScrollBodyContent={true}
                >
                 {this.loadContent()}    
                </Dialog>                              
            </div>
        )    
    }
}

SignInModal.contextTypes = {
    muiTheme: PropTypes.object.isRequired
}