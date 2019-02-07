import React from 'react';
import './Header.scss';
import logo from '../../../../public/images/logo.svg';
const Header = ({ children }) => {
	return (
		<div className="header">
			<div className="ui container">
				<div className="header__container">
					<div>
						<img src={logo} alt="Authors haven logo" className="logo" />
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

