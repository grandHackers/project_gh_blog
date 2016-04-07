import React from 'react';

export default class NavBar extends React.Component {
    // logo with a link
    // sign in or sign out button

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // probably not needed for this component.
    }

    render() { 
        var logoPath = "/images/backgom.jpg"; 
        var linkToMain = "/"
        // TODO Let react router take care of this eventually
        var sessionLink = "/signin";
        var sessionText = "Sign in";
        
        if (this.props.signedIn) {
            sessionLink = "/signout";
            sessionText = "Sign out";
        }
        
        // blocking link since we don't have the
        // sign in/out mechanism in place yet
        var blockRoute = function(event) {
            event.preventDefault();
            console.log('clicked a link!');
        }
        
        // Render
        return (
            <div>
                <a href={linkToMain} onClick={blockRoute}> <img src={logoPath}/> </a>
                <a href={sessionLink} onClick={blockRoute}>{sessionText}</a>
            </div>
        );
    }

}
