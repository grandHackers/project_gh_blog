import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import Feed from './Feed'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const theme = getMuiTheme(lightBaseTheme)

export class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() { 
        return (
            <MuiThemeProvider muiTheme={theme}>            
                <div>
                    <Navbar />
                    <div id='content'>
                        {this.props.children}
                    </div>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser
  }
}

export default connect(
  mapStateToProps)(Main)
