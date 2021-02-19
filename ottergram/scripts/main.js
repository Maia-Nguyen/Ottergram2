/*jslint browser:true*/
var NEXT_SELECTOR = '[data-button-role="next"]';
var PREVIOUS_SELECTOR = '[data-button-role="previous"]';
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var index = 0;

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function nextPreviousThumb(n, length) {
    'use strict';
    n = n > 0 ? 1 : length - 1;
    index += n;
    var thumbnailArray = getThumbnailsArray();
    index %= thumbnailArray.length;
    var thumb = thumbnailArray[index];
    setDetailsFromThumb(thumb);
    showDetails();
}

function addNextThumbHandler() {
    'use strict';
    var nextButton = document.querySelector(NEXT_SELECTOR);
    nextButton.addEventListener('click', function (event) {
        event.preventDefault();
        nextPreviousThumb(1, getThumbnailsArray().length);
    });
}

function addPreviousThumbHandler() {
    'use strict';
    var previousButton = document.querySelector(PREVIOUS_SELECTOR);
    previousButton.addEventListener('click', function (event) {
        event.preventDefault();
        nextPreviousThumb(-1, getThumbnailsArray().length);
    });
}
function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addNextThumbHandler();
    addPreviousThumbHandler();
    addKeyPressHandler();
}

initializeEvents();
