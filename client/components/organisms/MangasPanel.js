import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import SearchBox from '../atoms/SearchBox';
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';
import { Switch } from 'rmwc/Switch';
import MangaList from './MangaList';

const StyledMangaList = styled(MangaList)`
`

export default class MangasPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      listType: 'text'
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListTypeSwitch = this.handleListTypeSwitch.bind(this);
  }

  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  handleListTypeSwitch(e) {
    this.setState({listType: e.target.checked ? 'card' : 'text'});
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
          <Typography className="ellipsis" use="headline5">
            Mangas
          </Typography>
        }

        <SearchBox onSearch={this.handleSearch} />
        <br/>
        <Switch
          checked={this.state.listType !== 'text'}
          onChange={this.handleListTypeSwitch}>
          Show thumbnail
        </Switch>

        <StyledMangaList
          searchText={this.state.searchText}
          type={this.state.listType}
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
