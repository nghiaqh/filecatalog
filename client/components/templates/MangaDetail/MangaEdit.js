import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { fetchMangaIfNeeded, updateManga, deleteManga } from './actions';

class MangaEdit extends PureComponent {
  constructor(props) {
    super(props);

    const { match, mangas, authors } = this.props;
    const mangaId = parseInt(match.params.mangaId);
    const manga = mangas[mangaId];
    this.state = {
      ...manga
    };

    this.submitForm = this.submitForm.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitDelete = this.submitDelete.bind(this);
  }

  render() {
    const { match, mangas, authors } = this.props;
    const mangaId = parseInt(match.params.mangaId);
    const manga = mangas[mangaId];

    if (typeof manga !== 'undefined') {
      const { title, description, coverPicture, authorId } = this.state;

      return (
        <React.Fragment>
        <Typography use='headline5' style={{margin: '8px', display: 'block'}}>Manga Edit</Typography>
        <StyleForm>
          <TextField box label='Title' type='text'
            value={title || ''}
            onChange={this.onInputChange}
            data-key='title'
            />
          <TextField box label='Description' type='text'
            value={description || ''}
            onChange={this.onInputChange}
            data-key='description'
            />
          <TextField box label='Cover Picture' type='text'
            value={coverPicture || ''}
            onChange={this.onInputChange}
            data-key='coverPicture'
            />
          <TextField box label='Author' type='text'
            value={authorId | ''}
            onChange={this.onInputChange}
            data-key='authorId'
            />
          <Button outlined onClick={this.submitForm}>Save</Button>
          <Button outlined onClick={this.submitDelete}>Delete</Button>
        </StyleForm>
        </React.Fragment>
      )
    }

    return null;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMangaIfNeeded(this.props.match.params.mangaId));
  }

  componentDidUpdate(nextProps) {
    const { match, mangas } = this.props;
    const mangaId = parseInt(match.params.mangaId);
    const manga = mangas[mangaId];

    if (typeof manga !== 'undefined' && !this.state.id) {
      const {id, title, description, coverPicture, authorId } = manga;
      this.setState({
        id: id,
        title,
        description: description || '',
        coverPicture: coverPicture || '',
        authorId: authorId || ''
      });
    }
  }

  submitForm(event) {
    event.preventDefault();
    const { id, title, description, authorId, coverPicture } = this.state;
    const modifiedManga = {
      id,
      title,
      description,
      coverPicture,
      authorId
    }
    this.props.dispatch(updateManga(modifiedManga));
  }

  onInputChange(event) {
    const { value } = event.target;
    const key = event.target.getAttribute('data-key');

    this.setState({
      [key]: value
    });
  }

  submitDelete(event) {
    event.preventDefault();
    this.props.dispatch(deleteManga(this.state.id));
  }
}

const StyleForm = styled('form')`
  width: 100%;
  margin: 0;
  padding: 0 10px;

  .mdc-text-field {
    width: 100%;
    display: block;
    margin: 0 0 10px;
  }

  button {
    margin: 10px 10px 10px 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(MangaEdit);
