import { connect } from 'react-redux'
import Actions from '../actions'
import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export class EditPostForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.style = {
            titleInput: {
                display: 'block',
                width: '50%',
                margin: 'auto',
                fontSize: '32px',
                fontWeight: 'bold',  
            },
            contentInput: {
                display: 'block',
                width: '50%',
                margin: 'auto'
            },
            button: {
              display: 'block',
              width: '10%',
              margin: 'auto',
                
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()       
        const title = this.refs.title.getValue()
        const content = this.refs.content.getValue() 
        
        if (title && content) {
            console.log("Editing Post")             
            this.props.editPost(this.props.params.postId, title, content)
            console.log("Going back to main feed page")
            const path = '/@' + this.props.currentUser.username
            this.context.router.push(path)            
        }
        else {
            alert('Must provide both title and content.')
        }
        
    }
        
    render() {
        return (
            <div id='edit-post-form'>
                <form action="" onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="Title"
                        ref='title'
                        style={this.style.titleInput}
                        defaultValue={this.props.originalTitle}
                     />
                    <br />
                    <TextField
                        name='content'
                        floatingLabelText="Write your story here..."
                        multiLine={true}
                        rows={10}
                        ref='content'
                        style={this.style.contentInput}
                        defaultValue={this.props.originalContent}
                        />
                    <br />                
                    <RaisedButton 
                        label="Publish" 
                        primary={true} 
                        style={this.style.button} 
                        ref='submitButton'
                        onClick={this.handleSubmit}
                    />
                </form>
            </div>           
        );
    }    
}

EditPostForm.PropTypes = {
    editPost: PropTypes.func.isRequired, 
}

EditPostForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps.params
  // TODO in reducer
  // group posts by users
  const post = state.posts.find((somePost) => 
    somePost.id == postId)
  return {
    currentUser: state.currentUser,
    originalTitle: post.title,
    originalContent: post.content
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (postId, title, content) => {
        dispatch(Actions.editPost(postId, title, content))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm)