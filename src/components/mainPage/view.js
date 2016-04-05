import React from 'react';

import NavBar from '../common/navbar';
import Footer from '../common/footer';
import Feed from './feed';
import AddPostForm from './add-post-form';

export default class View extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    
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
