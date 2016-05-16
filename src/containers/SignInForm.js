import { connect } from 'react-redux'
import { signIn } from '../actions'
import SignInForm from '../components/SignInForm'


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username, password) => {
        dispatch(signIn(username, password))
    }
  }
}

const SignInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm)

export default SignInFormContainer