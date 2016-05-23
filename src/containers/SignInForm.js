import { connect } from 'react-redux'
import Actions from '../actions'
import SignInForm from '../components/SignIn/SignInForm'


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password, router) => {
        dispatch(Actions.signIn(email, password, router))
    }
  }
}

const SignInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm)

export default SignInFormContainer