interface IAction {
  actionID: string;
  char: string;
  title: string;
}

const actions: IAction[] = [
  {
    actionID: "today",
    title: "Go to today",
    char: "T"
  },
  {
    actionID: "prev",
    title: "Go to previous period",
    char: "\u2190"
  },
  {
    actionID: "next",
    title: "Go to next period",
    char: "\u2192"
  },
  {
    actionID: "find",
    title: "Find an event",
    char: "F"
  },
  {
    actionID: "day",
    title: "Switch to Day view",
    char: "D"
  },
  {
    actionID: "week",
    title: "Switch to Week view",
    char: "W"
  },
  {
    actionID: "month",
    title: "Switch to Month view",
    char: "M"
  },
  {
    actionID: "year",
    title: "Switch to Year view",
    char: "Y"
  }
];

export {
  IAction,
  actions
};
