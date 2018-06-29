import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { TextField } from 'rmwc/TextField';

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.onInitialSearch = this.onInitialSearch.bind(this);
  }

  onInitialSearch(e) {
    e.preventDefault();
    const value = e.target[0].value.trim();
    this.props.onSearch(value);
  }

  render() {
    return (
      <TextField fullwidth
        label="Search..."
        onSubmit={this.onInitialSearch}
      />
    );
  }
}
