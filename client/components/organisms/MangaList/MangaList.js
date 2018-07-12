import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchMangas, countMangas } from './actions';
import PaginatorControl from '../../molecules/PaginatorControl';
import TextList from '../../organisms/TextList';
import CardList from '../../organisms/CardList';
import MangaCard from '../../molecules/MangaCard';

// component
export class MangaList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div>
        <CardList
          items={this.props.mangas}
          render={this.renderCard}
          onItemClick={this.handleClick}
          {...this.props}
        />
        <PaginatorControl
          handlePagination={this.handlePagination}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
        />
      </div>
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(countMangas());
    dispatch(fetchMangas(12, 1));
  }

  renderList(items) {
    return (
      <TextList
        displayTextFrom='title'
        displaySecondaryFrom={['author', 'name']}
        items={items}
        onItemClick={this.props.onItemClick}
      />
    );
  }

  renderGrid(items) {
    return (
      <CardList
        items={items}
        render={this.renderCard}
        {...this.props}
      />
    );
  }

  renderCard(item, index, handleClick, ...props) {
    return (
      <MangaCard
        key={index}
        manga={item}
        onItemClick={handleClick}
        {...props}
      />
    );
  }

  handlePagination(pageNumber) {
    const { dispatch } = this.props;
    dispatch(fetchMangas(12, pageNumber));
  }

  handleClick(manga) {
    const target = `/mangas/${manga.id}`;
    this.props.history.push(target);
  }
}

// container
const mapStateToProps = (state) => {
  const { paginator, entities } = state.mangaList;
  const total = parseInt(paginator.total);
  const pageSize = parseInt(paginator.pageSize);
  return {
    mangas: paginator.items.map(index => entities.mangas[index]),
    total: total,
    totalPages: Math.ceil(total / pageSize),
    pageNumber: paginator.pageNumber
  };
};

export default connect(mapStateToProps)(MangaList);
