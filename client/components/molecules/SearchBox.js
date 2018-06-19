import React, { PureComponent } from 'react';
import styled from 'react-emotion';

const Form = styled('form')`
  margin: 20px 0;
`

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
    // if (value.trim() === '') return;
    this.props.onSearch(value);
  }

  render() {
    return (
      <Form type="submit" onSubmit={this.onInitialSearch}>
        <input
          type="text"
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </Form>
    );
  }
}
