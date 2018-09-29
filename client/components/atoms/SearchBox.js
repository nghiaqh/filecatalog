import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { TextField } from '@rmwc/textfield';
import styled from 'react-emotion';
import { connect } from 'react-redux';

class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      iconVisibility: 'hidden'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.clearText = this.clearText.bind(this)
  }

  render() {
    return (
      <StyledTextField
        fullwidth dense
        placeholder={this.props.placeholder || 'Search'}
        withTrailingIcon='clear'
        onChange={this.handleTextChange}
        iconvisibility={this.state.iconVisibility}
        theme={this.props.theme}
      />
    );
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.textField = this.node.getElementsByTagName('input')[0];
    const icon = this.node.getElementsByClassName('mdc-text-field__icon')[0];
    if (icon) {
      icon.addEventListener('click', this.clearText);
    }
  }

  clearText() {
    this.textField.value = '';
    this.props.onSearch('');
    this.setState({iconVisibility: 'hidden'});
  }

  handleTextChange(e) {
    const value = e.target.value.trim();
    if (value !== '') {
      this.setState({iconVisibility: 'visible'});
    }
    this.props.onSearch(value);
  }
}

const StyledTextField = styled(TextField)(props => `
  &:not(:focus) {
    border-bottom: 1px solid ${props.theme.textPrimaryOnBackground};
  }

  .mdc-text-field__icon {
    cursor: pointer;
    pointer-events: visible;
    visibility: ${props.iconvisibility};
  }
`);

const mapStateToProps = (state) => {
  const { themes, enabledTheme } = state;

  return {
    theme: themes[enabledTheme]
  };
};

export default connect(mapStateToProps)(SearchBox);
