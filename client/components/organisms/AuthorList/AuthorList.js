import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { fetchAuthorsIfNeeded, fetchAuthors } from './actions';
import { ElevatedPaginatorControl } from '../../molecules/PaginatorControl';
import ContentList from '../ContentList';
import AuthorListItem from '../../molecules/AuthorListItem';

// component
export class AuthorList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pcEvation: 24
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updatePaginatorControlState = this.updatePaginatorControlState.bind(this);
  }

  render() {
    return (
      <StyledAuthorList>
        <ContentList
          id="main"
          items={this.props.authors}
          render={this.renderListItem}
        />

        <ElevatedPaginatorControl
          z={this.state.pcEvation}
          handlePagination={this.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </StyledAuthorList>
    );
  }

  componentDidMount() {
    const { dispatch, searchText } = this.props;
    const filter = { name: searchText };
    dispatch(fetchAuthorsIfNeeded(20, 1, filter));
    document.addEventListener('keydown', this.handleKeyDown);
    this.updatePaginatorControlState();
    window.addEventListener('scroll', this.updatePaginatorControlState);
  }

  componentDidUpdate(prevProps) {
    const { dispatch, searchText, pageSize } = this.props;

    if (searchText !== prevProps.searchText) {
      const filter = { name: searchText };
      dispatch(fetchAuthorsIfNeeded(pageSize, 1, filter));
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.updatePaginatorControlState);
  }

  renderListItem(item) {
    return (
      <AuthorListItem
        key={'author-' + item.id}
        key={item.id}
        author={item}
        onItemClick={this.handleClick}
      />
    );
  }

  handlePagination(pageNumber) {
    const { dispatch, searchText, pageSize, totalPages } = this.props;
    const filter = { name: searchText };
    if (pageNumber !== this.props.pageNumber && pageNumber <= totalPages && pageNumber) {
      dispatch(fetchAuthors(pageSize, pageNumber, filter));
    }
  }

  handleClick(author) {
    const target = `/authors/${author.id}`;
    this.props.history.push(target);
  }

  handleKeyDown(e) {
    const {pageNumber, totalPages} = this.props;
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        return this.handlePagination(pageNumber - 1);
      case 'ArrowRight':
        e.preventDefault();
        return this.handlePagination(pageNumber + 1);
      default:
        return;
    }
  }

  updatePaginatorControlState() {
    const el = document.getElementById('main');
    if (!el) return;
    const pageHeight = window.innerHeight;
    const { bottom } = el.getClientRects()[0];
    const x = pageHeight - bottom;
    if (x >= 0 && this.state.pcEvation) {
      this.setState({pcEvation: 0});
    } else if (x < 0 && this.state.pcEvation === 0) {
      this.setState({pcEvation: 24});
    }
  }
}

const StyledAuthorList = styled('section')`
  position: relative;
`;

// container
const mapStateToProps = (state) => {
  const { paginator } = state.authorList;
  const { authors } = state;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    authors: paginator.items.map(index => authors[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber,
    pageSize: pageSize
  };
};

export default connect(mapStateToProps)(AuthorList);
