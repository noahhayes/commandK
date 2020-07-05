/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content.tsx":
/*!*************************!*\
  !*** ./src/content.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __webpack_require__(/*! ./data/actions */ "./src/data/actions.ts");
// Hijack the keyboard and add some hot keys
document.onkeyup = function (e) {
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
chrome.runtime.onMessage.addListener(function (actionID) {
    var action = actions_1.actions.find(function (action) { return action.actionID === actionID; });
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
var clickPrev = function () {
    try {
        var prevButton = document.querySelector('[jsname="VfNHU"]');
        prevButton.click();
    }
    catch (error) {
        console.log("error");
    }
};
// Custom action to click next period
var clickNext = function () {
    try {
        var nextButton = document.querySelector('[jsname="OCpkoe"]');
        nextButton.click();
    }
    catch (error) {
        console.log("error");
    }
};
// Custom action to open search box
var clickFind = function () {
    try {
        var searchButton = document.querySelector('[jsname="KzBUhd"]');
        searchButton.click();
    }
    catch (error) {
        console.log("error");
    }
};
// Simulate a keypress by injecting a scirpt into the document
var simulateKeyPress = function (keyCode) {
    var script = "\n    var keyboardEvent = new KeyboardEvent('keypress', {bubbles:true});\n    Object.defineProperty(keyboardEvent, 'charCode', {get:function(){return this.charCodeVal;}});\n    keyboardEvent.charCodeVal = " + keyCode.toString() + "\n    document.body.dispatchEvent(keyboardEvent);\n  ";
    var injectedScript = document.createElement("script");
    document.documentElement.appendChild(injectedScript);
    injectedScript.innerHTML = script;
    document.documentElement.removeChild(injectedScript);
};
// Determine whether page should accept hotkey presses
var shouldUseHotKeys = function () {
    var searchBox = document.getElementById("aso_search_form_anchor");
    var contactInput = document.querySelector(".d1dlne.WvJxMd");
    var eventCard = document.querySelector(".RDlrG.Inn9w.iWO5td");
    var address = window.location.href;
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
        address.indexOf("settings") >= 0) {
        return false;
    }
    return true;
};


/***/ }),

