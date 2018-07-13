import React, { PureComponent } from 'react';
import { Button } from 'rmwc/Button';
import SearchBox from '../../atoms/SearchBox';
import { MangaList } from '../../organisms/MangaList';

export default class MangaHub extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    this.setState({ searchText: text });
  }

  render() {
    return (
      <section>
        <SearchBox onSearch={this.handleSearch} />
        <br/>
        <MangaList
          searchText={this.state.searchText}
          history={this.props.history}
        />
      </section>
    );
  }
}
