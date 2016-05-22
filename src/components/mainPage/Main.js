import React from 'react';
import Navbar from '../../containers/Navbar'
import Footer from '../common/Footer';
import Feed from '../../containers/Feed';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
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
