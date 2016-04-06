import React from 'react';

export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <li>
                <div>
                    <h3>{this.props.title}</h3>
                    <span>{this.props.createdAt}</span>
                    <p>{this.props.content}</p>
                </div>            
            </li>
        );
    }
    
}