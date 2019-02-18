import React from 'react';
import { Image, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const VerticalArticleCard = () => {
  return (
    <Card fluid>
      <Image small src="https://res.cloudinary.com/dnavbc7ny/image/upload/v1550506089/rick_and_morty_w6h6h5.png" />
      <Card.Content className="card-bg">
        <Card.Header>
          <Link to="/" className="card-link">
            Getting started with Webpack 4
          </Link>
        </Card.Header>

        <Card.Description>
          Sed ut prspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam,
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
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
      </Card.Content>
    </Card>
  );
};

export default VerticalArticleCard;
