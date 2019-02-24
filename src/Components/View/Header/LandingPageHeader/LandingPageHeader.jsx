import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Modal from '../../Modal/Modal';
import LoggedInHeaderSearch from '../../SearchFunctionality/LoggedInHeaderSearch/LoggedInHeaderSearch';

class LandingPageHeader extends Component {
  state = {
    searchIconClick: false
  };

  handleSearchIconClick = () => {
    const { searchIconClick } = this.state;
    this.setState({
      searchIconClick: !searchIconClick
    });
  };

  render() {
    const { searchIconClick } = this.state;
    return (
      <div className="landingPage__mobile">
        <div>
          {searchIconClick ? (
            <>
              <div id="display-search-flex">
                <div>
                  <Icon
                    link
                    name="search"
                    style={{ marginRight: '10px', marginTop: '6px' }}
                    onClick={this.handleSearchIconClick}
                  />
                </div>
                <div>
                  <LoggedInHeaderSearch style={{ marginRight: '10px' }} />
                </div>
              </div>
            </>
          ) : (
            <Icon
              link
              name="search"
              style={{ marginRight: '10px', marginTop: '6px' }}
              onClick={this.handleSearchIconClick}
            />
          )}
        </div>
        <Modal
          type="login"
          triggerEl={<Button content="Login" style={{ backgroundColor: '#2fb5ee', color: '#fff' }} />}
        />
        <Modal triggerEl={<Button basic content="Sign Up" style={{ boxShadow: 'none' }} />} />
      </div>
    );
  }
}

export default LandingPageHeader;
