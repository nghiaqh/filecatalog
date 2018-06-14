import React, { Component } from 'react';
import MangaList from './MangaList';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
import { fetchItems, countItems } from './Datasource';

const ITEM_PER_PAGE = 12;
const api = '/api/Mangas';

export default class MangasPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      mangas: [],
      total: 0,
      current: 0
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleMangaClick = this.handleMangaClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleMangaClick(manga) {
    this.props.onMangaSelect(manga);
  }

  handlePagination(index) {
    this.setState({current: index});
    const author = this.props.author;
    const skip = (index - 1) * ITEM_PER_PAGE;
    const where = author ? {authorId: author.id} : {};
    fetchItems(api, where, skip, ITEM_PER_PAGE)
      .then(mangas => this.setState({ mangas: mangas }));
  }

  componentDidMount() {
    const author = this.props.author;
    let property = null;
    let value = null;
    if (author) {
      property = 'authorId';
      value = author.id;
    }

    countItems(api, property, value)
      .then(result => {
        if (result.count > 0) {
          this.setState({
            total: Math.ceil(result.count / ITEM_PER_PAGE),
            current: 1
          });
        }
      });

    const skip = (this.state.current - 1) * ITEM_PER_PAGE;
    const where = author ? {authorId: author.id} : {};
    fetchItems(api, where, skip, ITEM_PER_PAGE)
      .then(mangas => this.setState({ mangas: mangas }));
  }

  render() {
    const author = this.props.author;

    return (
      <div>
        <h2>{this.constructor.name}</h2>
        <SearchBox
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />

        {author ? (<h3>Mangas by {author.name}</h3>) : ''}

        <MangaList
          mangas={this.state.mangas}
          filterText={this.state.filterText}
          author={this.props.author}
          onMangaClick={this.handleMangaClick}
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
