import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { renderError } from '../utils/validator'

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

const validate = values => {
    var errors = {}
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.content) {
        errors.content = 'Required'
    }
    return errors
}

export class PostPublishForm extends Component {
    constructor(props) {
        super(props)
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
    }
        
    render() {
        const { fields: {title, content }, error, 
                handleSubmit, submitting, onPublish,
                defaultTitle, defaultContent } = this.props
        return (
            <div className='post-form-wrapper'>
                <Paper style={this.style.paper} zDepth={1}>
                    <form className='post-form' action="" onSubmit={this.handleSubmit}>
                        <TextField 
                            hintText="Title"
                            ref='title'
                            style={this.style.titleInput}
                            errorText={renderError(title)}
                            {...title}
                            />
                        <br />
                        <TextField
                            name='content'
                            floatingLabelText="Write your story here..."
                            multiLine={true}
                            rows={10}
                            ref='content'
                            style={this.style.contentInput}
                            errorText={renderError(content)}
                            {...content}
                            />
                        <br />
                        
                        {error && <div>{error}</div>}                 
                        <RaisedButton 
                            label="Publish" 
                            primary={true} 
                            style={this.style.button} 
                            ref='submitButton'
                            onClick={handleSubmit(onPublish)}
                            disabled={submitting}
                        />
                    </form>
                </Paper>
            </div>           
        );
    }    
}

PostPublishForm.PropTypes = {
    onPublish: PropTypes.func.isRequired,
    initialValues: PropTypes.obj,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    currentUsername: state.currentUser.username
})

export default reduxForm({
    form: 'postPublishForm',
    fields: ['title', 'content'],
    validate
},
mapStateToProps)(PostPublishForm)