import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PageList } from '../../organisms/PageList';
import { fetchMangaIfNeeded } from './actions';

export class MangaDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMangaIfNeeded(this.props.match.params.mangaId));
  }

  render() {
    const mangaId = parseInt(this.props.match.params.mangaId);
    const mangas = this.props.mangas;

    if (typeof mangas[mangaId] !== 'undefined' &&
      typeof mangas[mangaId].id !== 'undefined') {
      return (
        <PageList manga={mangas[mangaId]} />
      );
    }
    return null;
  }

}

const mapStateToProps = (state) => {
  return {
    mangas: state.mangas
  };
};

export default connect(mapStateToProps)(MangaDetail);
