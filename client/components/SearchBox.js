import React, { PureComponent } from 'react';

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
    const value = e.target[0].value;
    if (value.trim() === '') return;
    this.props.onSearch(value);
  }

  render() {
    return (
      <form type="submit" onSubmit={this.onInitialSearch}>
        <input
          type="text"
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
