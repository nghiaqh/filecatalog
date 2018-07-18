import React, { PureComponent } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta
} from 'rmwc/List';
import { Typography } from 'rmwc/Typography';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { setTheme } from './actions';

export class ThemePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.setTheme = this.setTheme.bind(this);
  }

  render() {
    const { themes, enabledTheme } = this.props;
    const list = Object.keys(themes).map(theme => (
      <ListItem key={theme} onClick={this.setTheme} data-theme={theme}>
        <ListItemGraphic>{enabledTheme === theme ? 'check' : ''}</ListItemGraphic>
        <ListItemText>{theme}</ListItemText>
        <ListItemMeta>
          <Box color={themes[theme].primary}/>
          <Box color={themes[theme].surface}/>
        </ListItemMeta>
      </ListItem>
    ));

    return (
      <StyledThemePicker>
        <Typography id="theme-picker-label" use="overline">Themes</Typography>
        {list}
      </StyledThemePicker>
    );
  }

  setTheme(e) {
    e.preventDefault();
    const theme = e.currentTarget.getAttribute('data-theme');
    this.props.dispatch(setTheme(theme));
  }
}

const StyledThemePicker = styled('div')`
  #theme-picker-label {
    line-height: 48px;
    padding: 0 16px;
  }
  .mdc-list-item {
    cursor: pointer;
  }
  .mdc-list-item__text {
    text-transform: capitalize;
  }
`;

const Box = styled('div')(props => `
  width: 24px;
  height: 24px;
  background: ${props.color};
  border: 1px solid var(--mdc-theme-on-surface);
  display: inline-block;
  margin: 0 5px;
`);

// container
const mapStateToProps = (state) => {
  const { enabledTheme, themes } = state;

  return {
    themes,
    enabledTheme
  };
};

export default connect(mapStateToProps)(ThemePicker);