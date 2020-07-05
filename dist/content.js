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
/***/ (function(module, exports) {

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
    switch (actionID) {
        case "prev":
            return clickPrev();
        case "next":
            return clickNext();
        case "find":
            return clickFind();
        case "today":
            return pressKey("84");
        case "day":
            return pressKey("68");
        case "week":
            return pressKey("87");
        case "month":
            return pressKey("77");
        case "year":
            return pressKey("89");
    }
});
var clickPrev = function () {
    try {
        var prevButton = document.querySelector('[jsname="VfNHU"]');
        prevButton.click();
    }
    catch (error) {
        alert(error);
        console.log("error");
    }
};
var clickNext = function () {
    try {
        var nextButton = document.querySelector('[jsname="OCpkoe"]');
        nextButton.click();
    }
    catch (error) {
        console.log("error");
    }
};
var clickFind = function () {
    try {
        var searchButton = document.querySelector('[jsname="KzBUhd"]');
        searchButton.click();
    }
    catch (error) {
        console.log("error");
    }
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
var pressKey = function (keyCode) {
    var injectedScript = document.createElement("script");
    var script = "\n    var keyboardEvent = new KeyboardEvent('keypress', {bubbles:true});\n    Object.defineProperty(keyboardEvent, 'charCode', {get:function(){return this.charCodeVal;}});\n    keyboardEvent.charCodeVal = " + keyCode + ";\n    document.body.dispatchEvent(keyboardEvent);\n  ";
    document.documentElement.appendChild(injectedScript);
    injectedScript.innerHTML = script;
    document.removeChild(injectedScript);
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSw0Q0FBNEM7QUFDNUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQWdCO0lBQ2xDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUN0QixRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDakIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7U0FDdEI7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVGLHFEQUFxRDtBQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNB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QUFRLENBQUMsQ0FBQztJQUNyRSxJQUFNLE1BQU0sR0FBVyxrTkFHUyxPQUFPLDJEQUV0QyxDQUFDO0lBQ0YsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsY0FBYyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7SUFDbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvbnRlbnQudHN4XCIpO1xuIiwiLy8gSGlqYWNrIHRoZSBrZXlib2FyZCBhbmQgYWRkIHNvbWUgaG90IGtleXNcbmRvY3VtZW50Lm9ua2V5dXAgPSAoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICBpZiAoc2hvdWxkVXNlSG90S2V5cygpKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIHJldHVybiBjbGlja1ByZXYoKTtcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIHJldHVybiBjbGlja05leHQoKTtcbiAgICAgIGNhc2UgNzA6XG4gICAgICAgIHJldHVybiBjbGlja0ZpbmQoKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFRyaWFnZSBjb21tYW5kcyB0aGF0IGhhdmUgYmVlbiBzZW50IGZyb20gdGhlIHBvcHVwXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gIChhY3Rpb25JRDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb25JRCkge1xuICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgcmV0dXJuIGNsaWNrUHJldigpO1xuICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgcmV0dXJuIGNsaWNrTmV4dCgpO1xuICAgICAgY2FzZSBcImZpbmRcIjpcbiAgICAgICAgcmV0dXJuIGNsaWNrRmluZCgpO1xuICAgICAgY2FzZSBcInRvZGF5XCI6XG4gICAgICAgIHJldHVybiBwcmVzc0tleShcIjg0XCIpO1xuICAgICAgY2FzZSBcImRheVwiOlxuICAgICAgICByZXR1cm4gcHJlc3NLZXkoXCI2OFwiKTtcbiAgICAgIGNhc2UgXCJ3ZWVrXCI6XG4gICAgICAgIHJldHVybiBwcmVzc0tleShcIjg3XCIpO1xuICAgICAgY2FzZSBcIm1vbnRoXCI6XG4gICAgICAgIHJldHVybiBwcmVzc0tleShcIjc3XCIpO1xuICAgICAgY2FzZSBcInllYXJcIjpcbiAgICAgICAgcmV0dXJuIHByZXNzS2V5KFwiODlcIik7XG4gICAgfVxuICB9XG4pO1xuXG5jb25zdCBjbGlja1ByZXYgPSAoKTogdm9pZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcHJldkJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tqc25hbWU9XCJWZk5IVVwiXSdcbiAgICApIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgcHJldkJ1dHRvbi5jbGljaygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGFsZXJ0KGVycm9yKTtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICB9XG59O1xuXG5jb25zdCBjbGlja05leHQgPSAoKTogdm9pZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgbmV4dEJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tqc25hbWU9XCJPQ3Brb2VcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIG5leHRCdXR0b24uY2xpY2soKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xuICB9XG59O1xuXG5jb25zdCBjbGlja0ZpbmQgPSAoKTogdm9pZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2VhcmNoQnV0dG9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnW2pzbmFtZT1cIkt6QlVoZFwiXSdcbiAgICApIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgc2VhcmNoQnV0dG9uLmNsaWNrKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxufTtcblxuLy8gRGV0ZXJtaW5lIHdoZXRoZXIgcGFnZSBzaG91bGQgYWNjZXB0IGhvdGtleSBwcmVzc2VzXG5jb25zdCBzaG91bGRVc2VIb3RLZXlzID0gKCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBzZWFyY2hCb3g6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJhc29fc2VhcmNoX2Zvcm1fYW5jaG9yXCJcbiAgKSBhcyBIVE1MRWxlbWVudDtcbiAgY29uc3QgY29udGFjdElucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuZDFkbG5lLld2SnhNZFwiXG4gICkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGV2ZW50Q2FyZDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLlJEbHJHLklubjl3LmlXTzV0ZFwiXG4gICkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGFkZHJlc3M6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gIGlmIChcbiAgICAvLyB0aGUgc2VhcmNoIGJveCBpcyBvcGVuXG4gICAgc2VhcmNoQm94LmNsYXNzTmFtZSA9PT0gXCJnYl84ZSBnYl9GZiBnYl85ZVwiIHx8XG4gICAgLy8gdGhlIGV2ZW50IGNhcmQgaXMgb3BlblxuICAgIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZXZlbnRDYXJkKSB8fFxuICAgIC8vIHRoZSBjb250YWN0IGlucHV0IGlzIG9wZW5cbiAgICBjb250YWN0SW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCIgfHxcbiAgICAvLyBvbiB0aGUgZWRpdCBwYWdlXG4gICAgYWRkcmVzcy5pbmRleE9mKFwiZXZlbnRlZGl0XCIpID49IDAgfHxcbiAgICAvLyBvbiB0aGUgc2V0dGluZ3MgcGFnZVxuICAgIGFkZHJlc3MuaW5kZXhPZihcInNldHRpbmdzXCIpID49IDBcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5jb25zdCBwcmVzc0tleSA9IChrZXlDb2RlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3QgaW5qZWN0ZWRTY3JpcHQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgY29uc3Qgc2NyaXB0OiBzdHJpbmcgPSBgXG4gICAgdmFyIGtleWJvYXJkRXZlbnQgPSBuZXcgS2V5Ym9hcmRFdmVudCgna2V5cHJlc3MnLCB7YnViYmxlczp0cnVlfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtleWJvYXJkRXZlbnQsICdjaGFyQ29kZScsIHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jaGFyQ29kZVZhbDt9fSk7XG4gICAga2V5Ym9hcmRFdmVudC5jaGFyQ29kZVZhbCA9ICR7a2V5Q29kZX07XG4gICAgZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGtleWJvYXJkRXZlbnQpO1xuICBgO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5qZWN0ZWRTY3JpcHQpO1xuICBpbmplY3RlZFNjcmlwdC5pbm5lckhUTUwgPSBzY3JpcHQ7XG4gIGRvY3VtZW50LnJlbW92ZUNoaWxkKGluamVjdGVkU2NyaXB0KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9