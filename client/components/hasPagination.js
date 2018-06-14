import React, { Component } from 'react';
import Pagination from './Pagination';

const hasPagination = (WrappedComponent, itemsPerPage = 12) => {
  class HasPagination extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        total: 0,
        current: 0,
        itemsPerPage: itemsPerPage
      };
      this.handlePagination = this.handlePagination.bind(this);
      this.updateState = this.updateState.bind(this);
    }

    handlePagination(index) {
      this.setState({current: index});
      const skip = (index - 1) * this.state.itemsPerPage;
      this.props.fetchItems(skip, this.state.itemsPerPage)
        .then(items => this.setState({ items: items }));
    }

    updateState() {
      this.props.countItems()
        .then(result => {
          if (result && result.count > 0) {
            this.setState({
              total: Math.ceil(result.count / this.state.itemsPerPage),
              current: 1
            }, () => {
              const skip = (this.state.current - 1) * this.state.itemsPerPage;
              this.props.fetchItems(skip, this.state.itemsPerPage)
                .then(items => this.setState({ items: items }));
            });
          }
        });
    }

    componentDidMount() {
      this.updateState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const stateNeedsReset = this.props.stateNeedsReset;
      if (stateNeedsReset && stateNeedsReset(prevProps, prevState, snapshot)) {
        this.setState({
          total: 0,
          current: 0
        }, this.updateState());
      }
    }

    render() {
      return (
        <div>
          <WrappedComponent
            items={this.state.items}
            {...this.props}
          />

          <Pagination
            total={this.state.total}
            current={this.state.current}
            handlePagination={this.handlePagination}
          />
        </div>
      );
    }
  }

  return HasPagination;
}

export default hasPagination;
