import React from 'react';
import PropTypes from 'prop-types';

import Page from 'components/page';
import './home';

const ITEMCOUNT = 5;

export default class Home extends React.Component {
    constructor () {
        super();
    }
    componentWillMount () {
        this.props.fetchInitialData();
    }
    render () {
        const listContent = this.props.listContent;
        return (
            <div id="home">
               <table cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <th className="title">标题</th>
                            <th className="wordsNum">字数</th>
                            <th className="cWordsNum">中文字数</th>
                            <th className="eWordsNum">英文字数</th>
                            <th className="sWordsNum">标点符号数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listContent.map((item, index) => {
                                const pageNum = this.props.match.params.id;
                                if ((pageNum - 1) * ITEMCOUNT <= index && index < pageNum * ITEMCOUNT) {
                                    console.log('item');
                                    console.log(item);
                                    return (
                                        <tr key={item.articleId}>
                                            <td className="title">{item.title}</td>
                                            <td className="wordsNum">{item.number}</td>
                                            <td className="cWordsNum">{item.chNumber}</td>
                                            <td className="eWordsNum">{item.enNumber}</td>
                                            <td className="sWordsNum">{item.puncNumber}</td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
               </table>
               <Page pageNum={+this.props.match.params.id} listNum={+this.props.listContent.length}/>
            </div>
        );
    }
}

Home.propTypes = {
    listContent: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        wordsNum: PropTypes.number.isRequired,
        cWordsNum: PropTypes.number.isRequired,
        eWordsNum: PropTypes.number.isRequired,
        sWordsNum: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired
    })).isRequired,
    fetchInitialData: PropTypes.func.isRequired
}