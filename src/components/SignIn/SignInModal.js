import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import config from '../../../config/client-config'
import SignInOptions from './SignInOptions'
import SignInForm from '../../containers/SignInForm'
import SignUpForm from '../../containers/SignUpForm'


// TODO
// change to proper redux form

export default class SignInModal extends Component {
    constructor(props) {
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
        const buttonStyle = { color: 'white' }
        const actions = [
            <FlatButton 
                label="Cancel (Or Press ESC key)"
                primary={true}
                onClick={this.closeDialog}
            />             
        ] 
        console.log("at signinmodal render")
        return (
            <div id='sign-in'>
                <FlatButton 
                    label="Sign in / Sign up"
                    primary={true}
                    onClick={this.openDialog}
                    style={buttonStyle}
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