import React from 'react';
import FeedItem from './feed-item';
require("imports?$=jquery!./feed.js");

// define server url
var serverUrl = "http://localhost:8080/posts/";

export default class Feed extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {feed: []};
        this.getFeedData = this.getFeedData.bind(this);
    }
    
    componentDidMount() {
        // TODO this should dispatch some action
        // to get the feed data
        // implementing this correctly later when redux is used
        this.getFeedData();
    }
    
    getFeedData() {
        // TODO make an api call to get feed data
        // TODO install jquery
        var _this = this;
        $.ajax({
            type: "GET",
            url: serverUrl + "erikay/", 
            dataType: 'json',
            success: function(data) {
                _this.setState({feed: data});
            },
            error: function(err) {
                console.log('ERROR: ' + err);
            }
        }); 
    }
        
    render() {
        var feedItems = [];
        var feedItemData = this.state.feed;
        feedItemData.forEach(function(item) {
            feedItems.push(<FeedItem {...item} />);
        });
        return (
            <div> <ul> {feedItems} </ul> </div>
        );
    }    
    
}