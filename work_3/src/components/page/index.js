import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import './page.scss';

export default class Page extends React.Component {
    constructor () {
        super();
    }

    render () {
        const allowBack = this.props.pageNum > 1;
        const allowForward = this.props.pageNum < this.props.listNum / 5;
        return (
            <div id="page">
                <Link to={`/${this.props.pageNum - 1}`} className={allowBack ? "iconfont active" : "iconfont"} onClick={this.clickBack.bind(this)}>&#xe62f;</Link>
                <span className="pageNum">{this.props.pageNum}</span>
                <Link to={`/${this.props.pageNum + 1}`} className={allowForward ? "iconfont active" : "iconfont"} onClick={this.clickForward.bind(this)}>&#xe611;</Link>
            </div>
        );
    }

    clickBack (e) {
        if (this.props.pageNum <= 1) {
            const event = e || window.event;
            event.preventDefault();
        }
    }

    clickForward (e) {
        if (this.props.pageNum >= this.props.listNum / 5) {
            const event = e || window.event;
            event.preventDefault();
        }
    }
}

Page.propTypes = {
    pageNum: PropTypes.number.isRequired,
    listNum: PropTypes.number.isRequired
}