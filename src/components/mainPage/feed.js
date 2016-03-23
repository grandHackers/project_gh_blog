import React from 'react';
import FeedItem from './feed-item';


export default class Feed extends React.Component {
    // TODO 
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        // TODO this should dispatch some action
        // to get the feed data
        // implementing this later when redux is used
    }
    
    getFeedData() {
        // TODO make an api call to get feed data
        // for now just make require call to a json file
        return require('./feed.json');
    }
        
    render() {
        var feedItems = [];
        var feedItemData = this.getFeedData();
        console.log(feedItemData);
        feedItemData.forEach(function(item) {
            feedItems.push(<FeedItem {...item} />);
        });
        return (
            <div> <ul> {feedItems} </ul> </div>
        );
    }    
    
}