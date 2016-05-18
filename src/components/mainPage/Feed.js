import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem';


export default class Feed extends Component {
    
    constructor(props) {
        // props : fetchPosts, posts
        super(props);
    }
    
    componentDidMount() {
        // fetching only posts owned by currentUser at this point..
        const ownerId = this.props.currentUser.id
        if (!!ownerId) {
            this.props.fetchPosts(ownerId);            
        }

    }
        
    render() {
        const ownerName = this.props.currentUser.name
        const feedItems = this.props.posts.map( 
            item => <FeedItem {...item} ownerName={ownerName} /> )
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