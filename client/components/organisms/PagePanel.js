import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import Page from '../molecules/Page';
import Paginator from '../molecules/Paginator';
import { fetchItems, countItems } from '../Datasource';

const api = '/api/Pages';

export default class PagePanel extends PureComponent {
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
    this.countItems = this.countItems.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleGesture = this.handleGesture.bind(this);
  }

  componentDidMount() {
    // support page load by arrow key
    document.addEventListener('keydown', this.handleArrowKey);

    // support page load by swipe/tap
    this.gestureZone = document.getElementsByTagName('body')[0];
    this.gestureZone.addEventListener('touchstart', this.handleTouchStart, false);
    this.gestureZone.addEventListener('touchend', this.handleTouchEnd, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleArrowKey);
    this.gestureZone.removeEventListener('touchstart', this.handleTouchStart);
    this.gestureZone.removeEventListener('touchend', this.handleTouchEnd);
  }

  render() {
    const page = this.props.page;
    return (
      <section>
        { page ? (
          <Paginator
            fetchItems={this.fetchItems}
            countItems={this.countItems}
            itemsPerPage={1}
            render={this.renderPage}
            current={this.props.page.number}
        />
        ) : ''}
      </section>
    );
  }

  countItems() {
    const { page } = this.props;
    if (page === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    const where = { mangaId: page.mangaId };
    return countItems(api, where);
  }

  fetchItems(skip, itemPerPage) {
    const { page } = this.props;
    if (page === null) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }

    const filter = {
      where: { mangaId: page.mangaId },
      order: 'title'
    };
    return fetchItems(api, filter, skip, itemPerPage);
  }

  renderPage(items, loadPrev, loadNext) {
    this.loadPrev = this.loadPrev || loadPrev;
    this.loadNext = this.loadNext || loadNext;

    if (items.length === 0) {
      return;
    }
    return <Page page={items[0]} />;
  }

  handleArrowKey(e) {
    if (e.keyCode === 37 && this.loadPrev) {
      e.preventDefault();
      this.loadPrev().catch((e) => console.log(e));
    } else if (e.keyCode === 39 && this.loadNext) {
      e.preventDefault();
      this.loadNext().catch((e) => console.log(e));
    }
  }

  handleTouchStart(e) {
    this.touchstartX = e.changedTouches[0].screenX;
  }

  handleTouchEnd(e) {
    this.touchendX = e.changedTouches[0].screenX;
    this.handleGesture(e);
  }

  handleGesture(e) {
    if (!this.loadPrev || !this.loadNext) return;
    const pageWidth = window.innerWidth || document.body.clientWidth;
    let x = this.touchendX - this.touchstartX;
    if (x < -40 || this.touchendX > 2 * pageWidth / 4) {
      console.log("left");
      this.loadNext().catch((e) => console.log(e));
    } else if (x > 40 || this.touchendX < pageWidth / 4) {
      console.log("right");
      this.loadPrev().catch((e) => console.log(e));
    }
  }
}
