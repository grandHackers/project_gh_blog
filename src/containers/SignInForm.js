import { connect } from 'react-redux'
import Actions from '../actions'
import SignInForm from '../components/SignInForm'


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (email, password) => {
        dispatch(Actions.signIn(email, password))
    }
  }
}

const SignInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm)

export default SignInFormContainer