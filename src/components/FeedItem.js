import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
 
import Card from 'material-ui/Card/Card'
import CardHeader from 'material-ui/Card/CardHeader'
import CardTitle from 'material-ui/Card/CardTitle'
import CardText from 'material-ui/Card/CardText'
import EditModeIcon from 'material-ui/svg-icons/editor/mode-edit'
import DeletePostDialog from '../containers/DeletePostDialog'


export default class FeedItem extends Component {
    constructor(props) {
        super(props)
        this.style = {
            root: {
                width: '65%',
                margin: 'auto',
                marginBottom: '20px' 
            },
            action: {
                float: 'right'
            }
        }
        this.showActionsIfSignedIn = this.showActionsIfOwner.bind(this)
    }
    
    showActionsIfOwner() {
        const {currentUsername, owner, id} = this.props
        if (currentUsername === owner) {
            return [
                 <DeletePostDialog postId={id} />,
                 <Link to={`/@${owner}/${id}/editPost`} >
                    <EditModeIcon style={this.style.action} />  
                 </Link>
            ]
        }
    }
    
    render() {
        const { owner, created_at, updated_at,
                title, content } = this.props
        return (
            <Card 
                className='feed-item-card'
                style={this.style.root}
            > 
                <CardHeader 
                    className='feed-item-card-header' 
                    title={owner} 
                    subtitle={updated_at || created_at}
                 >
                {this.showActionsIfOwner()}
                 </CardHeader>
                 <CardTitle 
                    className='feed-item-card-title' 
                    title={title}/>
                <CardText> {content} </CardText>
            </Card>
        )
    }
    
}

FeedItem.PropTypes = {
    owner: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    currentUsername: PropTypes.string
}