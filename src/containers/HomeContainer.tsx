import { push } from 'connected-react-router'
import {connect} from "react-redux";
import Home from '../components/Home';

export default connect(null,  { push })(Home);
