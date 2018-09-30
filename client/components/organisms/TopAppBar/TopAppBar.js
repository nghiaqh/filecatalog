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
  TopAppBarFixedAdjust,
  TopAppBarActionItem
} from '@rmwc/top-app-bar';

export class TopAppBar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const breadcrumb = this.renderBreadcrumb(this.props);

    return (
      <StyledHeader>
        <RMWCTopAppBar fixed>
          <TopAppBarRow>

            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon
                icon="menu"
                onClick={this.props.onClickMenuIcon} />
              <TopAppBarTitle>
                {breadcrumb}
              </TopAppBarTitle>
            </TopAppBarSection>

            <TopAppBarSection alignEnd>
              <TopAppBarActionItem
                aria-label="Search" alt="Search" icon="search"
                onClick={this.props.onClickSearchIcon} />
            </TopAppBarSection>

          </TopAppBarRow>
        </RMWCTopAppBar>
        <TopAppBarFixedAdjust/>
      </StyledHeader>
    )
  }

  renderBreadcrumb({ breadcrumb, compact }) {
    const items = !compact ? breadcrumb :
      breadcrumb.filter(item => item.visibleOnCompactMode)
    return items.map((item, index) => {
      const uniqueKey = item.url.replace(/\//g,'-');
      const className = index === 0 ? 'first' : null;
      if (index + 1 === breadcrumb.length) {
        return (
          <StyledDiv key={uniqueKey} className={className}>
            {item.prefix}{item.text}
          </StyledDiv>
        )
      }
      return (
        <StyledNavLink to={item.url} exact key={uniqueKey} className={className}>
          {item.prefix}{item.text}
        </StyledNavLink>
      );
    });
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
