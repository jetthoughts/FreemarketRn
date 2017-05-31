import { connect } from 'react-redux';

import { requestSignIn } from '../reducers/user';
import SignInForm from '../components/SignInForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch(requestSignIn(payload)),
});

export default connect(undefined, mapDispatchToProps)(SignInForm);
