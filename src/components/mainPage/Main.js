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
        if (!!this.props.currentUser) {
            feed = <Feed />
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
