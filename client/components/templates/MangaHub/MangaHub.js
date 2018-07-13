import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText
} from 'rmwc/List';
import SearchBox from '../../atoms/SearchBox';
import { MangaList } from '../../organisms/MangaList';

const StyledMangaHub = styled('section')`
  .mdc-text-field--fullwidth {
    width: calc(100% - 20px);
    margin: 0 auto;
  }
`

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
      <StyledMangaHub>
        {/* <Drawer persistent open={this.state.persistentOpen == undefined ? true : this.state.persistentOpen}>
          <DrawerHeader>
            Manga Catalog
          </DrawerHeader>
          <DrawerContent>
          <ListItem>
              <ListItemText>Cookies</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Pizza</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Icecream</ListItemText>
            </ListItem>
          </DrawerContent>
        </Drawer> */}

        <SearchBox onSearch={this.handleSearch} />
        <br/>
        <MangaList
          searchText={this.state.searchText}
          history={this.props.history}
        />
      </StyledMangaHub>
    );
  }
}
