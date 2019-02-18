import React from 'react';
import PropTypes from 'prop-types';

const IsSearchResultFound = ({ isDataFound }) => {
  return (
    <>
      {isDataFound ? (
        <div className="align-center margin-top">
          <img
            src="https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/search.svg"
            alt="password reset"
            style={{ width: '100%', height: '232px' }}
          />
        </div>
      ) : (
        <>
          <div className="align-center margin-top">
            <img
              src="https://res.cloudinary.com/jesseinit/image/upload/v1549618838/neon-ah/search.svg"
              alt="password reset"
              style={{ width: '100%', height: '232px' }}
            />
            <div className="search-not-found">
              <p>Sorry we didnt find any results. Check the spelling, or try a different search.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
IsSearchResultFound.propTypes = {
  isDataFound: PropTypes.bool.isRequired
};

export default IsSearchResultFound;
