import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import HeaderWrap from 'containers/headerWrap'; 
import HomeWrap from 'containers/homeWrap';


import './app.scss';

export default class App extends React.Component {
    constructor () {
        super();
    }
    
    render () {
        return (
            <div id="app">
                <HeaderWrap />
                <main>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="/1"/>
                        )}/>
                        <Route path="/:id" component={HomeWrap} />
                    </Switch>
                </main>
            </div>
        );
    }
}