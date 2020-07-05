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
        case "today":
            return clickToday();
        case "prev":
            return clickPrev();
        case "next":
            return clickNext();
        case "find":
            return clickFind();
    }
});
var clickToday = function () {
    try {
        var todayButton = document.querySelector('[jsname="P6mm8"]');
        todayButton.click();
    }
    catch (error) {
        console.log("error");
    }
};
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
// This tells us whether we should accept hotkey presses
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSw0Q0FBNEM7QUFDNUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFDLENBQWdCO0lBQ2xDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUN0QixRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDakIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7WUFDckIsS0FBSyxFQUFFO2dCQUNMLE9BQU8sU0FBUyxFQUFFLENBQUM7U0FDdEI7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVGLHFEQUFxRDtBQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQ2xDLFVBQUMsUUFBZ0I7SUFDZixRQUFRLFFBQVEsRUFBRTtRQUNoQixLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLEtBQUssTUFBTTtZQUNULE9BQU8sU0FBUyxFQUFFLENBQUM7UUFDckIsS0FBSyxNQUFNO1lBQ1QsT0FBTyxTQUFTLEVBQUUsQ0FBQztRQUNyQixLQUFLLE1BQU07WUFDVCxPQUFPLFNBQVMsRUFBRSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUNGLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRztJQUNqQixJQUFJO1FBQ0YsSUFBTSxXQUFXLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ3JELGtCQUFrQixDQUNKLENBQUM7UUFFakIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBTSxTQUFTLEdBQUc7SUFDaEIsSUFBSTtRQUNGLElBQU0sVUFBVSxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUNwRCxrQkFBa0IsQ0FDSixDQUFDO1FBRWpCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNwQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQztBQUVGLElBQU0sU0FBUyxHQUFHO0lBQ2hCLElBQUk7UUFDRixJQUFNLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FDcEQsbUJBQW1CLENBQ0wsQ0FBQztRQUVqQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDcEI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDLENBQUM7QUFFRixJQUFNLFNBQVMsR0FBRztJQUNoQixJQUFJO1FBQ0YsSUFBTSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ3RELG1CQUFtQixDQUNMLENBQUM7UUFFakIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3RCO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsd0RBQXdEO0FBQ3hELElBQU0sZ0JBQWdCLEdBQUc7SUFDdkIsSUFBTSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQ3BELHdCQUF3QixDQUNWLENBQUM7SUFDakIsSUFBTSxZQUFZLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ3RELGdCQUFnQixDQUNGLENBQUM7SUFDakIsSUFBTSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQ25ELHFCQUFxQixDQUNQLENBQUM7SUFDakIsSUFBTSxPQUFPLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFFN0M7SUFDRSx5QkFBeUI7SUFDekIsU0FBUyxDQUFDLFNBQVMsS0FBSyxtQkFBbUI7UUFDM0MseUJBQXlCO1FBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUNqQyw0QkFBNEI7UUFDNUIsWUFBWSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxNQUFNO1FBQ3JELG1CQUFtQjtRQUNuQixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDakMsdUJBQXVCO1FBQ3ZCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUNoQztRQUNBLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udGVudC50c3hcIik7XG4iLCIvLyBIaWphY2sgdGhlIGtleWJvYXJkIGFuZCBhZGQgc29tZSBob3Qga2V5c1xuZG9jdW1lbnQub25rZXl1cCA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gIGlmIChzaG91bGRVc2VIb3RLZXlzKCkpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgcmV0dXJuIGNsaWNrUHJldigpO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgcmV0dXJuIGNsaWNrTmV4dCgpO1xuICAgICAgY2FzZSA3MDpcbiAgICAgICAgcmV0dXJuIGNsaWNrRmluZCgpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gVHJpYWdlIGNvbW1hbmRzIHRoYXQgaGF2ZSBiZWVuIHNlbnQgZnJvbSB0aGUgcG9wdXBcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcbiAgKGFjdGlvbklEOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbklEKSB7XG4gICAgICBjYXNlIFwidG9kYXlcIjpcbiAgICAgICAgcmV0dXJuIGNsaWNrVG9kYXkoKTtcbiAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgIHJldHVybiBjbGlja1ByZXYoKTtcbiAgICAgIGNhc2UgXCJuZXh0XCI6XG4gICAgICAgIHJldHVybiBjbGlja05leHQoKTtcbiAgICAgIGNhc2UgXCJmaW5kXCI6XG4gICAgICAgIHJldHVybiBjbGlja0ZpbmQoKTtcbiAgICB9XG4gIH1cbik7XG5cbmNvbnN0IGNsaWNrVG9kYXkgPSAoKTogdm9pZCA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9kYXlCdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdbanNuYW1lPVwiUDZtbThcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRvZGF5QnV0dG9uLmNsaWNrKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxufTtcblxuY29uc3QgY2xpY2tQcmV2ID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHByZXZCdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdbanNuYW1lPVwiVmZOSFVcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHByZXZCdXR0b24uY2xpY2soKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBhbGVydChlcnJvcik7XG4gICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxufTtcblxuY29uc3QgY2xpY2tOZXh0ID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IG5leHRCdXR0b246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICdbanNuYW1lPVwiT0Nwa29lXCJdJ1xuICAgICkgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICBuZXh0QnV0dG9uLmNsaWNrKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcbiAgfVxufTtcblxuY29uc3QgY2xpY2tGaW5kID0gKCk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHNlYXJjaEJ1dHRvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJ1tqc25hbWU9XCJLekJVaGRcIl0nXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHNlYXJjaEJ1dHRvbi5jbGljaygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XG4gIH1cbn07XG5cbi8vIFRoaXMgdGVsbHMgdXMgd2hldGhlciB3ZSBzaG91bGQgYWNjZXB0IGhvdGtleSBwcmVzc2VzXG5jb25zdCBzaG91bGRVc2VIb3RLZXlzID0gKCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBzZWFyY2hCb3g6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJhc29fc2VhcmNoX2Zvcm1fYW5jaG9yXCJcbiAgKSBhcyBIVE1MRWxlbWVudDtcbiAgY29uc3QgY29udGFjdElucHV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuZDFkbG5lLld2SnhNZFwiXG4gICkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGV2ZW50Q2FyZDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLlJEbHJHLklubjl3LmlXTzV0ZFwiXG4gICkgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGFkZHJlc3M6IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gIGlmIChcbiAgICAvLyB0aGUgc2VhcmNoIGJveCBpcyBvcGVuXG4gICAgc2VhcmNoQm94LmNsYXNzTmFtZSA9PT0gXCJnYl84ZSBnYl9GZiBnYl85ZVwiIHx8XG4gICAgLy8gdGhlIGV2ZW50IGNhcmQgaXMgb3BlblxuICAgIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZXZlbnRDYXJkKSB8fFxuICAgIC8vIHRoZSBjb250YWN0IGlucHV0IGlzIG9wZW5cbiAgICBjb250YWN0SW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1leHBhbmRlZFwiKSA9PT0gXCJ0cnVlXCIgfHxcbiAgICAvLyBvbiB0aGUgZWRpdCBwYWdlXG4gICAgYWRkcmVzcy5pbmRleE9mKFwiZXZlbnRlZGl0XCIpID49IDAgfHxcbiAgICAvLyBvbiB0aGUgc2V0dGluZ3MgcGFnZVxuICAgIGFkZHJlc3MuaW5kZXhPZihcInNldHRpbmdzXCIpID49IDBcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==