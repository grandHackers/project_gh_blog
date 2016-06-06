import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import PostPublishForm from './PostPublishForm'

export class AddPostForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        console.log('addpostform constructor')
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onSubmit(values, dispatch) {
        const { title, content } = values
        return dispatch(Actions.createPost(title, content))
            .then(() => {
                console.log("Going back to my feed page...")
                const path = '/@' + this.props.currentUsername
                this.context.router.push(path)                
            })
            .catch(errorText => {
                console.error("Form: failing post creation...")
                return Promise.reject({_error: errorText})
            })
    }

    componentWillMount() {
        if (!this.props.currentUsername) {
            // If somehow user entered in the url form adding the post
            // without signing in, redirecting them to main page.
            this.context.router.push('/')
        }
    }
        
    render() {
        console.log('printing post publish form')
        return (
            <PostPublishForm 
                onPublish={this.onSubmit} 
            />
        )
    }     
}

AddPostForm.PropTypes = {
    currentUsername: PropTypes.string.isRequired
}

AddPostForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    currentUsername: state.currentUser.username,  
})


export default connect(
  mapStateToProps
)(AddPostForm)



