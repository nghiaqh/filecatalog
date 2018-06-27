import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import MangaList from './MangaList';
import SearchBox from '../molecules/SearchBox';

const StyledMangaList = styled(MangaList)`
  ul {
    flex-direction: row;
    flex-wrap: wrap;
  }

  li {
    flex-basis: 100%;
  }
`

export default class MangasPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  render() {
    const author = this.props.author;

    return (
      <section>
        {author ?
          (
          <div>
            <h3>Mangas by {author.name}</h3>
            <button className="no-border" onClick={this.props.resetAuthor}>show all mangas</button>
          </div>
          ) :
          (<h3>Mangas</h3>)
        }

        <SearchBox onSearch={this.handleSearch} />
        <StyledMangaList
          searchText={this.state.searchText}
          {...this.props}
        />
      </section>
    );
  }
}
