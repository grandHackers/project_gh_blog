import React from 'react';
import NavBar from '../common/Navbar';
import Footer from '../common/Footer';
import Feed from '../../containers/Feed';
import AddPostForm from '../../containers/AddPostForm';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div>
                <NavBar signedIn={false}/>
                <AddPostForm />
                <Feed />
                <Footer />
            </div>
        );
    }
}
