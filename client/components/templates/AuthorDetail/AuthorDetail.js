import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { MangaList } from '../../organisms/MangaList';
import { fetchAuthorIfNeeded } from './actions';

export class AuthorDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAuthorIfNeeded(this.props.match.params.authorId));
  }

  render() {
    const authorId = this.props.match.params.authorId;
    const authors = this.props.authors;

    if (typeof authors[authorId] !== 'undefined' &&
      typeof authors[authorId].id !== 'undefined') {
      return (
        <StyledSection>
          <MangaList authorId={authorId} />
        </StyledSection>
      );
    }
    return null;
  }

}

const StyledSection = styled('section')`
  width: 100%;
`

const mapStateToProps = (state) => {
  return {
    authors: state.authors
  };
};

export default connect(mapStateToProps)(AuthorDetail);
