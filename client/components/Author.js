import React, { Component } from 'react';

export default class Author extends Component {
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
