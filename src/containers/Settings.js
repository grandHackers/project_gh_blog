import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateUsername, checkUsernameAvailability } from '../actions/user'
import RaisedButton from 'material-ui/RaisedButton'
import EditUsernameField from '../components/EditUsernameField' 

export class Settings extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div id='user-settings'> 
                <EditUsernameField
                     username={this.props.currentUser.username}
                     updateUsername={this.props.updateUsername}
                     checkUsernameAvailability={this.props.checkUsernameAvailability} 
                     /> 
            </div>)
    }
}

Settings.PropTypes = {
    currentUser: PropTypes.object.isRequired,
    updateUsername: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUsername: (newUsername) => { 
            dispatch(updateUsername(newUsername)) },
        checkUsernameAvailability: (username) => {
            dispatch(checkUsernameAvailability(username))
        }
    }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Settings)