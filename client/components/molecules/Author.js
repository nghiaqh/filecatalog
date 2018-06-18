import React, { PureComponent } from 'react';

export default class Author extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const author = this.props.author;

    return (
      <div>
        {author.name}
      </div>
    );
  }
}
