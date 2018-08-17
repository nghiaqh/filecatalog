import React, { PureComponent } from 'react';
import {
  Drawer,
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
import { ThemePicker } from '../molecules/ThemePicker';

export default class NavigationDrawer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledDrawer temporary open={this.props.open} onClose={this.props.onClose}>
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
            <ThemePicker/>
            <ListDivider/>
          </DrawerContent>
        </StyledDrawer>
    );
  }
}

const StyledDrawer = styled(Drawer)`
  height: 100%;
  flex-shrink: 0;

  & .mdc-drawer__drawer {
    background-color: var(--mdc-theme-surface);
  }

  & .mdc-drawer__drawer {
    position: fixed;
  }

  a {
    text-transform: uppercase;
    color: var(--mdc-theme-on-surface);
    .mdc-list-item__graphic {
      color: var(--mdc-theme-on-surface);
    }

    &.active {
      color: var(--mdc-theme-on-primary);
      .mdc-list-item {
        background-color: var(--mdc-theme-primary);
      }
      .mdc-list-item__text {
        font-weight: bold;
      }
      .mdc-list-item__graphic {
        color: var(--mdc-theme-on-primary);
      }
    }
  }
`;
