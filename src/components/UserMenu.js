import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class UserMenu extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.state = {
            open: false
        }
        this.handleTouchTap = this.handleTouchTap.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
        this.loadSettings = this.loadSettings.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
        
        const appBarStyle = context.muiTheme.appBar
        this.style = {
            menuButton: {
                height: appBarStyle.height,
                lineHeight: appBarStyle.height + 'px',
                color: appBarStyle.textColor,
                fontSize: '14px',
                fontWeight: '500'                
            },
            menuItem: {
                // make this have same width as menuButton
            }
        }
    }
    
    handleTouchTap(event) {
        event.preventDefault()
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    }
    
    handleRequestClose() {
        this.setState({
            open: false
        })
    }
    
    loadSettings() {
        const path = '/me/settings'
        this.context.router.push(path)        
    }
    
    handleSignOut() {
        console.log('Clicked on sign out!')
        this.props.signOut()
        
        const path = '/' 
        this.context.router.push(path)
    }    

    render() {
        const { currentUsername } = this.props
        return (
            <div>
                <FlatButton
                    onTouchTap={this.handleTouchTap}
                    label={`Welcome, ${currentUsername}`}
                    style={this.style.menuButton} 
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem
                            className='nav-item'
                            primaryText="Settings" 
                            onClick={this.loadSettings}
                        />
                        <MenuItem
                            className='nav-item' 
                            primaryText="Sign out" 
                            onClick={this.handleSignOut}
                        />                  
                    </Menu>
                </Popover>
            </div>
        )
    }
    
}

UserMenu.contextTypes = {
    router: PropTypes.object.isRequired,
    muiTheme: PropTypes.object.isRequired
}