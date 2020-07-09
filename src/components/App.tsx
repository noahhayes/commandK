import React, { Component } from "react";
import Menu from "./Menu";
import { shouldUseHotKeys, shouldUseCommandKey, shouldDisplayButton, performAction } from "../lib";
import "../style.scss";
import { BUTTON_TITLE } from "../config";

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
        {shouldDisplayButton() &&
          <button onClick={this._toggleMenu} className="button">
            {BUTTON_TITLE}
          </button>
        }
        {isMenuVisible && (
          <div>
            <div className="outerContainer" onClick={this._toggleMenu} />
            <Menu toggleMenu={this._toggleMenu} />
          </div>
        )}
      </div>
    );
  }

  _onKeyDown = (e: KeyboardEvent): void => {
    const { isMenuVisible, isCommandPressed }: IState = this.state;

    if (shouldUseHotKeys() && !isMenuVisible) {
      switch (e.keyCode) {
        case 37:
          return performAction("prev");
        case 39:
          return performAction("next");
      }
    }

    if (shouldUseCommandKey()) {
      switch (e.keyCode) {
        case 91:
        case 93:
          return this.setState({ isCommandPressed: true });
        case 75:
          return isCommandPressed && this._toggleMenu();
      }
    }
  };

  _onKeyUp = (e: KeyboardEvent): void => {
    const { isMenuVisible }: IState = this.state;

    if (shouldUseHotKeys() && !isMenuVisible && e.keyCode === 70) {
      return performAction("find");
    }

    if (shouldUseCommandKey() && (e.keyCode === 91 || e.keyCode === 93)) {
      return this.setState({ isCommandPressed: false });
    }
  };

  _toggleMenu = (): void => {
    this.setState(({ isMenuVisible }) => ({
      isMenuVisible: !isMenuVisible
    }));
  };
}

export default App;
