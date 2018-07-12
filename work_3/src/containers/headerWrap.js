import {connect} from 'react-redux';
import 'whatwg-fetch';

import Header from 'components/header';
import {fetchArticleData} from 'action';


const mapDispatchToProps = dispatch => ({
    addArticle: (url) => dispatch(fetchArticleData(url))
});

const HeaderWrap = connect(
    null,
    mapDispatchToProps
)(Header);

export default HeaderWrap;