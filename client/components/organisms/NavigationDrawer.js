import React, { PureComponent } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';
import {
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListDivider
} from 'rmwc/List';
import { NavLink } from 'react-router-dom';
import styled from 'react-emotion';

export default class NavigationDrawer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledDrawer persistent open={this.props.persistentOpen === undefined ? true : this.props.persistentOpen}>
          <DrawerContent>
            <NavLink to="/mangas">
              <ListItem>
                <ListItemGraphic>photo_album</ListItemGraphic>
                <ListItemText>Mangas</ListItemText>
              </ListItem>
            </NavLink>
            <NavLink to="/authors">
              <ListItem>
                <ListItemGraphic>portrait</ListItemGraphic>
                <ListItemText>Authors</ListItemText>
              </ListItem>
            </NavLink>
            <ListDivider/>
          </DrawerContent>
        </StyledDrawer>
    );
  }
}

const StyledDrawer = styled(Drawer)`
  height: 100%;
  flex-shrink: 0;

  &.mdc-drawer--persistent.mdc-drawer--open,
  &.mdc-drawer--persistent .mdc-drawer__drawer {
    background-color: var(--mdc-theme-secondary);
  }

  &.mdc-drawer--persistent .mdc-drawer__drawer {
    position: fixed;
  }

  a {
    text-transform: uppercase;

    &.active {
      .mdc-list-item {
        background-color: var(--mdc-theme-primary);
      }
      .mdc-list-item__text {
        font-weight: bold;
      }
    }
  }
`;
