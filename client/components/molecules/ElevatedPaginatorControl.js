import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Elevation } from 'rmwc/Elevation';
import PaginatorControl from './PaginatorControl';

export default class ElevatedPaginatorControl extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledElevation
        z={this.props.z}
        transition
        >
        <PaginatorControl
          handlePagination={this.props.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </StyledElevation>
    );
  }
}

const StyledElevation = styled(Elevation)(props => `
  background: ${props.z ? 'var(--mdc-theme-primary)' : 'transparent'};
  border: 1px solid ${props.z ? 'var(--mdc-theme-text-disabled-on-light)' : 'transparent'};
  position: ${props.z ? 'fixed' : 'relative'};
  bottom: 0;
  height: 60px;
  width: 190px;
  left: 50%;
  margin-left: -95px;
  padding-bottom: 10px;
  text-align: center;
`);