import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/TextField'

export default class AddPostForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log("Adding New Post")        

        const title = this.refs.title.getValue()
        const content = this.refs.content.getValue() 
        
        this.props.addNewPost(title, content)
        
        console.log("Going back to main feed page")
        const path = '/'
        this.context.router.push(path)        
        
    }
        
    render() {
        return (
            <div id='add-post-form'>
                <form action="" onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="Title"
                        ref='title'/>
                    <br />
                    <TextField
                        name='content'
                        hintText="Write your story here..."
                        multiLine={true}
                        rows={10}
                        ref='content'
                        />
                    <br />                

                    <button type='submit'>Add Post</button>
                </form>
            </div>
        );
    }    
}

AddPostForm.PropTypes = {
    addNewPost: PropTypes.func.isRequired, 
}

AddPostForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}