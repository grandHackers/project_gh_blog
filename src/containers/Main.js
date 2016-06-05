import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import Feed from './Feed'
import baseTheme from '../theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const theme = getMuiTheme(baseTheme)

export class Main extends React.Component {
    getChildContext() {
        return {muiTheme: theme}    
    }
    
    constructor(props) {
        super(props)
    }
    
    render() { 
        return (
            <MuiThemeProvider muiTheme={theme}>            
                <div>
                    <Navbar />
                    <div id='container'>
                        <div id='content-wrapper'>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}

Main.childContextTypes = {
    muiTheme: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps)(Main)
