import { push } from 'connected-react-router'
import {connect} from "react-redux";
import Feedback from '../components/Feedback';

export default connect(null,  { push })(Feedback);
