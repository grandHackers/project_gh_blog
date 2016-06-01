import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import { Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import SignInModal from '../components/SignInModal'

export class NavBar extends React.Component {
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
        const path = '/addPost'
        this.context.router.push(path)
    }

    showAddPostPageButton() {
        // TODO need to get the current route name
        // and render the add post page button if current route is at the index
        var button;
        if (!!this.props.currentUser.id) {
            button = (
                <FlatButton
                    label="Write a story"
                    style={this.styles.button}
                    onClick={this.loadAddPostForm}/>)            
        }
        return button
    }
    
    showSignInButton() {
        if (!this.props.currentUser.username) {
            return <SignInModal />
           
        } else {
            const label = 'Sign out' 
            const handleSignOut = () => { 
                console.log('Clicked on sign out!')
                this.props.signOut()
                
                const path = '/' 
                this.context.router.push(path)
            }
            return (
                <FlatButton 
                    label={label}
                    onClick={handleSignOut} 
                    style={this.styles.button}/>             
            )              
        }    
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
