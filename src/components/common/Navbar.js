import React from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'

export default class NavBar extends React.Component {
    constructor(props, context) {
        super(props);
        context.router
        this.loadAddPostForm = this.loadAddPostForm.bind(this)
        this.showAddPostPageButton = this.showAddPostPageButton.bind(this)
        this.styles = {
            root: {   
                position: "fixed"
            },
            title: {
                cursor: 'pointer'
            },
            button: {
                color: 'white'
            }
        }
    }
    
    handleSignout() {
        //
        console.log("sign out button touched/clicked!")
    }
    
    loadAddPostForm() {
        console.log("Clicked on Add post!")
        const path = '/addPost'
        this.context.router.push(path)
    }

    showAddPostPageButton() {
        // TODO need to get the current route name
        // and render the add post page button if current route is at the index
        return (
            <FlatButton
                label="Write a story"
                style={this.styles.button}
                onClick={this.loadAddPostForm}/>)
    }
    
    showSignInButton() {
        // TODO
        var label = "Sign out"
        return (
            <FlatButton 
                label="Sign out"
                onClick={this.handleSignout} 
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

NavBar.contextTypes = {
    router: React.PropTypes.object.isRequired
}