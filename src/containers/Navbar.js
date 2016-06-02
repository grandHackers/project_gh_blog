import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import SignInModal from '../components/SignInModal'

export class NavBar extends React.Component {
    constructor(props, context) {
        super(props);
        context.router
        this.loadAddPostForm = this.loadAddPostForm.bind(this)
        this.showAddPostPageButton = this.showAddPostPageButton.bind(this)
        this.showActions = this.showActions.bind(this)
        this.showUserMenu = this.showUserMenu.bind(this)
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
        const path = '/addPost'
        this.context.router.push(path)
    }


    showActions() {
        if (!this.props.currentUser.username) {
            return <SignInModal />              
        } else {
            return [
                <span>{`Hi, ${this.props.currentUser.username}`}</span>,
                this.showAddPostPageButton(), 
                this.showUserMenu()]
        }
    }

    showAddPostPageButton() {
        // TODO need to get the current route name
        // and render the add post page button if current route is at the index
        var button;
        if (!!this.props.currentUser.username) {
            button = (
                <FlatButton
                    label="Write a story"
                    style={this.styles.button}
                    onClick={this.loadAddPostForm}/>)            
        }
        return button
    }    
    
    showUserMenu() {
        const handleSignOut = () => { 
            console.log('Clicked on sign out!')
            this.props.signOut()
            
            const path = '/' 
            this.context.router.push(path)
        }
        const loadSettings = () => {
            const path = '/me/settings'
            this.context.router.push(path)
        }
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >         
                <MenuItem 
                    primaryText="Settings" 
                    onClick={loadSettings}
                />
                <MenuItem primaryText="Sign out" 
                   onClick={handleSignOut}
                />            
            </IconMenu>
        )
    }
    
    render() { 
        return (
            <AppBar
               style={this.styles.root}
               title={<span style={this.styles.title}> SimpleBlog </span>}
               showMenuIconButton={false}>
               {this.showActions()}
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => { dispatch(Actions.signOut()) }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(NavBar)
