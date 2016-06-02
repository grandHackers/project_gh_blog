import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'

import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import FlatButton from 'material-ui/FlatButton'

export class DeletePostDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDeletePost = this.handleDeletePost.bind(this)
    }
    
    handleOpen() {
        this.setState({open: true})
    }
    
    handleClose() {
        this.setState({open: false})
    }
    
    handleDeletePost() {
        const { deleteThisPost } = this.props
        deleteThisPost()
        this.handleClose()
    }
    
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleDeletePost}
            />          
        ]
        return (
            <IconButton
                onClick={this.handleOpen}> 
                <NavigationClose />
                <Dialog
                    title='Delete Post'
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                Are you sure you want to delete this post?
                </Dialog>
            </IconButton>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => { 
    const { postId } = ownProps
    return {
        deleteThisPost: () => dispatch(Actions.deletePost(postId))
    }
}

export default connect(
    null,
    mapDispatchToProps)(DeletePostDialog)
