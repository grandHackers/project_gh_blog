import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem';
import config from '../../../config/client-config';


export default class Feed extends Component {
    
    constructor(props) {
        // props : fetchPosts, posts
        super(props);
    }
    
    componentDidMount() {
        // fetching only posts owned by currentUser at this point..
        this.props.fetchPosts(this.props.currentUser);
    }
        
    render() {
        var feedItems = [];
        this.props.posts.forEach(function(item) {
            feedItems.push(<FeedItem {...item} />);
        });
        return (
            <div> <ul> {feedItems} </ul> </div>
        );
    }    
    
}

Feed.PropTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired 
}