import { connect } from 'react-redux'
import Main from '../components/mainPage/Main'

// Currently assuming that current feed only consists of posts
// of the current user

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

const MainContainer = connect(
  mapStateToProps)(Main)

export default MainContainer