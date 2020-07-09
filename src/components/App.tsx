import React, { Component } from "react";
import Menu from "./Menu";
import { IAction, actions } from "../data/actions";
import {
  shouldUseHotKeys,
  performAction
} from "../lib";
import "../style.scss";

interface IState {
  isMenuVisible: boolean;
  isCommandPressed: boolean;
}

class App extends Component<{}, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false,
      isCommandPressed: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this._onKeyDown);
    document.addEventListener("keyup", this._onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("keyup", this._onKeyUp);
  }

  render() {
    const { isMenuVisible }: IState = this.state;

    return (
      <div>
        <button onClick={this._toggleMenu} className="button">
          ⌘K
        </button>
        {isMenuVisible && (
          <div>
            <div className="outerContainer" onClick={this._toggleMenu} />
            <Menu
              toggleMenu={this._toggleMenu}
            />
          </div>
        )}
      </div>
    );
  }

  _onKeyDown = (e: KeyboardEvent): void => {
    if (shouldUseHotKeys()) {
      if (!this.state.isMenuVisible) {
        switch (e.keyCode) {
          case 37:
            return performAction("prev"); //Left
          case 39:
            return performAction("next"); //Right
          case 70:
            return performAction("find"); //F
        }
      }

      switch (e.keyCode) {
        case 75:
          return this.state.isCommandPressed && this._toggleMenu(); //K
        case 91:
        case 93:
          this.setState({ isCommandPressed: true }); //CMD
      }
    }
  };

  _onKeyUp = (e: KeyboardEvent): void => {
    if (shouldUseHotKeys() && (e.keyCode === 91 || e.keyCode === 93)) {
      this.setState({ isCommandPressed: false });
    }
  };

  _toggleMenu = (): void => {
    const { isMenuVisible }: IState = this.state;
//alert('here')
    this.setState({
      isMenuVisible: !isMenuVisible
    });
  };
}

export default App;
