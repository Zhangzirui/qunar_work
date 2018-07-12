import React from 'react';
import PropTypes from 'prop-types';

import './header';

export default class Header extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div id="header">
                <form onSubmit={this.submitEvent.bind(this)}>
                    <p>
                        <input className="addInput" type="text" placeholder="输入文章链接" ref="addInput"/>
                        <button type="submit" className="addButton">添加</button>
                    </p>
                </form>
            </div>
        );
    }

    submitEvent (e) {
        const event = e || window.event;
        event.preventDefault();

        this.props.addArticle(this.refs.addInput.value); 
    }
}

Header.propTypes = {
    addArticle: PropTypes.func.isRequired
};