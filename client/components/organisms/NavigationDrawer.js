import React, { PureComponent } from 'react';
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerContent
} from '@rmwc/drawer';
import {
  ListItem,
  ListItemGraphic,
  ListDivider
} from '@rmwc/list';
import styled from 'react-emotion';
import { ThemePicker } from '../molecules/ThemePicker';
import NavLink from '../atoms/NavLink';

export default class NavigationDrawer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { open, onClose, theme } = this.props;

    return (
      <StyledDrawer
        theme={theme}
        modal
        open={open}
        onClose={onClose}
      >
        <DrawerHeader>
          <DrawerTitle>File Catalog</DrawerTitle>
        </DrawerHeader>

        <DrawerContent>
          <NavLink to='/mangas' onClick={onClose}>
            <ListItem>
              <ListItemGraphic icon='photo_album'/>
              Mangas
            </ListItem>
          </NavLink>
          <NavLink to='/authors' onClick={onClose}>
            <ListItem>
              <ListItemGraphic icon='portrait'/>
              Authors
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

const StyledDrawer = styled(Drawer)(props => (
  {
    backgroundColor: props.theme.secondary,
    color: props.theme.onSecondary,
    top: 0,

    a: {
      textTransform: 'uppercase'
    },

    '.mdc-drawer-scrim': {
      top: '64px'
    },

    '.mdc-drawer__title, .mdc-list-item, .mdc-list-item__graphic': {
      color: props.theme.onSecondary
    }
  }
));
