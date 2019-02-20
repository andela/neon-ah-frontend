import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import authentication from '../../../utils/auth/authentication';
import decodeToken from '../../../utils/auth/jwtDecode';
import { logout } from '../../../action/authActions/authActions';

const ImageDropdown = ({ userinfo, open, logOutUser, history }) => {
  const { userName } = userinfo;
  return (
    <ul
      className="dropdown__submenu"
      style={{
        display: open ? 'block' : 'none'
      }}
    >
      <li className="dropdown__submenu-item">
        <Link to={`/profile/${userinfo.userName}`}>Profile</Link>
      </li>
      <li className="dropdown__submenu-item">
        <Link
          className="link"
          to="/Logout"
          onClick={e => {
            e.preventDefault();
            logOutUser(history);
          }}
        >
          LogOut
        </Link>
      </li>
    </ul>
  );
};

const mapDispatchToProps = {
  logOutUser: logout
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ImageDropdown));
