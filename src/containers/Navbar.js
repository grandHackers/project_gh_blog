import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import UserMenu from '../components/UserMenu'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FlatButton from 'material-ui/FlatButton'
import SignInModal from '../components/SignInModal'

export class NavBar extends React.Component {
   
    constructor(props, context) {
        super(props)
        context.router
        
        this.loadAddPostForm = this.loadAddPostForm.bind(this)
        this.showActions = this.showActions.bind(this)
        this.redirectToMain = this.redirectToMain.bind(this)
        
        const appBarStyle = context.muiTheme.appBar
        this.style = {
            root: {   
                position: "fixed",
                top: 0
            },
            title: {
                cursor: 'pointer'
            },
            button: {
                height: appBarStyle.height,
                lineHeight: appBarStyle.height + 'px',
                color: appBarStyle.textColor,
                fontSize: '14px',
                fontWeight: '500'
            }
        }
    }
    
    loadAddPostForm() {
        console.log("Clicked on Add post!")
        const path = '/addPost'
        this.context.router.push(path)
    }


    showActions() {
        const { currentUsername } = this.props
        
        if (!currentUsername) { // if not logged in
            return <SignInModal />              
        }
        
        return [           
            <FlatButton
                className='nav-item'
                label="Write a story"
                style={this.style.button}
                onClick={this.loadAddPostForm}/>,            
            <UserMenu currentUsername={currentUsername} /> 
        ]
        
    }
  
    redirectToMain() {
        if (!this.props.currentUsername) {
            this.context.router.push('/')
        } else {
            this.context.router.push(`/@${this.props.currentUsername}`)
        }
    }
    
    render() { 
        return (
            <AppBar
               style={this.style.root}
               title={<span style={this.style.title}> SimpleBlog </span>}
               onTitleTouchTap={this.redirectToMain}
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
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.currentUser.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => { dispatch(Actions.signOut()) }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(NavBar)
