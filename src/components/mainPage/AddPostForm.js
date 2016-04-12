import React, { Component, PropTypes } from 'react'
import config from '../../../config/client-config';

// Look into Uncontrolled Components

export default class AddPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: ''}
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }
    
    handleContentChange(event) {
        this.setState({content: event.target.value})
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const { title, content } = this.state;
        this.props.addNewPost(title, content)
        this.setState({title: '', content: ''})
    }
        
    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input 
                    name='title' 
                    type='text'
                    value={this.state.title} 
                />
                <input 
                    name='content' 
                    type='text'
                    value={this.state.content} 
                />
                <button type='submit'> Add a New Post </button>
            </form>
        );
    }    
}

AddPostForm.PropTypes = {
    addNewPost: PropTypes.func.isRequired, 
}