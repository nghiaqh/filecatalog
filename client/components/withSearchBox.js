import React, { Component } from 'react';
import SearchBox from './SearchBox';

const withSearchBox = (WrappedComponent) => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: ''
      };
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(filterText) {
      this.setState({filterText: filterText});
    }

    render() {
      return (
        <div>
          <h2>{WrappedComponent.name}</h2>

          <SearchBox
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />

          <WrappedComponent
            filterText={this.state.filterText}
            {...this.props}
          />
        </div>
      );
    }
  }

  return HOC;
}

export default withSearchBox;