/***/ "./src/data/actions.ts":
/*!*****************************!*\
  !*** ./src/data/actions.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
var actions = [
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
exports.actions = actions;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQudHN4Iiwid2VicGFjazovLy8uL3NyYy9kYXRhL2FjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG1GQUFrRDtBQUVsRCw0Q0FBNEM7QUFDNUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQWdCO0lBQ2xDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUN0QixRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDakIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7U0FDdEI7S0FDRjtBQUNI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QUFRLEVBQUUsTUFBTTtRQUNoQixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLElBQUksRUFBRSxHQUFHO1FBQ1QsT0FBTyxFQUFFLEVBQUU7S0FDWjtDQUNGLENBQUM7QUFJQSwwQkFBTyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udGVudC50c3hcIik7XG4iLCJpbXBvcnQgeyBJQWN0aW9uLCBhY3Rpb25zIH0gZnJvbSBcIi4vZGF0YS9hY3Rpb25zXCI7XG5cbi8vIEhpamFjayB0aGUga2V5Ym9hcmQgYW5kIGFkZCBzb21lIGhvdCBrZXlzXG5kb2N1bWVudC5vbmtleXVwID0gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcbiAgaWYgKHNob3VsZFVzZUhvdEtleXMoKSkge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICByZXR1cm4gY2xpY2tQcmV2KCk7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICByZXR1cm4gY2xpY2tOZXh0KCk7XG4gICAgICBjYXNlIDcwOlxuICAgICAgICByZXR1cm4gY2xpY2tGaW5kKCk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBUcmlhZ2UgY29tbWFuZHMgdGhhdCBoYXZlIGJlZW4gc2VudCBmcm9tIHRoZSBwb3B1cFxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChhY3Rpb25JRDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IGFjdGlvbjogSUFjdGlvbiA9IGFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmFjdGlvbklEID09PSBhY3Rpb25JRCk7XG5cbiAgc3dpdGNoIChhY3Rpb25JRCkge1xuICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICByZXR1cm4gY2xpY2tQcmV2KCk7XG4gICAgY2FzZSBcIm5leHRcIjpcbiAgICAgIHJldHVybiBjbGlja05leHQoKTtcbiAgICBjYXNlIFwiZmluZFwiOlxuICAgICAgcmV0dXJuIGNsaWNrRmluZCgpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc2ltdWxhdGVLZXlQcmVzcyhhY3Rpb24ua2V5Q29kZSk7XG4gIH1cbn0pO1xuXG4vLyBDdXN0b20gYWN0aW9uIHRvIGNsaWNrIHByZXZpb3VzIHBlcmlvZFxuY29uc3QgY2xpY2tQcmV2ID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHByZXZCdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdbanNuYW1lPVwiVmZOSFVcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHByZXZCdXR0b24uY2xpY2soKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICB9XG59O1xuXG4vLyBDdXN0b20gYWN0aW9uIHRvIGNsaWNrIG5leHQgcGVyaW9kXG5jb25zdCBjbGlja05leHQgPSAoKTogdm9pZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbmV4dEJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tqc25hbWU9XCJPQ3Brb2VcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIG5leHRCdXR0b24uY2xpY2soKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICB9XG59O1xuXG4vLyBDdXN0b20gYWN0aW9uIHRvIG9wZW4gc2VhcmNoIGJveFxuY29uc3QgY2xpY2tGaW5kID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHNlYXJjaEJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tqc25hbWU9XCJLekJVaGRcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHNlYXJjaEJ1dHRvbi5jbGljaygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gIH1cbn07XG5cbi8vIFNpbXVsYXRlIGEga2V5cHJlc3MgYnkgaW5qZWN0aW5nIGEgc2NpcnB0IGludG8gdGhlIGRvY3VtZW50XG5jb25zdCBzaW11bGF0ZUtleVByZXNzID0gKGtleUNvZGU6IG51bWJlcik6IHZvaWQgPT4ge1xuICBjb25zdCBzY3JpcHQ6IHN0cmluZyA9IGBcbiAgICB2YXIga2V5Ym9hcmRFdmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KCdrZXlwcmVzcycsIHtidWJibGVzOnRydWV9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5Ym9hcmRFdmVudCwgJ2NoYXJDb2RlJywge2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoYXJDb2RlVmFsO319KTtcbiAgICBrZXlib2FyZEV2ZW50LmNoYXJDb2RlVmFsID0gJHtrZXlDb2RlLnRvU3RyaW5nKCl9XG4gICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGtleWJvYXJkRXZlbnQpO1xuICBgO1xuICBjb25zdCBpbmplY3RlZFNjcmlwdDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChpbmplY3RlZFNjcmlwdCk7XG4gIGluamVjdGVkU2NyaXB0LmlubmVySFRNTCA9IHNjcmlwdDtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGluamVjdGVkU2NyaXB0KTtcbn07XG5cbi8vIERldGVybWluZSB3aGV0aGVyIHBhZ2Ugc2hvdWxkIGFjY2VwdCBob3RrZXkgcHJlc3Nlc1xuY29uc3Qgc2hvdWxkVXNlSG90S2V5cyA9ICgpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgc2VhcmNoQm94OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiYXNvX3NlYXJjaF9mb3JtX2FuY2hvclwiXG4gICkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGNvbnRhY3RJbnB1dDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLmQxZGxuZS5Xdkp4TWRcIlxuICApIGFzIEhUTUxFbGVtZW50O1xuICBjb25zdCBldmVudENhcmQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIi5SRGxyRy5Jbm45dy5pV081dGRcIlxuICApIGFzIEhUTUxFbGVtZW50O1xuICBjb25zdCBhZGRyZXNzOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICBpZiAoXG4gICAgLy8gdGhlIHNlYXJjaCBib3ggaXMgb3BlblxuICAgIHNlYXJjaEJveC5jbGFzc05hbWUgPT09IFwiZ2JfOGUgZ2JfRmYgZ2JfOWVcIiB8fFxuICAgIC8vIHRoZSBldmVudCBjYXJkIGlzIG9wZW5cbiAgICBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGV2ZW50Q2FyZCkgfHxcbiAgICAvLyB0aGUgY29udGFjdCBpbnB1dCBpcyBvcGVuXG4gICAgY29udGFjdElucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtZXhwYW5kZWRcIikgPT09IFwidHJ1ZVwiIHx8XG4gICAgLy8gb24gdGhlIGVkaXQgcGFnZVxuICAgIGFkZHJlc3MuaW5kZXhPZihcImV2ZW50ZWRpdFwiKSA+PSAwIHx8XG4gICAgLy8gb24gdGhlIHNldHRpbmdzIHBhZ2VcbiAgICBhZGRyZXNzLmluZGV4T2YoXCJzZXR0aW5nc1wiKSA+PSAwXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbiIsImludGVyZmFjZSBJQWN0aW9uIHtcbiAgYWN0aW9uSUQ6IHN0cmluZztcbiAgY2hhcjogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBrZXlDb2RlOiBudW1iZXI7XG59XG5cbmNvbnN0IGFjdGlvbnM6IElBY3Rpb25bXSA9IFtcbiAge1xuICAgIGFjdGlvbklEOiBcInRvZGF5XCIsXG4gICAgdGl0bGU6IFwiR28gdG8gdG9kYXlcIixcbiAgICBjaGFyOiBcIlRcIixcbiAgICBrZXlDb2RlOiA4NFxuICB9LFxuICB7XG4gICAgYWN0aW9uSUQ6IFwicHJldlwiLFxuICAgIHRpdGxlOiBcIkdvIHRvIHByZXZpb3VzIHBlcmlvZFwiLFxuICAgIGNoYXI6IFwiXFx1MjE5MFwiLFxuICAgIGtleUNvZGU6IDM3XG4gIH0sXG4gIHtcbiAgICBhY3Rpb25JRDogXCJuZXh0XCIsXG4gICAgdGl0bGU6IFwiR28gdG8gbmV4dCBwZXJpb2RcIixcbiAgICBjaGFyOiBcIlxcdTIxOTJcIixcbiAgICBrZXlDb2RlOiAzOVxuICB9LFxuICB7XG4gICAgYWN0aW9uSUQ6IFwiZmluZFwiLFxuICAgIHRpdGxlOiBcIkZpbmQgYW4gZXZlbnRcIixcbiAgICBjaGFyOiBcIkZcIixcbiAgICBrZXlDb2RlOiA3MFxuICB9LFxuICB7XG4gICAgYWN0aW9uSUQ6IFwiZGF5XCIsXG4gICAgdGl0bGU6IFwiU3dpdGNoIHRvIERheSB2aWV3XCIsXG4gICAgY2hhcjogXCJEXCIsXG4gICAga2V5Q29kZTogNjhcbiAgfSxcbiAge1xuICAgIGFjdGlvbklEOiBcIndlZWtcIixcbiAgICB0aXRsZTogXCJTd2l0Y2ggdG8gV2VlayB2aWV3XCIsXG4gICAgY2hhcjogXCJXXCIsXG4gICAga2V5Q29kZTogODdcbiAgfSxcbiAge1xuICAgIGFjdGlvbklEOiBcIm1vbnRoXCIsXG4gICAgdGl0bGU6IFwiU3dpdGNoIHRvIE1vbnRoIHZpZXdcIixcbiAgICBjaGFyOiBcIk1cIixcbiAgICBrZXlDb2RlOiA3N1xuICB9LFxuICB7XG4gICAgYWN0aW9uSUQ6IFwieWVhclwiLFxuICAgIHRpdGxlOiBcIlN3aXRjaCB0byBZZWFyIHZpZXdcIixcbiAgICBjaGFyOiBcIllcIixcbiAgICBrZXlDb2RlOiA4OVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBJQWN0aW9uLFxuICBhY3Rpb25zXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==