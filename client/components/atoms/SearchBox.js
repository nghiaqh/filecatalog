import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { TextField } from '@rmwc/textfield';
import styled from 'react-emotion';
import { connect } from 'react-redux';

class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trailingIcon: 'search'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.clickIcon = this.clickIcon.bind(this);
    this.clearText = this.clearText.bind(this)
    this.search = debounce(props.onSearch, 500);
  }

  render() {
    const { trailingIcon } = this.state;
    return (
      <StyledTextField
        fullwidth={this.props.fullwidth}
        outlined={this.props.outlined}
        box={this.props.box}
        dense={this.props.dense}
        type={this.props.type}
        placeholder={this.props.placeholder}
        label={this.props.label}
        value={this.props.value}
        disabled={this.props.disabled}
        className='search-box'
        withTrailingIcon={trailingIcon}
        onChange={this.handleTextChange}
      />
    );
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.textField = this.node.getElementsByTagName('input')[0];
    const icon = this.node.getElementsByClassName('mdc-text-field__icon')[0];
    if (icon) {
      icon.addEventListener('click', this.clickIcon);
    }
  }

  clickIcon(e) {
    e.preventDefault();
    if (this.state.trailingIcon === 'delete') {
      this.clearText()
    } else {
      this.textField.focus();
    }
  }

  clearText() {
    this.textField.value = '';
    this.search('');
    this.setState({
      trailingIcon: 'search'
    })
  }

  handleTextChange(e) {
    const value = e.target.value.trim();
    this.setState({
      trailingIcon: 'delete'
    });
    this.search(value);
  }
}

const StyledTextField = styled(TextField)(props => `
  .mdc-text-field__icon {
    cursor: pointer;
    pointer-events: visible;
    visibility: visible;
  }
`);

const mapStateToProps = (state) => {
  const { themes, enabledTheme } = state;

  return {
    theme: themes[enabledTheme]
  };
};

export default connect(mapStateToProps)(SearchBox);
