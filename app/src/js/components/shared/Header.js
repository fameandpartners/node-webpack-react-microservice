import React, { Component } from 'react';
import autoBind from 'react-autobind';
import '../../../css/components/Header.scss';

// Components
import Hamburger from './Hamburger';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    autoBind(this);
  }

  handleClick() {
    console.log('clicking', this.state.isOpen);
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <header className="Header width--full">
        <nav>
          <Hamburger isOpen={isOpen} handleClick={this.handleClick} />
          <ul>
            <li><a href="#link1">Link 1</a></li>
            <li><a href="#link2">Link 2</a></li>
            <li><a href="#link3">Link 3</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
