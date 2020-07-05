interface IAction {
  actionID: string;
  key: string;
  char: string;
  title: string;
}

const actions: IAction[] = [
  {
    actionID: "today",
    title: "Go to today",
    char: "T",
    key: "t"
  },
  {
    actionID: "prev",
    title: "Go to previous period",
    char: "\u2190",
    key: "left"
  },
  {
    actionID: "next",
    title: "Go to next period",
    char: "\u2192",
    key: "right"
  },
  {
    actionID: "find",
    title: "Find an event",
    char: "F",
    key: "f"
  }
];

export {
  IAction,
  actions
};
