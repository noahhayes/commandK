import React, { Component } from "react";
import Item from "./Item";
import { IAction, actions } from "../data/actions";
import "../style.scss";

interface IProps {
  tabID: number;
}

interface IState {
  highlightedItemIndex: number;
  searchValue: string;
  searchResults: IAction[];
  scrollPosition: number;
}

class Menu extends Component<IProps, IState> {
  private textInput: HTMLInputElement;
  private resultsDiv: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      highlightedItemIndex: 0,
      searchValue: "",
      searchResults: actions,
      scrollPosition: 0
    };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const { highlightedItemIndex, searchResults, searchValue }: IState = this.state;
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
        {searchResults.length > 0 ? (
          <div className="results" ref={ref => (this.resultsDiv = ref)}>
            {searchResults.map((action, index) => (
              <Item
                key={action.actionID}
                action={action}
                isHighlighted={highlightedItemIndex === index}
                onClick={() => this._handleItemPress(index)}
                searchValue={searchValue}
              />
            ))}
          </div>
        ) : (
          <div className="empty">No Results</div>
        )}
      </div>
    );
  }

  _handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const highlightedItemIndex: number = 0;
    const searchValue: string = event.currentTarget.value;
    const searchResults: IAction[] = this._filterSearchResults(searchValue);

    this.setState({ highlightedItemIndex, searchValue, searchResults });
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
        return this._handleItemPress(this.state.highlightedItemIndex);
    }
  };

  _handleArrowUpPress = (): void => {
    let highlightedItemIndex: number = this.state.highlightedItemIndex;

    if (highlightedItemIndex > 0) {
      highlightedItemIndex--;

      this._adjustScrollPosition();
    }

    this.setState({ highlightedItemIndex });
  };

  _handleArrowDownPress = (): void => {
    let highlightedItemIndex: number = this.state.highlightedItemIndex;

    if (highlightedItemIndex < this.state.searchResults.length - 1) {
      highlightedItemIndex++;

      this._adjustScrollPosition();
    }

    this.setState({ highlightedItemIndex });
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

  _adjustScrollPosition = (): void => {
    const scrollHeight: number = this.resultsDiv.scrollHeight;
    const itemHeight: number = scrollHeight / this.state.searchResults.length;
    const scrollTop: number = itemHeight * (this.state.highlightedItemIndex - 1);

    this.resultsDiv.scrollTop = scrollTop;
  }
}

export default Menu;
