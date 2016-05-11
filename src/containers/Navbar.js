import { connect } from 'react-redux'
import { signInUser, signOutUser } from '../actions'
import Navbar from '../components/common/Navbar'

// Currently assuming that current feed only consists of posts
// of the current user

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username) => { dispatch(signInUser(username)) },
    signOut: (username) => { dispatch(signOutUser(username)) }
  }
}

const NavbarContainer = connect(
  mapStateToProps, mapDispatchToProps)(Navbar)

export default NavbarContainer