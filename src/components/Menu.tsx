import React, { Component } from "react";
import Item from "./Item";
import { IAction, actions } from "../data/actions";
import { performAction } from "../lib";
import "../style.scss";

interface IProps {
  toggleMenu: Function;
}

interface IState {
  highlightedItemIndex: number;
  scrollPosition: number;
  searchValue: string;
  searchResults: IAction[];
}

class Menu extends Component<IProps, IState> {
  private textInput: HTMLInputElement;
  private resultsDiv: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      highlightedItemIndex: 0,
      scrollPosition: 0,
      searchValue: "",
      searchResults: actions
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this._onKeyDown);
    this.textInput.focus();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._onKeyDown);
  }

  render() {
    const {
      highlightedItemIndex,
      searchResults,
      searchValue
    }: IState = this.state;

    return (
      <div className="innerContainer">
        <input
          className="input"
          placeholder="Type a command..."
          value={searchValue}
          onChange={this._handleInputOnChange}
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

  _onKeyDown = (e: KeyboardEvent): void => {
    switch (e.keyCode) {
      case 40:
        return this._handleArrowPress('down');
      case 38:
        return this._handleArrowPress('up');
      case 13:
        return this._handleItemPress(this.state.highlightedItemIndex);
    }
  };

  _handleInputOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const highlightedItemIndex: number = 0;
    const searchValue: string = event.currentTarget.value;
    const searchResults: IAction[] = this._filterSearchResults(searchValue);

    this.setState({ highlightedItemIndex, searchValue, searchResults });
  };

  _handleArrowPress = (direction: string): void => {
    let highlightedItemIndex: number = this.state.highlightedItemIndex;

    if (direction === 'up' && highlightedItemIndex > 0) {
      highlightedItemIndex--;

      this._adjustScrollPosition();
    }

    if (direction === 'down' && highlightedItemIndex < this.state.searchResults.length - 1) {
      highlightedItemIndex++;

      this._adjustScrollPosition();
    }

    this.setState({ highlightedItemIndex });
  };

  _handleItemPress = (index: number): void => {
    const { actionID }: IAction = this.state.searchResults[index];

    this.props.toggleMenu();

    performAction(actionID);
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
    const { highlightedItemIndex, searchResults }: IState = this.state;

    const scrollHeight: number = this.resultsDiv.scrollHeight;
    const scrollTop: number = this.resultsDiv.scrollTop;
    const itemHeight: number = scrollHeight / searchResults.length;

    const newScrollTop: number = itemHeight * (highlightedItemIndex - 2);

    if (
      (highlightedItemIndex < 3 && scrollTop > 0) ||
      highlightedItemIndex >= 3
    ) {
      this.resultsDiv.scrollTop = newScrollTop;
    }
  };
}

export default Menu;
