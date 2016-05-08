import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/TextField'
import RaisedButton from 'material-ui/lib/raised-button'

export default class AddPostForm extends Component {
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
        // TODO add proper validation
        
        if (title && content) {
            console.log("Adding New Post")             
            this.props.addNewPost(title, content)
            console.log("Going back to main feed page")
            const path = '/'
            this.context.router.push(path)            
        }
        else {
            alert('Must provide both title and content.')
        }
        
    }
        
    render() {
        return (
            <div id='add-post-form'>
                <form action="" onSubmit={this.handleSubmit}>
                    <TextField 
                        hintText="Title"
                        ref='title'
                        style={this.style.titleInput}/>
                    <br />
                    <TextField
                        name='content'
                        floatingLabelText="Write your story here..."
                        multiLine={true}
                        rows={10}
                        ref='content'
                        style={this.style.contentInput}
                        />
                    <br />                
                    <RaisedButton 
                        label="Publish" 
                        primary={true} 
                        style={this.style.button} 
                        onClick={this.handleSubmit}
                    />
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