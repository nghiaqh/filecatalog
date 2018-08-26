import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import styled from 'react-emotion';
import { connect } from 'react-redux';

export class StyledNavLink extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      to,
      onClick,
      children,
      theme,
      color,
      bgColor,
      activeColor,
      activeBgColor
    } = this.props;

    const style = {
      color: theme[color || 'onSurface'],
      bgColor: theme[bgColor || 'surface'],
      activeColor: theme[activeColor || 'onSecondary'],
      activeBgColor: theme[activeBgColor || 'secondary']
    }

    return (
      <Wrapper
        customStyle={style}
      >
        <NavLink to={to} onClick={onClick}>{children}</NavLink>
      </Wrapper>
    );
  }
}

const Wrapper = styled('div')(props => {
  const { color, bgColor, activeColor, activeBgColor } = props.customStyle;

  return {
    color: color,
    textTransform: 'capitalize',

    'a, .mdc-list-item__graphic': {
      color: color,
    },

    '.mdc-list-item': {
      backgroundColor: bgColor
    },

    'a.active': {
      color: activeColor,

      '.mdc-list-item__text': {
        fontWeight: 'bold'
      },

      '.mdc-list-item': {
        backgroundColor: activeBgColor
      },

      '.mdc-list-item__graphic': {
        color: activeColor
      }
    }
  }
});

// Container
const mapStateToProps = (state) => {
  const { themes, enabledTheme } = state;

  return {
    theme: themes[enabledTheme]
  };
};

export default withRouter(
  connect(mapStateToProps, null, null, { pure: false })(StyledNavLink)
);
