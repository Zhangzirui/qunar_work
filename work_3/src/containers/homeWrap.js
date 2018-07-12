import {connect} from 'react-redux';

import Home from 'components/home';
import {fetchInitialData} from 'action';



const mapStateToProps = state => ({
    listContent: state
});

const matDispatchToProps = dispatch => ({
    fetchInitialData: () => dispatch(fetchInitialData())
});

const HomeWrap = connect(
    mapStateToProps,
    matDispatchToProps
)(Home);

export default HomeWrap;