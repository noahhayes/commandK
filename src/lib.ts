import { IAction, actions } from "./data/actions";

export const performAction = (actionID: string): void => {
    const action: IAction = actions.find(
      action => action.actionID === actionID
    );

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
  };

export const shouldUseHotKeys = (): boolean => {
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
    (searchBox && searchBox.className === "gb_9e gb_Hf gb_af") ||
    document.body.contains(eventCard) ||
    contactInput.getAttribute("data-expanded") === "true" ||
    address.indexOf("eventedit") >= 0 ||
    address.indexOf("settings") >= 0
  ) {
    return false;
  }

  return true;
}

export const shouldUseCommandKey = (): boolean => {
  const contactInput: HTMLElement = document.querySelector(
    ".d1dlne.WvJxMd"
  ) as HTMLElement;
  const eventCard: HTMLElement = document.querySelector(
    ".RDlrG.Inn9w.iWO5td"
  ) as HTMLElement;
  const address: string = window.location.href;

  if (
    document.body.contains(eventCard) ||
    contactInput.getAttribute("data-expanded") === "true" ||
    address.indexOf("eventedit") >= 0 ||
    address.indexOf("settings") >= 0
  ) {
    return false;
  }

  return true;
}

export const shouldDisplayButton = (): boolean => {
  const address: string = window.location.href;

  if (
    address.indexOf("eventedit") >= 0 ||
    address.indexOf("settings") >= 0
  ) {
    return false;
  }

  return true;
}

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
