import { connect } from 'react-redux'
import Actions from '../actions'
import AddPostForm from '../components/addPostPage/AddPostForm'

// Currently assuming that current feed only consists of posts
// of the current user

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (title, content) => {
        dispatch(Actions.createPost(title, content))
    }
  }
}

const AddPostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm)

export default AddPostFormContainer