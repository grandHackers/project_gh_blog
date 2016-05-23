import { connect } from 'react-redux'
import Actions from '../actions'
import SignUpForm from '../components/SignIn/SignUpForm'


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (email, password, firstname, lastname, router) => {
        dispatch(Actions.signUp(email, password, firstname, lastname, router))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer