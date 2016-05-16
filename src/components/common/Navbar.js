import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import config from '../../../config/client-config'

export default class NavBar extends React.Component {
    constructor(props, context) {
        super(props);
        context.router
        this.loadAddPostForm = this.loadAddPostForm.bind(this)
        this.showAddPostPageButton = this.showAddPostPageButton.bind(this)
        this.styles = {
            root: {   
                position: "fixed",
                top: 0
            },
            title: {
                cursor: 'pointer'
            },
            button: {
                color: 'white'
            }
        }
    }
    
    loadAddPostForm() {
        console.log("Clicked on Add post!")
        const path = config.SUBDIR_URL + '/addPost'
        this.context.router.push(path)
    }

    showAddPostPageButton() {
        // TODO need to get the current route name
        // and render the add post page button if current route is at the index
        var button;
        if (!!this.props.currentUser) {
            button = (
                <FlatButton
                    label="Write a story"
                    style={this.styles.button}
                    onClick={this.loadAddPostForm}/>)            
        }
        return button
    }
    
    showSignInButton() {
        // TODO take out hardcoding of the username
        // after proper sign in is implemented
        var label;
        var handler;
        if (!this.props.currentUser) {
            label = "Sign in"
            handler = () => {  
                console.log('Clicked on sign in!')
                const path = config.SUBDIR_URL + '/signInForm'
                this.context.router.push(path)                
            }
        } else {
            label = 'Sign out' 
            handler = () => { 
                console.log('Clicked on sign out!')
                this.props.signOut()
            }
        }
        
        return (
            <FlatButton 
                label={label}
                onClick={handler} 
                style={this.styles.button}/>             
        )          
    }
    
    render() { 
        return (
            <AppBar
               style={this.styles.root}
               title={<span style={this.styles.title}> SimpleBlog </span>}
               showMenuIconButton={false}>
                {this.showAddPostPageButton()}
                {this.showSignInButton()}
            </AppBar>
        );

    }
}

NavBar.PropTypes = {
    signOut: PropTypes.func.isRequired
}

NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}