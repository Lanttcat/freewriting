import { push } from 'connected-react-router'
import {connect} from "react-redux";
import { Dispatch } from 'redux';
import { setGlobalConfig } from '../actions';
import Header from '../components/Header';
import { IGlobalConfig } from '../type';

// interface State {}
// const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  push,
  setConfig: (config: IGlobalConfig) => dispatch(setGlobalConfig(config)),
});

export default connect(null,  mapDispatchToProps)(Header);
