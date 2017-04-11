import React, { PropTypes } from 'react';

const SignIn = ({ signIn }) => (
  <div className="nav-link" onClick={signIn}>Sign In</div>
  );

SignIn.propTypes = {
  signIn: PropTypes.func,
};

export default SignIn;
