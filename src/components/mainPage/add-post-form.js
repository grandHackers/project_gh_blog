import React from 'react';
import config from '../../../config/client-config';

// to use $
require("imports?$=jquery!./feed.js");

const apiUrl = config.API_URL;
const owner = 'erikay'; // TODO remove me once login is implemented!

export default class AddPostForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.addNewPost(this.refs.title.value, this.refs.content.value);
    }
    
    addNewPost(title, content) {
        var newPostData = {
            owner: 'erikay',
            title: title,
            content: content
        };
        
        var post = $.ajax({
            type: "POST",
            url: apiUrl + "/posts/erikay/",
            data: JSON.stringify(newPostData), 
            contentType: "application/json"
        }).done(function (data) { 
            console.log('successfully created the post: %s', JSON.stringify(data));
        }).fail(function (err) {
            // TODO handle error accordingly
            console.log('ERROR: ' + err);
        });     
    }
        
    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input name='title' type='text' ref='title' />
                <input name='content' type='text' ref='content' />
                <button type='submit'> Add a New Post </button>
            </form>
        );
    }    
    
}