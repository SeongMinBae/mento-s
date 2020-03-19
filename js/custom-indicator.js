/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*exported listController*/
/*jshint unused: vars*/

var listController = (function() {
    var CONTAINER_DATA = {
            "POS_-OUT": {
                "transform": "rotate(180deg)"
            },
            "POS_-5": {
                "transform": "rotate(150deg)"
            },
            "POS_-4": {
                "transform": "rotate(129deg)"
            },
            "POS_-3": {
                "transform": "rotate(104deg)"
            },
            "POS_-2": {
                "transform": "rotate(76deg)"
            },
            "POS_-1": {
                "transform": "rotate(42deg)"
            },
            "POS_0": {
                "transform": "rotate(0deg)"
            },
            "POS_1": {
                "transform": "rotate(-42deg)"
            },
            "POS_2": {
                "transform": "rotate(-76deg)"
            },
            "POS_3": {
                "transform": "rotate(-104deg)"
            },
            "POS_4": {
                "transform": "rotate(-129deg)"
            },
            "POS_5": {
                "transform": "rotate(-150deg)"
            },
            "POS_OUT": {
                "transform": "rotate(-180deg)"
            }
        }, // CONTAINER_DATA END

        SELECTOR_DATA = {
            "POS_-OUT": {
                "margin-left": "-8px",
                "transform": "rotate(180deg)"
            },
            "POS_-5": {
                "margin-left": "-8px",
                "transform": "rotate(-150deg)"
            },
            "POS_-4": {
                "margin-left": "-3px",
                "transform": "rotate(-129deg)"
            },
            "POS_-3": {
                "margin-left": "-3px",
                "transform": "rotate(-104deg)"
            },
            "POS_-2": {
                "margin-left": "-2px",
                "transform": "rotate(-76deg)"
            },
            "POS_-1": {
                "margin-left": "3px",
                "transform": "rotate(-42deg)"
            },
            "POS_0": {
                "margin-left": "16px",
                "transform": "rotate(0deg)"
            },
            "POS_1": {
                "margin-left": "3px",
                "transform": "rotate(42deg)"
            },
            "POS_2": {
                "margin-left": "-2px",
                "transform": "rotate(76deg)"
            },
            "POS_3": {
                "margin-left": "-3px",
                "transform": "rotate(104deg)"
            },
            "POS_4": {
                "margin-left": "-3px",
                "transform": "rotate(129deg)"
            },
            "POS_5": {
                "margin-left": "-8px",
                "transform": "rotate(150deg)"
            },
            "POS_OUT": {
                "margin-left": "-8px",
                "transform": "rotate(180deg)"
            }
        }, // SELECTOR_DATA END

        THUMBNAIL_DATA = {
            "POS_-OUT": {
                "width": "1px",
                "height": "1px",
                "opacity": "0",
                "font-size": "1px",
                "line-height": "1px"
            },
            "POS_-5": {
                "width": "27px",
                "height": "27px",
                "opacity": "0.2",
                "font-size": "17px",
                "line-height": "27px"
            },
            "POS_-4": {
                "width": "36px",
                "height": "36px",
                "opacity": "0.4",
                "font-size": "23px",
                "line-height": "36px"
            },
            "POS_-3": {
                "width": "40px",
                "height": "40px",
                "opacity": "0.6",
                "font-size": "25px",
                "line-height": "40px"
            },
            "POS_-2": {
                "width": "46px",
                "height": "46px",
                "opacity": "0.8",
                "font-size": "29px",
                "line-height": "46px"
            },
            "POS_-1": {
                "width": "56px",
                "height": "56px",
                "opacity": "1.0",
                "font-size": "35px",
                "line-height": "56px"
            },
            "POS_0": {
                "width": "76px",
                "height": "76px",
                "opacity": "1.0",
                "font-size": "48px",
                "line-height": "76px"
            },
            "POS_1": {
                "width": "56px",
                "height": "56px",
                "opacity": "1.0",
                "font-size": "35px",
                "line-height": "56px"
            },
            "POS_2": {
                "width": "46px",
                "height": "46px",
                "opacity": "0.8",
                "font-size": "29px",
                "line-height": "46px"
            },
            "POS_3": {
                "width": "40px",
                "height": "40px",
                "opacity": "0.6",
                "font-size": "25px",
                "line-height": "40px"
            },
            "POS_4": {
                "width": "36px",
                "height": "36px",
                "opacity": "0.4",
                "font-size": "23px",
                "line-height": "36px"
            },
            "POS_5": {
                "width": "27px",
                "height": "27px",
                "opacity": "0.2",
                "font-size": "17px",
                "line-height": "27px"
            },
            "POS_OUT": {
                "width": "1px",
                "height": "1px",
                "opacity": "0",
                "font-size": "1px",
                "line-height": "1px"
            }
        }, // THUMBNAIL_DATA END

        POS_MAX = 5,
        POS_MIN = -5,
        ANIM_SCROLL_DURATION = 400,     // Duration of scrolling animation
        DELAY_TEXT_DURATION = 220,      // Time delay before label text changed

        IMAGE_NO_ID = "./image/buddy_list_no_id.png",

        listElement,
        labelElement,

        listController = {},
        dataName = [],
        containerElement = [],

        listLength = 0,
        focusPos = 0,

        animRequest = 0,
        animStartTime = 0,
        animPosDiff = 0,

        scrollUpCallback = null,
        scrollDownCallback = null;


    /**
     * Removes all child of the element.
     * @private
     * @param {Object} elm - The object wants to be emptied
     * @return {Object} The emptied element
     */
    function emptyElement(elm) {
        while (elm.firstChild) {
            elm.removeChild(elm.firstChild);
        }

        return elm;
    }

    /**
     * Sets the style of container and its components by position.
     * @private
     * @param {Object} conElm - An object of container element
     * @param {Object} position - The number of position that the element should be placed
     */
    function setPosStyle(conElm, position) {
        var selElm = conElm.querySelector(".list-selector"),
            thmElm = selElm.querySelector(".list-thumbnail");

        if (position > POS_MAX) {
            position = "OUT";
        } else if (position < POS_MIN) {
            position = "-OUT";
        }

        // Set the style data in DATA arrays by position.
        // The foreach iteration will seek all style in the selected elements of DATA arrays.
        // Set the styles for each of container, selector, thumbnail.
        Object.keys(THUMBNAIL_DATA["POS_" + position]).forEach(function(key) {
            thmElm.style[key] = THUMBNAIL_DATA["POS_" + position][key];
        });
        Object.keys(SELECTOR_DATA["POS_" + position]).forEach(function(key) {
            selElm.style[key] = SELECTOR_DATA["POS_" + position][key];
        });
        Object.keys(CONTAINER_DATA["POS_" + position]).forEach(function(key) {
            conElm.style[key] = CONTAINER_DATA["POS_" + position][key];
        });
    }

    /**
     * Sets a text to the label of the indicator.
     * @private
     * @param {string} data - A text string to be set.
     */
    function setLabel(data) {
        emptyElement(labelElement);

        labelElement.appendChild(document.createTextNode(data));
    }

    /**
     * Sets the style of element with the calculated style value from dataArray, by origPos, destPos, ratio.
     * Generally used for applying animation effect.
     * @private
     * @param {Object} elm - An object to be applied the calculated style value
     * @param {Object} dataArray- An array of style data
     * @param {string} origPos- Original position of transition
     * @param {string} destPos- Destination position of transition
     * @param {number} ratio - Progress ratio of transition
     */
    function applyStyleTransition(elm, dataArray, origPos, destPos, ratio) {
        var valOrigStyle,
            valDestStyle,
            valAnimStyle;

        Object.keys(dataArray[origPos]).forEach(function(key) {
            switch (key) {
            case "transform":
                // Remove the "rotate(" string, then parse float value.
                // Then calculate the value, and recover "rotate(" prefix and "deg)" suffix.
                valOrigStyle = parseFloat(dataArray[origPos][key].substring(7));
                valDestStyle = parseFloat(dataArray[destPos][key].substring(7));
                valAnimStyle = "rotate(" + (valOrigStyle + (valDestStyle - valOrigStyle) * ratio) + "deg)";
                break;
            case "margin-left":
            case "width":
            case "height":
            case "font-size":
            case "line-height":
                // Parse float value.
                // Then calculate the value, and recover "px" suffix.
                valOrigStyle = parseFloat(dataArray[origPos][key]);
                valDestStyle = parseFloat(dataArray[destPos][key]);
                valAnimStyle = (valOrigStyle + (valDestStyle - valOrigStyle) * ratio) + "px";
                break;
            case "opacity":
                // Parse float value.
                // Then calculate the value.
                valOrigStyle = parseFloat(dataArray[origPos][key]);
                valDestStyle = parseFloat(dataArray[destPos][key]);
                valAnimStyle = (valOrigStyle + (valDestStyle - valOrigStyle) * ratio);
                break;
            }

            elm.style[key] = valAnimStyle;
        });
    }

    /**
     * Sets the style of elements in container by origPos, destPos, ratio.
     * @private
     * @param {Object} conElm - An object of the container element
     * @param {number} origPos- Original position of transition
     * @param {number} destPos- Destination position of transition
     * @param {number} ratio - Progress ratio of transition
     */
    function setAnimationStyle(conElm, origPos, destPos, ratio) {
        var selElm = conElm.querySelector(".list-selector"),
            thmElm = selElm.querySelector(".list-thumbnail");

        // Progress ratio cannot exceed 1.0
        if (ratio > 1) {
            ratio = 1;
        }
        if (origPos > POS_MAX) {
            origPos = "OUT";
        } else if (origPos < POS_MIN) {
            origPos = "-OUT";
        }
        if (destPos > POS_MAX) {
            destPos = "OUT";
        } else if (destPos < POS_MIN) {
            destPos = "-OUT";
        }

        // Apply style to each of container, selector, thumbnail.
        applyStyleTransition(conElm, CONTAINER_DATA, "POS_" + origPos, "POS_" + destPos, ratio);
        applyStyleTransition(selElm, SELECTOR_DATA, "POS_" + origPos, "POS_" + destPos, ratio);
        applyStyleTransition(thmElm, THUMBNAIL_DATA, "POS_" + origPos, "POS_" + destPos, ratio);
    }

    /**
     * Makes a snapshot of animation frame by setting style to containers by progress ratio, calculated by timestamp.
     * @private
     * @param {number} timestamp - DOMHighResTimeStamp value passed by requestAnimationFrame
     */
    function drawAnimationFrame(timestamp) {
        var progress,
            i;

        // If there is no working animation, animation flag will be set to with the timestamp.
        if (!animStartTime) {
            animStartTime = timestamp;
        }
        progress = timestamp - animStartTime;

        for (i = 0; i < listLength; i++) {
            setAnimationStyle(containerElement[i], i - focusPos - animPosDiff, i - focusPos, progress / ANIM_SCROLL_DURATION);
        }

        // If the animation is not reached to the end of time, Request the next frame of rendering for animation.
        // Otherwise, clear the request and flag.
        if (progress < ANIM_SCROLL_DURATION) {
            animRequest = window.requestAnimationFrame(drawAnimationFrame);
        } else {
            animRequest = 0;
            animStartTime = 0;
        }
    }

    /**
     * Starts the animation by setting the first requestAnimationFrame API call.
     * @private
     * @param {number} diff - difference between two positions of animation
     */
    function setAnimation(diff) {
        animPosDiff = diff;

        // If there is a animation request already, cancel that request.
        // (After that the new request will be made)
        if (animRequest) {
            window.cancelAnimationFrame(animRequest);
        }
        animRequest = window.requestAnimationFrame(drawAnimationFrame);
    }

    /**
     * Creates and returns the callback function for thumbnail element,
     * that processes jobs decided by current focus position and index of the clicked item.
     * If the focused item was clicked, callback function will be called.
     * Otherwise, the list will be scrolled by difference between focus and index of the clicked item.
     * @private
     * @param {number} index - The index of the element in the buddy list
     * @param {function} callback - The callback function to be called
     * @return {function} The callback function to handle the click event of thumbnail element
     */
    function createThumbnailCallback(index, callback) {
        return function() {
            if (focusPos === index) {
                callback();
            } else {
                listController.scroll(index - focusPos);
            }
        };
    }

    /**
     * Creates a thumbnail element.
     * @private
     * @param {string} thmData - The thumbnail data to be inserted, address of picture or a string
     * @param {string} dataType - The type of data. Can be "image" or "string"
     * @param {function} callback - The callback function to be called when the thumbnail is clicked
     * @return {Object} A thumbnail element created by this function
     */
    function createThumbnail(thmData, dataType, callback) {
        var element = document.createElement("div");

        element.className = "list-thumbnail";

        // If address of the image is provided, set the image to the thumbnail.
        // If a string is provided, set the string to the thumbnail.
        if (dataType === "image") {
            element.style.backgroundImage = "url('" + thmData + "')";
        } else if (dataType === "string") {
            element.appendChild(document.createTextNode(thmData));
        }

        // If the callback parameter was passed, register the click event callback
        if (callback && typeof callback === "function") {
            element.addEventListener("click", createThumbnailCallback(listLength, callback));
        }

        return element;
    }

    /**
     * Creates a selector element.
     * @private
     * @param {Object} thumbnail - An object of the thumbnail element to be inserted into the selector
     * @return {Object} The created selector element
     */
    function createSelector(thumbnail) {
        var element = document.createElement("div");

        element.className = "list-selector";
        element.appendChild(thumbnail);

        return element;
    }

    /**
     * Creates a container element.
     * @private
     * @param {Object} selector - An object of the selector element to be inserted into the container
     * @return {Object} The created container element
     */
    function createContainer(selector) {
        var element = document.createElement("div");

        element.className = "list-containerbar";
        element.appendChild(selector);

        return element;
    }

    /**
     * Handles the rotary event.
     * (The list will be scrolled by result)
     * @private
     * @param {Object} ev - the event data object
     */
    function rotaryEventHandler(ev) {
        var direction = ev.detail.direction;

        // If the rotated direction is Clockwise, scroll down the list.
        // If the rotated direction is Counterclockwise, scroll up the list.
        if (direction === "CW") {
            listController.scroll(1);
        } else if (direction === "CCW") {
            listController.scroll(-1);
        }
    }

    /**
     * Handles the label click event.
     * (The callback function of focused thumbnail will be called.)
     * @private
     * @param {Object} ev - the event data object
     */
    function labelClickEventHandler(ev) {
        containerElement[focusPos].querySelector(".list-thumbnail").click();
    }

    /**
     * Returns the length of the list.
     * @public
     * @return {number} The length of the list
     */
    listController.getListLength = function() {
        return listLength;
    };

    /**
     * Adds new data to the list.
     * @public
     * @param {string} name - The name of the buddy
     * @param {string} image - A thumbnail image of the buddy
     * @param {function} callback - A callback function to be called when clicked
     */
    listController.addData = function addData(name, image, callback) {
        var thmNew,
            selNew,
            conNew;

        dataName.push(name);

        // If the thumbnail image path is exist, use the image.
        // Otherwise, use the first letter of the name.
        // When the buddy doesn't have both of image and name, use default image.
        if (image && typeof image === "string") {
            if (callback && typeof callback === "function") {
                thmNew = createThumbnail(image, "image", callback);
            } else {
                thmNew = createThumbnail(image, "image");
            }
        } else if (name.length > 0) {
            if (callback && typeof callback === "function") {
                thmNew = createThumbnail(name.substring(0, 1), "string", callback);
            } else {
                thmNew = createThumbnail(name.substring(0, 1), "string");
            }
        } else {
            if (callback && typeof callback === "function") {
                thmNew = createThumbnail(IMAGE_NO_ID, "image", callback);
            } else {
                thmNew = createThumbnail(IMAGE_NO_ID, "image");
            }
        }
        selNew = createSelector(thmNew);
        conNew = createContainer(selNew);

        // Push the new data to list.
        containerElement.push(conNew);

        // Push into the DOM and set the style of the element.
        listElement.appendChild(conNew);
        setPosStyle(conNew, listLength - focusPos);

        // If the added data is the first element, set label text.
        if (listLength === 0) {
            setLabel(dataName[focusPos]);
        }

        listLength++;
    };

    /**
     * Scrolls up or down the list.
     * If diff is less than 0, the list will scroll up.
     * (When scrolls up, focus should go up but location of the focused element is fixed to center of screen,
     * so instead all list selectors will move down)
     * If diff is greater than 0, the list will scroll down.
     * (When scrolls down, Focus should go down but location of the focused element is fixed to center of screen,
     * so instead all list selectors will move up)
     * @public
     * @param {number} diff - A difference between indexes before and after the scroll
     */
    listController.scroll = function scroll(diff) {
        if (diff < 0) {
            if (scrollUpCallback) {
                scrollUpCallback(focusPos, diff);
            }
        } else if (diff > 0) {
            if (scrollDownCallback) {
                scrollDownCallback(focusPos, diff);
            }
        }

        if ((focusPos + diff >= 0) && (focusPos + diff < listLength)) {
            focusPos += diff;
            // Set the animation state
            setAnimation(-1 * diff);
            // Label should be changed after the predefined duration
            setTimeout(function() {
                setLabel(dataName[focusPos]);
            }, DELAY_TEXT_DURATION);
        }
    };

    /**
     * Sets a callback to be called when the scroll up event occurs to the list.
     * @public
     * @param {function} callback - The callback function to be set
     */
    listController.setScrollUpCallback = function setScrollUpCallback(callback) {
        scrollUpCallback = callback;
    };

    /**
     * Sets a callback to be called when the scroll down event occurs to the list.
     * @public
     * @param {function} callback - The callback function to be set
     */
    listController.setScrollDownCallback = function setScrollDownCallback(callback) {
        scrollDownCallback = callback;
    };

    /**
     * Initiate the listController object with the list element..
     * @public
     * @param {string} listId - The ID of the list element in DOM.
     */
    listController.init = function init(listId) {
        listElement = document.querySelector("#" + listId);
        labelElement = listElement.querySelector(".list-label");
        labelElement.addEventListener("click", labelClickEventHandler);

        document.addEventListener('rotarydetent', rotaryEventHandler);
    };

    return listController;
}());