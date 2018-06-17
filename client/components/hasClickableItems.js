import React, { PureComponent } from 'react';

const hasClickableItems = (WrappedComponent) => {
  class HasClickableItems extends PureComponent {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      e.preventDefault();
      const i = parseInt(e._targetInst.key);
      const item = this.props.items[i];
      this.props.onItemClick(item);
    }

    render() {
      const items = this.props.items;

      return (
        <div>
          <WrappedComponent
            items = {items}
            handleClick = {this.handleClick}
            {...this.props}
          />
        </div>
      );
    }
  }

  return HasClickableItems;
}

export default hasClickableItems;
