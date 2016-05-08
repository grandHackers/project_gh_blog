import { connect } from 'react-redux'
import { createPost } from '../actions'
import AddPostForm from '../components/addPostPage/AddPostForm'

// Currently assuming that current feed only consists of posts
// of the current user

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (title, content) => {
        dispatch(createPost(title, content))
    }
  }
}

const AddPostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm)

export default AddPostFormContainer