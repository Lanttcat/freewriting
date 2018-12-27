import { push } from 'connected-react-router'
import {connect} from "react-redux";
import Edit from '../components/Edit';
import { IGlobalConfig } from '../type';

interface IState {
  configReducer: IGlobalConfig;
}
const mapStateToProps = (state: IState) => ({
  config: state.configReducer
});

export default connect(mapStateToProps,  { push })(Edit);
