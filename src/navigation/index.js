import React from 'react';
import Routes from './Routes';
import UserTab from './UserTab';
import {connect} from 'react-redux';



const Providers = ({isLoggedIn}) => {
  return (
    <>
      {isLoggedIn ? <UserTab /> : <Routes />}
    </>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(Providers);
