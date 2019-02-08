import React from 'react';
import { Icon } from 'semantic-ui-react';

const SocialIcons = () => {
  return (
    <div data-test="socialIcons" id="socialIcons">
      <Icon name="whatsapp" />
      <Icon name="facebook" />
      <Icon name="twitter" />
      <Icon name="bookmark outline" className="bookmark" />
    </div>
  );
};

export default SocialIcons;
