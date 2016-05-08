import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem';


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
        var feedItems = this.props.posts.map( item => <FeedItem {...item} /> )
        return (
            <div id='feed-background'>
                <div className='feed'> 
                    {feedItems} 
                </div>
            </div>
        );
    }    
    
}

Feed.PropTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired 
}