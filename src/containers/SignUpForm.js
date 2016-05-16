import { connect } from 'react-redux'
import { signUp } from '../actions'
import SignUpForm from '../components/SignUpForm'


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (username, password, email, firstname, lastname) => {
        dispatch(signUp(username, password, email, firstname, lastname))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer