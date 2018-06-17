import React, { PureComponent } from 'react';
import PageList from './PageList';

export default class Manga extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.manga.title;

    return (
      <div>
          <h1>manga {title}</h1>
      </div>
    );
  }
}
