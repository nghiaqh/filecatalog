import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import { fetchMangaIfNeeded, updateManga } from './actions';

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
  }

  render() {
    const { match, mangas, authors } = this.props;
    const mangaId = parseInt(match.params.mangaId);
    const manga = mangas[mangaId];

    if (typeof manga !== 'undefined') {
      const { title, description, coverPicture, authorId } = this.state;

      return (
        <React.Fragment>
        <Typography use='headline5'>Manga Edit</Typography>
        <StyleForm>
          <TextField outlined label='Title' type='text'
            value={title || ''}
            onChange={this.onInputChange}
            data-key='title'
            />
          <TextField outlined label='Description' type='text'
            value={description || ''}
            onChange={this.onInputChange}
            data-key='description'
            />
          <TextField outlined label='Cover Picture' type='text'
            value={coverPicture || ''}
            onChange={this.onInputChange}
            data-key='coverPicture'
            />
          <TextField outlined label='Author' type='text'
            value={authorId | ''}
            onChange={this.onInputChange}
            data-key='authorId'
            />
          <Button onClick={this.submitForm}>Save</Button>
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
    const modifiedManga = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description
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
}

const StyleForm = styled('form')`
  width: 100%;
  margin: 0;
  padding: 10px;

  .mdc-text-field {
    width: 100%;
    display: block;
    margin: 5px 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    authors: state.entities.authors || {}
  };
};

export default connect(mapStateToProps)(MangaEdit);
