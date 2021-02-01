import React from 'react';
import GuestRoutes from './Routes';
import UserTab from './UserTab';
import {connect} from 'react-redux';



const Providers = ({isLoggedIn}) => {
  return (
    <>
      {isLoggedIn ? <UserTab /> : <GuestRoutes />}
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
