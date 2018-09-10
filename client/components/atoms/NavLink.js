import React from 'react';
import { NavLink } from 'react-router-dom';
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
      color: theme[color || 'onSecondary'],
      bgColor: theme[bgColor || 'secondary'],
      activeColor: theme[activeColor || 'onSurface'],
      activeBgColor: theme[activeBgColor || 'surface']
    }

    return (
      <WrappedNavLink to={to} onClick={onClick} style={style}>
        {children}
      </WrappedNavLink>
    );
  }
}

const WrappedNavLink = styled(NavLink)(props => {
  const { color, bgColor, activeColor, activeBgColor } = props.style;

  return {
    color: color,
    textTransform: 'capitalize',

    '.mdc-list-item__graphic': {
      color: color,
    },

    '.mdc-list-item': {
      backgroundColor: bgColor
    },

    '&.active': {
      color: activeColor,

      '.mdc-list-item__text': {
        fontWeight: 'bold'
      },

      '.mdc-list-item': {
        color: activeColor,
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

export default connect(mapStateToProps)(StyledNavLink);
