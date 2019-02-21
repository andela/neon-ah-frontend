import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const VerticalArticleCardLoader = () => {
  return (
    <Card fluid>
      <Placeholder>
        <Placeholder.Image style={{ height: 300, width: '100%' }} />
      </Placeholder>
      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length="very short" />
            <Placeholder.Line length="medium" />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
      <Card.Content extra>
        <Placeholder.Paragraph>
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Card.Content>
    </Card>
  );
};

export default VerticalArticleCardLoader;
