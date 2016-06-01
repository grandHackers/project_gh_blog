import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import Feed from './Feed'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const lightMuiTheme = getMuiTheme(lightBaseTheme)

export class Main extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() { 
        var feed;
        console.log("owner: " + this.props.params.owner)
        const owner = this.props.params.owner
        if (!!owner) {
            feed = <Feed owner={owner}/>
        }
        return (
            <MuiThemeProvider muiTheme={lightMuiTheme}>            
                <div>
                    <Navbar />
                    {feed}
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
