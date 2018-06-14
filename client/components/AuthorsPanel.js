import React, { Component } from 'react';
import AuthorList from './AuthorList';
import SearchBox from './SearchBox';

export default class AuthorsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      authors: []
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleAuthorClick = this.handleAuthorClick.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleAuthorClick(author) {
    this.props.onAuthorSelect(author);
  }

  componentDidMount() {
    fetch('/api/Authors')
      .then(res => res.json())
      .then(authors => this.setState({ authors: authors }));
  }

  render() {
    return (
      <div>
        <h2>{this.constructor.name}</h2>
        <SearchBox
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <AuthorList
          authors={this.state.authors}
          filterText={this.state.filterText}
          onAuthorClick={this.handleAuthorClick}
        />
      </div>
    );
  }
}
