import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './HorizontalArticleCard.scss';

const HorizontalArticleCard = () => {
  return (
    <div className="ui card horizontal">
      <div className="image">
        <Image src="https://res.cloudinary.com/dnavbc7ny/image/upload/v1550505647/pexels-photo-981619_h9enuv.jpg" />
      </div>
      <div className="content card-bg">
        <Link to="/" className="header card-link">
          CSS Flexbox from Scratch
        </Link>
        <div className="description">Sed ut perspiciatis unde omnis iste architecto...</div>
        <div className="meta">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Link to="/" className="card-link">
                Jesse Egbosionu
              </Link>
              <p>10th Sept. 2 mins</p>
            </div>
            <div>
              <a href="/" className="card-link">
                <Icon name="bookmark outline" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalArticleCard;
