import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import PostPublishForm from './PostPublishForm'

export class EditPostForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.onSubmit = this.onSubmit.bind(this)
        this.postId = this.props.params.postId
        this.post = this.props.post
    }
    
    onSubmit(values, dispatch) {
        const { title, content } = values
        return dispatch(Actions.editPost(this.postId, title, content))
            .then(() => {
                console.log("Going back to my feed page...")
                const path = '/@' + this.props.currentUsername
                this.context.router.push(path)           
            })
            .catch(errorText => {
                console.error("Form: failing post edit...: " + errorText)
                return Promise.reject({_error: errorText})
            })
    }

    componentWillMount() {
        // currently the 'post' prop is passed from state.posts
        // if this doesn't exist, it means user just entered in the url
        // without following the ui or if user has refreshed the page
        // TODO show an unauthorized error page instead of console logging
        // and redirection
        const { currentUsername, post, postId } = this.props
        if (!currentUsername) { // user not logged in
            console.error('user not logged in!')
            this.context.router.push('/')
        }
        else if (currentUsername && !post) { // user logged in but post info not in cache
            // server call to get post and check its owner
            console.log("user logged in but can't find this post in state")
            Action.getPost(postId)
                .then(post => { 
                    if (post.owner === currentUsername) {
                        this.post = post
                    } else {
                        Promise.reject("User is unauthorized to edit another's post")    
                    }
                })
                .catch(err => { 
                    console.error('unauthorized - unauthenticated: ' + err)
                    this.context.router.push('/') 
                })
            
        } else if (currentUsername !== post.owner) {
            // user logged in and post info in cache
            // but this post doesn't belong to the user
            // TODO show an unauthorized error page instead
            console.error('user logged in but unauthorized to edit this post!')
            this.context.router.push('/')
        } else {
            console.log(this.post)
        }
    }
        
    render() {
        console.log('printing post publish form')
        console.log(this.post)
        // even when there's supposed to be "redirection" from react router
        // during componentWillMount
        // render gets called first for some reason
        // so this is to prevent any errors from occurring
        var initialValues;
        if (this.post) {
            initialValues = {
                title: this.post.title,
                content: this.post.content
            }
        }
        return (
            <PostPublishForm
                onPublish={this.onSubmit}
                initialValues={initialValues}
            />
        )
    }     
}

EditPostForm.PropTypes = {
    currentUsername: PropTypes.string.isRequired,
    post: PropTypes.object
}

EditPostForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps.params
  // TODO in reducer
  // group posts by users

  return {
    post: state.posts.find(somePost => somePost.id == postId),      
    currentUsername: state.currentUser.username,
  }
}

export default connect(
  mapStateToProps
)(EditPostForm)