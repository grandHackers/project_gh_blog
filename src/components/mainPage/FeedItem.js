import React from 'react'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'

export default class FeedItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Card className='feed-item-card'> 
                <CardHeader 
                    className='feed-item-card-header' 
                    title={this.props.owner} 
                    subtitle={this.props.created_at} />
                <CardTitle className='feed-item-card-title' title={this.props.title} />
                <CardText> {this.props.content} </CardText>
            </Card>
        )
    }
    
}