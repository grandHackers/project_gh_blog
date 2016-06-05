import { connect } from 'react-redux'
import Actions from '../actions'
import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

// TODO refactor the style 
// it is exactly the same as the edit post form style

const baseStyle = {
    paper: {
        width: '75%',
        margin: 'auto'
    },
    input: {
        display: 'block',
        width: '90%',
        margin: 'auto'
    }   
}

export class AddPostForm extends Component {
    constructor(props, context) {
        super(props)
        context.router
        this.style = {
            paper: baseStyle.paper,
            titleInput: Object.assign({
                fontSize: '32px',
                fontWeight: 'bold'    
            }, baseStyle.input),
            contentInput: baseStyle.input,
            button: {
              display: 'block',
              width: '10%',
              margin: 'auto',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        if (!this.props.currentUsername) {
            // TODO show error instead?
            this.context.router.push('/')
        }
    }

    handleSubmit(event) {
        event.preventDefault()       
        const title = this.refs.title.getValue()
        const content = this.refs.content.getValue() 
        
        if (title && content) {
            console.log("Adding New Post")             
            this.props.addNewPost(title, content)
            console.log("Going back to main feed page")
            const path = '/@' + this.props.currentUsername
            this.context.router.push(path)            
        }
        else {
            alert('Must provide both title and content.')
        }
        
    }
        
    render() {
        return (
            <div className='post-form-wrapper'>
                <Paper style={this.style.paper} zDepth={1}>
                    <form className='post-form' action="" onSubmit={this.handleSubmit}>
                        <TextField 
                            hintText="Title"
                            ref='title'
                            style={this.style.titleInput}/>
                        <br />
                        <TextField
                            name='content'
                            floatingLabelText="Write your story here..."
                            multiLine={true}
                            rows={10}
                            ref='content'
                            style={this.style.contentInput}
                            />
                        <br />                
                        <RaisedButton 
                            label="Publish" 
                            primary={true} 
                            style={this.style.button} 
                            ref='submitButton'
                            onClick={this.handleSubmit}
                        />
                    </form>
                </Paper>
            </div>           
        );
    }    
}

AddPostForm.PropTypes = {
    addNewPost: PropTypes.func.isRequired, 
}

AddPostForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.currentUser.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (title, content) => {
        dispatch(Actions.createPost(title, content))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostForm)