import React, { PureComponent } from 'react';
import Avatars from '@dicebear/avatars';
import MSpriteCollection from '@dicebear/avatars-male-sprites';
import FSpriteCollection from '@dicebear/avatars-female-sprites';

export default class Avatar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { seed, collection } = this.props;
    const collections = {
      male: MSpriteCollection,
      female: FSpriteCollection
    }
    const avatars = new Avatars(collections[collection] || collections.male);
    const svg = avatars.create(this.props.seed);
    return <span dangerouslySetInnerHTML={{__html: svg}} />;
  }
}
