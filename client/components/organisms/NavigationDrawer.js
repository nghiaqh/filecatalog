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
import styled from 'react-emotion';
import { ThemePicker } from '../molecules/ThemePicker';
import NavLink from '../atoms/NavLink';
// import { NavLink } from 'react-router-dom';

export default class NavigationDrawer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { open, onClose, theme } = this.props;

    return (
      <Block theme={theme}>
        <Drawer
          temporary
          open={open}
          onClose={onClose}
        >
          <DrawerContent>
            <NavLink to='/mangas' onClick={onClose}>
              <ListItem>
                <ListItemGraphic>photo_album</ListItemGraphic>
                <ListItemText>Mangas</ListItemText>
              </ListItem>
            </NavLink>
            <NavLink to='/authors' onClick={onClose}>
              <ListItem>
                <ListItemGraphic>portrait</ListItemGraphic>
                <ListItemText>Authors</ListItemText>
              </ListItem>
            </NavLink>
            <ListDivider/>
            <ThemePicker/>
            <ListDivider/>
          </DrawerContent>
        </Drawer>
      </Block>
    );
  }
}

const Block = styled('div')(props => (
  {
    '.mdc-drawer__drawer': {
      backgroundColor: props.theme.surface
    },
    a: {
      textTransform: 'uppercase'
    }
  }
));
