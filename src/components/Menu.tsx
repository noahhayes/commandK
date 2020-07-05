import React, { Component } from "react";
import Item from "./Item";
import { IAction, actions } from "../data/actions";
import "../style.scss";

interface IProps {
  tabID: number;
}

interface IState {
  highlightedIndex: number;
  searchValue: string;
  searchResults: IAction[];
}

class Menu extends Component<IProps, IState> {
  private textInput: HTMLInputElement;

  constructor(props) {
    super(props);

    this.state = {
      highlightedIndex: 0,
      searchValue: "",
      searchResults: actions
    };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const { highlightedIndex, searchResults, searchValue }: IState = this.state;
    const { tabID }: IProps = this.props;

    return (
      <div className="container">
        <input
          className="input"
          placeholder="Type a command"
          value={searchValue}
          onChange={this._handleOnChange}
          onKeyDown={this._handleKeyDown}
          ref={ref => (this.textInput = ref)}
        />
        {searchResults.map((action, index) => (
          <Item
            key={action.actionID}
            action={action}
            isHighlighted={highlightedIndex === index}
            onClick={() => this._handleItemPress(index)}
            searchValue={searchValue}
          />
        ))}
        {searchResults.length === 0 &&
          <div className="empty">No Results</div>
        }
      </div>
    );
  }

  _handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const highlightedIndex: number = 0;
    const searchValue: string = event.currentTarget.value;
    const searchResults: IAction[] = this._filterSearchResults(searchValue);

    this.setState({ highlightedIndex, searchValue, searchResults });
  };

  _handleKeyDown = (event: React.KeyboardEvent<object>): void => {
    const keyCode: number = event.keyCode;

    switch (keyCode) {
      case 40:
        event.preventDefault();
        return this._handleArrowDownPress();
      case 38:
        event.preventDefault();
        return this._handleArrowUpPress();
      case 13:
        event.preventDefault();
        return this._handleItemPress(this.state.highlightedIndex);
    }
  };

  _handleArrowUpPress = (): void => {
    let highlightedIndex: number = this.state.highlightedIndex;

    if (highlightedIndex > 0) {
      highlightedIndex--;
    }

    this.setState({ highlightedIndex });
  };

  _handleArrowDownPress = (): void => {
    let highlightedIndex: number = this.state.highlightedIndex;

    if (highlightedIndex < this.state.searchResults.length - 1) {
      highlightedIndex++;
    }

    this.setState({ highlightedIndex });
  };

  _handleItemPress = (index: number): void => {
    const { tabID }: IProps = this.props;
    const { actionID }: IAction = this.state.searchResults[index];

    chrome.tabs.sendMessage(tabID, actionID);

    return window.close();
  };

  _filterSearchResults = (searchValue: string): IAction[] => {
    let searchResults: IAction[];

    if (searchValue.length === 0) {
      searchResults = actions;
    } else {
      searchResults = actions.filter(
        ({ title }) =>
          title.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
    }

    return searchResults;
  };
}

export default Menu;
