import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Picture from '@atom/Picture';
import ListItem from '@molecule/ListItem';

export class MangaListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, id, pageCount, coverPicture, authorId } = this.props.manga;
    const url = `/mangas/${id}`;
    const author = this.props.authors[authorId] || {};
    const coverPicUrl = `${encodeURI(coverPicture)}`;
    const picture = <Picture src={coverPicUrl} title={title} />;

    return (
      <ListItem
        url={url}
        picture={picture}
        primaryText={title}
        secondaryText={author.name}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authors: state.entities.authors || {},
    theme: state.themes[state.enabledTheme]
  };
};

export default connect(mapStateToProps)(MangaListItem);
