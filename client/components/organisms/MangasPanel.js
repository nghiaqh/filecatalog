import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import MangaList from './MangaList';
import SearchBox from '../molecules/SearchBox';
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

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
          <Typography className="ellipsis" use="headline5">
            Mangas by {author.name}
          </Typography>
          :
          <Typography className="ellipsis" use="headline5">Mangas</Typography>
        }

        <SearchBox onSearch={this.handleSearch} />
        <StyledMangaList
          searchText={this.state.searchText}
          {...this.props}
        />
        {author ?
          <Button dense onClick={this.props.resetAuthor}>show all mangas</Button>
          : ''
        }
      </section>
    );
  }
}
