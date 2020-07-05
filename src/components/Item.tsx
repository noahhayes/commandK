import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import { IAction } from "../data/actions.ts";
import "../style.scss";

interface IProps {
  action: IAction;
  isHighlighted: boolean;
  onClick: Function;
  searchValue: string;
}

class Item extends Component<IProps> {
  render() {
    const { isHighlighted, searchValue, onClick }: IProps = this.props;
    const { key, char, title }: IAction = this.props.action;

    return (
      <div
        onClick={() => onClick()}
        className={`item ${isHighlighted && "active"}`}
      >
        <div className="title">
          <Highlighter
            highlightClassName="highlight"
            searchWords={[searchValue]}
            autoEscape={true}
            textToHighlight={title}
          />
        </div>
        <div className="icon">{char}</div>
      </div>
    );
  }
}

export default Item;
