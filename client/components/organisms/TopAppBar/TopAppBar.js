import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  TopAppBar as RMWCTopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';

export class TopAppBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { breadcrumb } = this.props;
    const keys = Object.keys(breadcrumb);
    const links = keys.map((key, index) => {
      const item = breadcrumb[key];
      const uniqueKey = item.url.replace(/\//g,'-');
      if (index + 1 === keys.length) {
        return (
          <StyledDiv key={uniqueKey} className={index === 0 ? 'first' : ''}>
            {item.text}
          </StyledDiv>
        )
      }
      return (
        <StyledNavLink to={item.url} exact key={uniqueKey}
          className={index === 0 ? 'first' : ''}>
          {item.text}
        </StyledNavLink>
      );
    });

    return (
      <StyledHeader>
        <RMWCTopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon
                icon="menu"
                onClick={this.props.onClickMenuIcon}
              />
              <TopAppBarTitle>
                {links}
              </TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </RMWCTopAppBar>
        <TopAppBarFixedAdjust/>
      </StyledHeader>
    )
  }
}

const StyledHeader = styled('header')`
  .mdc-top-app-bar a {
    color: var(--mdc-theme-on-primary);
    &:visited {
      color: var(--mdc-theme-on-primary);
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  text-transform: capitalize;
  margin: 0;
  vertical-align: middle;

  &:not(.first):before {
    content: '/';
    color: var(--mdc-theme-on-primary);
    margin: 0 10px;
  }
`;

const StyledDiv = styled('div')`
  display: inline-block;
  text-transform: capitalize;
  margin: 0;
  vertical-align: middle;
  color: var(--mdc-theme-on-primary);

  &:not(.first):before {
    content: '/';
    color: var(--mdc-theme-on-primary);
    margin: 0 10px;
  }
`;

// container
const mapStateToProps = (state) => {
  const { breadcrumb } = state;

  return {
    breadcrumb
  };
};

export default connect(mapStateToProps)(TopAppBar);
