import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Actions from '../actions'
import FeedItem from '../components/FeedItem'

export class Feed extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPosts(this.props.params.owner)
    }
        
    render() {
        const feedItems = this.props.posts.map( 
            item => <FeedItem {...item} currentUsername={this.props.currentUsername} /> )
        return (
                <div className='feed'> 
                    {feedItems} 
                </div>
        );
    }    
    
}

Feed.PropTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired 
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    currentUsername: state.currentUser.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // TODO need to access state to get the username
    // of the current user, but for now just relying
    // on the container to have the currentUser information
    // until I look into 'mergeProps'.
    fetchPosts: (ownerId) => {
        dispatch(Actions.fetchPosts(ownerId))        
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)