interface IAction {
  actionID: string;
  char: string;
  title: string;
  keyCode: number;
}

const actions: IAction[] = [
  {
    actionID: "today",
    title: "Go to today",
    char: "T",
    keyCode: 84
  },
  {
    actionID: "prev",
    title: "Go to previous period",
    char: "\u2190",
    keyCode: 37
  },
  {
    actionID: "next",
    title: "Go to next period",
    char: "\u2192",
    keyCode: 39
  },
  {
    actionID: "find",
    title: "Find an event",
    char: "F",
    keyCode: 70
  },
  {
    actionID: "day",
    title: "Switch to Day view",
    char: "D",
    keyCode: 68
  },
  {
    actionID: "week",
    title: "Switch to Week view",
    char: "W",
    keyCode: 87
  },
  {
    actionID: "month",
    title: "Switch to Month view",
    char: "M",
    keyCode: 77
  },
  {
    actionID: "year",
    title: "Switch to Year view",
    char: "Y",
    keyCode: 89
  }
];

export {
  IAction,
  actions
};
