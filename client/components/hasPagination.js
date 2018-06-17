import React, { PureComponent } from 'react';
import Pagination from './Pagination';

const hasPagination = (WrappedComponent, itemsPerPage = 12) => {
  class HasPagination extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        total: 0,
        current: 0,
        itemsPerPage: itemsPerPage
      };
      this.handlePagination = this.handlePagination.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.loadPrevList = this.loadPrevList.bind(this);
      this.loadNextList = this.loadNextList.bind(this);
    }

    handlePagination(index) {
      this.setState({current: index});
      const skip = (index - 1) * this.state.itemsPerPage;
      return this.props.fetchItems(skip, this.state.itemsPerPage)
        .then(items => this.setState({ items: items }));
    }

    loadPrevList() {
      if (this.state.current - 1 > 0) {
        return this.handlePagination(this.state.current - 1);
      }
      return new Promise((resolve, reject) => { reject('Reach the start'); });
    }

    loadNextList() {
      if (this.state.current + 1 < this.state.total) {
        return this.handlePagination(this.state.current + 1);
      }
      return new Promise((resolve, reject) => { reject('Reach the end'); });
    }

    fetchData() {
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
      this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const shouldReset = this.props.shouldResetPagination;
      if (shouldReset && shouldReset(prevProps)) {
        this.setState({
          total: 0,
          current: 0
        }, this.fetchData());
      }
    }

    render() {
      return (
        <div>
          <WrappedComponent
            items={this.state.items}
            onItemClick={this.props.onItemClick}
            loadPrevList={this.loadPrevList}
            loadNextList={this.loadNextList}
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
