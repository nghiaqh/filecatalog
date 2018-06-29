import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { TextField } from 'rmwc/TextField';

export default class SearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    const value = e.target.value.trim();
    this.props.onSearch(value);
  }

  render() {
    return (
      <TextField fullwidth
        placeholder="Search..."
        onChange={this.handleTextChange}
      />
    );
  }
}
