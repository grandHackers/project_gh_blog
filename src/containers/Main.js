import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Footer from '../components/Footer'
import Feed from './Feed'

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
            <div>
                <Navbar />
                {feed}
                <Footer />
            </div>
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
