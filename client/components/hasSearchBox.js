import React, { PureComponent } from 'react';
import SearchBox from './molecules/SearchBox';

const hasSearchBox = (WrappedComponent) => {
  class HasSearchBox extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        filterText: ''
      };
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(filterText) {
      this.setState({filterText: filterText});
    }

    render() {
      return (
        <div>
          <h2>{WrappedComponent.name}</h2>

          <SearchBox onSearch={this.handleSearch} />

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
