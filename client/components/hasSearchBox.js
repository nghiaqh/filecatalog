import React, { Component } from 'react';
import SearchBox from './SearchBox';

const hasSearchBox = (WrappedComponent) => {
  class HasSearchBox extends Component {
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

  return HasSearchBox;
}

export default hasSearchBox;
