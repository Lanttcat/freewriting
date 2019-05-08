import { push } from 'connected-react-router'
import {connect} from "react-redux";
import Home from '../components/Home';


const mapStateToProps = (state: {useTimes: number}) => ({
  userTimes: state.useTimes,
});

export default connect(mapStateToProps,{ push })(Home);
