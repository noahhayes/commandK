import { IAction, actions } from "./data/actions";

// Hijack the keyboard and add some hot keys
document.onkeyup = (e: KeyboardEvent): void => {
  if (shouldUseHotKeys()) {
    switch (e.keyCode) {
      case 37:
        return clickPrev();
      case 39:
        return clickNext();
      case 70:
        return clickFind();
    }
  }
};

// Triage commands that have been sent from the popup
chrome.runtime.onMessage.addListener((actionID: string): void => {
  const action: IAction = actions.find(action => action.actionID === actionID);

  switch (actionID) {
    case "prev":
      return clickPrev();
    case "next":
      return clickNext();
    case "find":
      return clickFind();
    default:
      return simulateKeyPress(action.keyCode);
  }
});

// Custom action to click previous period
const clickPrev = (): void => {
  try {
    const prevButton: HTMLElement = document.querySelector(
      '[jsname="VfNHU"]'
    ) as HTMLElement;

    prevButton.click();
  } catch (error) {
    console.log("error");
  }
};

// Custom action to click next period
const clickNext = (): void => {
  try {
    const nextButton: HTMLElement = document.querySelector(
      '[jsname="OCpkoe"]'
    ) as HTMLElement;

    nextButton.click();
  } catch (error) {
    console.log("error");
  }
};

// Custom action to open search box
const clickFind = (): void => {
  try {
    const searchButton: HTMLElement = document.querySelector(
      '[jsname="KzBUhd"]'
    ) as HTMLElement;

    searchButton.click();
  } catch (error) {
    console.log("error");
  }
};

// Simulate a keypress by injecting a scirpt into the document
const simulateKeyPress = (keyCode: number): void => {
  const script: string = `
    var keyboardEvent = new KeyboardEvent('keypress', {bubbles:true});
    Object.defineProperty(keyboardEvent, 'charCode', {get:function(){return this.charCodeVal;}});
    keyboardEvent.charCodeVal = ${keyCode.toString()}
    document.body.dispatchEvent(keyboardEvent);
  `;
  const injectedScript: HTMLElement = document.createElement("script");

  document.documentElement.appendChild(injectedScript);
  injectedScript.innerHTML = script;
  document.documentElement.removeChild(injectedScript);
};

// Determine whether page should accept hotkey presses
const shouldUseHotKeys = (): boolean => {
  const searchBox: HTMLElement = document.getElementById(
    "aso_search_form_anchor"
  ) as HTMLElement;
  const contactInput: HTMLElement = document.querySelector(
    ".d1dlne.WvJxMd"
  ) as HTMLElement;
  const eventCard: HTMLElement = document.querySelector(
    ".RDlrG.Inn9w.iWO5td"
  ) as HTMLElement;
  const address: string = window.location.href;

  if (
    // the search box is open
    searchBox.className === "gb_8e gb_Ff gb_9e" ||
    // the event card is open
    document.body.contains(eventCard) ||
    // the contact input is open
    contactInput.getAttribute("data-expanded") === "true" ||
    // on the edit page
    address.indexOf("eventedit") >= 0 ||
    // on the settings page
    address.indexOf("settings") >= 0
  ) {
    return false;
  }

  return true;
};
