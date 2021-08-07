import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssDemo from './components/cssDemo';

class Demo extends Component {
    constructor (props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
        <div>hello world
        <CssDemo />
        </div>
        )
        
    }
}

ReactDOM.render(<Demo />,document.querySelector('#app'));
