(()=>{"use strict";var e=document.querySelector(".profile__edit-button"),t=document.querySelector(".profile__add-button"),n=document.querySelector(".popup__input_data_name"),r=document.querySelector(".popup__input_data_ocupation"),o=document.getElementById("placeTemplate"),i=document.querySelector(".popup_value_place-add").querySelector(".popup__form"),u=document.querySelector(".popup_value_user-edit").querySelector(".popup__form"),a=document.querySelector(".popup_value_avatar").querySelector(".popup__form"),c={inputSelector:".popup__input",saveSelector:".popup__save",errorInputClass:"popup__input_type_error",errorElementClass:"popup__input-error_active",saveConditionHoverClass:"popup__save_condition_hover",saveInactiveClass:"popup__save_inactive"},l=document.querySelector(".profile__avatar-button");function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var f=function(){function e(t,n,r,o,i,u){var a=t.item,c=t.openPlaceImage;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=a,this._cardOwnerId=a.owner._id,this._userId=o,this._title=a.name,this._link=a.link,this._placeTemplate=n,this._openPlaceImage=c,this._pressDelButton=r,this._putLike=i,this._delLike=u}var t,n;return t=e,(n=[{key:"_getPlaceTemplate",value:function(){return this._placeTemplate.content.querySelector(".place").cloneNode(!0)}},{key:"delPlace",value:function(){this._placeElement.remove()}},{key:"pressLikeButton",value:function(){this._placeLikeButton.classList.add("place__like_active")}},{key:"deleteLike",value:function(){this._placeLikeButton.classList.remove("place__like_active")}},{key:"checkLike",value:function(e){var t=this,n=this._placeElement.querySelector(".place__like-sum");this._arrUsersLike=[],this._sumLikes=e.likes.length,this._putOrNot=!1,0===this._sumLikes?n.textContent="":(n.textContent=this._sumLikes,e.likes.forEach((function(e){t._arrUsersLike.push(e._id)})),this._putOrNot=this._arrUsersLike.includes(this._userId),this._putOrNot&&this.pressLikeButton())}},{key:"_setEventListeners",value:function(){var e=this;this._placeLikeButton.addEventListener("click",(function(){e._putOrNot?e._delLike():e._putLike()})),this._buttonDelPlace&&this._buttonDelPlace.addEventListener("click",(function(){e._pressDelButton(e)})),this._buttonImagePlace.addEventListener("click",(function(){e._openPlaceImage(e._title,e._link)}))}},{key:"generatePlace",value:function(){this._placeElement=this._getPlaceTemplate(),this._placeElement.querySelector(".place__title").textContent=this._title;var e=this._placeElement.querySelector(".place__image");return e.setAttribute("src",this._link),e.setAttribute("alt",this._title+"."),this._placeLikeButton=this._placeElement.querySelector(".place__like"),this._buttonDelPlace=this._placeElement.querySelector(".place__trash"),this._buttonImagePlace=this._placeElement.querySelector(".place__image-button"),this.checkLike(this._item),this._setEventListeners(),this._checkId(),this._placeElement}},{key:"_checkId",value:function(){this._userId!==this._cardOwnerId&&this._buttonDelPlace.remove()}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==y(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===y(o)?o:String(o)),r)}var o}var h=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=t,this._inputSelector=n.inputSelector,this._saveSelector=n.saveSelector,this._errorInputClass=n.errorInputClass,this._errorElementClass=n.errorElementClass,this._saveConditionHoverClass=n.saveConditionHoverClass,this._saveInactiveClass=n.saveInactiveClass}var t,n;return t=e,(n=[{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._errorInputClass),t.classList.remove(this._errorElementClass)}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._errorInputClass),n.textContent=t,n.classList.add(this._errorElementClass)}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"offButton",value:function(){this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._saveInactiveClass),this._buttonElement.classList.remove(this._saveConditionHoverClass)}},{key:"_onButton",value:function(){this._buttonElement.classList.remove(this._saveInactiveClass),this._buttonElement.disabled=!1,this._buttonElement.classList.add(this._saveConditionHoverClass)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.offButton():this._onButton()}},{key:"disableValidationInputs",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._saveSelector),this._inputList.forEach((function(t){e.disableValidationInputs(),e.offButton(),t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==_(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}var m=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderAllElements",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==b(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===b(o)?o:String(o)),r)}var o}var g=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._popupCloseButton=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"openPopup",value:function(){this._popup.classList.add("popup_openend"),document.addEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popupCloseButton.addEventListener("click",(function(){e.closePopup()})),this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup_openend")&&e.closePopup()}))}},{key:"closePopup",value:function(){this._popup.classList.remove("popup_openend"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.closePopup()}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==k(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===k(o)?o:String(o)),r)}var o}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImg=t._popup.querySelector(".figure__img"),t._placeFigureCaption=t._popup.querySelector(".figure__caption"),t}return t=u,(n=[{key:"openPlaceImage",value:function(e,t){this._popupImg.setAttribute("src",t),this._placeFigureCaption.textContent=e,this._popupImg.setAttribute("alt","".concat(e," .")),E(O(u.prototype),"openPopup",this).call(this)}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(g);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==j(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===j(o)?o:String(o)),r)}var o}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},I.apply(this,arguments)}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._popupForm=t._popup.querySelector(".popup__form"),t._handleFormSubmit=r,t._inputList=t._popupForm.querySelectorAll(".popup__input"),t._buttonSubmit=t._popupForm.querySelector(".popup__save"),t}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;I(R(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(){e._handleFormSubmit(e._getValueInputs())}))}},{key:"_getValueInputs",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"closePopup",value:function(){I(R(u.prototype),"closePopup",this).call(this),this._popupForm.reset()}},{key:"changeButtonText",value:function(e){this._buttonSubmit.textContent=e}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(g);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==q(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}var x=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(t),this._userOcupation=document.querySelector(n),this._userAvatar=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._userName.textContent,userOcupation:this._userOcupation.textContent,userAvatar:this._userAvatar.src}}},{key:"setUserInfo",value:function(e){this._userName.textContent=e.name,this._userOcupation.textContent=e.about,this._userAvatar.src=e.avatar}},{key:"setUserAvatar",value:function(e){this._userAvatar.src=e.avatar}}])&&A(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==D(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==D(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===D(o)?o:String(o)),r)}var o}var U=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t,this._headers=n}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"editProfile",value:function(e){var t=this;return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then((function(e){return t._checkResponse(e)}))}},{key:"addNewCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._checkResponse(e)}))}},{key:"editAvatar",value:function(e){var t=this;return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then((function(e){return t._checkResponse(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"putLike",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e._id,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"delLike",value:function(e){var t=this;return fetch("".concat(this._url,"/cards/").concat(e._id,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function F(e){return F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},F(e)}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==F(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==F(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===F(o)?o:String(o)),r)}var o}function H(){return H="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=M(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},H.apply(this,arguments)}function J(e,t){return J=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},J(e,t)}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(e)}var z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&J(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=M(r);if(o){var n=M(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===F(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._form=n._popup.querySelector(".popup__form"),n._deleteCard=t,n}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;H(M(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(){e._deleteCard(e._place)}))}},{key:"getId",value:function(e){return this._placeId=e._item._id,this._place=e,this._placeId,this._place}}])&&V(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(g);function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}addEventListener("submit",(function(e){e.preventDefault()}));var G,K=new U("https://nomoreparties.co/v1/cohort-66",{authorization:"6ea24768-e3b3-4cce-a68a-3bff993d63e5","Content-Type":"application/json"});Promise.all([K.getInitialCards(),K.getUserInfo()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];G=i._id,W.renderAllElements(o.reverse()),re(i)})).catch((function(e){console.log(e)}));var Q=function(e){var t=new f({item:e,openPlaceImage:function(e,t){return X.openPlaceImage(e,t)}},o,(function(){ee.openPopup(),ee.getId(t)}),G,(function(){K.putLike(e).then((function(e){t.checkLike(e),t.pressLikeButton()})).catch((function(e){console.log(e)}))}),(function(){K.delLike(e).then((function(e){t.checkLike(e),t.deleteLike()})).catch((function(e){console.log(e)}))}));return t.generatePlace()},W=new m({renderer:function(e){var t=Q(e);W.addItem(t)}},".grid-places"),X=new L(".popup_value_img");X.setEventListeners();var Y=new g(".popup_value_place-add");Y.setEventListeners();var Z=new g(".popup_value_user-edit");Z.setEventListeners();var ee=new z(".popup_value_delete-place",(function(e){K.deleteCard(e._item._id).then((function(){e.delPlace(),ee.closePopup()})).catch((function(e){console.log(e)}))}));ee.setEventListeners();var te=new g(".popup_value_avatar");te.setEventListeners(),l.addEventListener("click",(function(){te.openPopup(),ae.disableValidationInputs(),ce.offButton()})),t.addEventListener("click",(function(){Y.openPopup(),le.disableValidationInputs(),le.offButton()}));var ne=new x(".profile__name",".profile__ocupation",".profile__avatar");function re(e){ne.setUserInfo(e)}e.addEventListener("click",(function(){var e;Z.openPopup(),e=ne.getUserInfo(),n.value=e.userName,r.value=e.userOcupation,ae.disableValidationInputs(),ae.offButton()}));var oe=new B({popupSelector:".popup_value_place-add",handleFormSubmit:function(e){!function(e){oe.changeButtonText("Сохранение..."),K.addNewCard(e).then((function(e){var t=Q(e);W.addItem(t),oe.closePopup()})).catch((function(e){console.log(e)})).finally((function(){oe.changeButtonText("Создать")}))}(e)}});oe.setEventListeners();var ie=new B({popupSelector:".popup_value_user-edit",handleFormSubmit:function(e){!function(e){ie.changeButtonText("Сохранение..."),K.editProfile(e).then((function(e){ne.setUserInfo(e),ie.closePopup()})).catch((function(e){console.log(e)})).finally((function(){ie.changeButtonText("Сохранить")}))}(e)}});ie.setEventListeners();var ue=new B({popupSelector:".popup_value_avatar",handleFormSubmit:function(e){!function(e){ue.changeButtonText("Сохранение..."),K.editAvatar(e).then((function(e){ne.setUserAvatar(e),ue.closePopup()})).catch((function(e){console.log(e)})).finally((function(){ue.changeButtonText("Сохранить")}))}(e)}});ue.setEventListeners();var ae=new h(u,c);ae.enableValidation();var ce=new h(a,c);ce.enableValidation();var le=new h(i,c);le.enableValidation()})();