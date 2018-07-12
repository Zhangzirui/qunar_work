import React from 'react';
import './header';

export default class Header extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <header id="header">
                <h1 className="appTitle">React Todo</h1>
            </header>
        );
    }
}