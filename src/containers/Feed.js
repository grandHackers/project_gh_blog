import { connect } from 'react-redux'
import Actions from '../actions'
import Feed from '../components/mainPage/Feed'

// Currently assuming that current feed only consists of posts
// of the current user

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    currentUser: state.currentUser
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

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default FeedContainer