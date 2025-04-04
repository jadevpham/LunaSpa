import "./chunk-WOOG5QLI.js";

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return (
		(_typeof =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (o2) {
						return typeof o2;
					}
				: function (o2) {
						return o2 &&
							"function" == typeof Symbol &&
							o2.constructor === Symbol &&
							o2 !== Symbol.prototype
							? "symbol"
							: typeof o2;
					}),
		_typeof(o)
	);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (
		(r = toPropertyKey(r)) in e
			? Object.defineProperty(e, r, {
					value: t,
					enumerable: true,
					configurable: true,
					writable: true,
				})
			: (e[r] = t),
		e
	);
}

// node_modules/i18next-subliminal/dist/esm/encoder.js
var INVISIBLE_CHARACTERS = ["​", "‌"];
var INVISIBLE_REGEX = RegExp(
	"([".concat(INVISIBLE_CHARACTERS.join(""), "]{9})+"),
	"gu",
);
var TEMPLATE_MINIMUM_LENGTH = '{"k":"a"}'.length;
var invisibleStartMarker = "subliminal:start";
var toBytes = function toBytes2(text) {
	return Array.from(new TextEncoder().encode(text));
};
var fromBytes = function fromBytes2(bytes) {
	return new TextDecoder().decode(new Uint8Array(bytes));
};
var padToWholeBytes = function padToWholeBytes2(binary) {
	var needsToAdd = 8 - binary.length;
	return "0".repeat(needsToAdd) + binary;
};
var encodeMessage = function encodeMessage2(text) {
	var bytes = toBytes(text).map(Number);
	var binary = bytes
		.map(function (byte) {
			return padToWholeBytes(byte.toString(2)) + "0";
		})
		.join("");
	var result = Array.from(binary)
		.map(function (b) {
			return INVISIBLE_CHARACTERS[Number(b)];
		})
		.join("");
	return result;
};
var encodedInvisibleStartMarker = encodeMessage(invisibleStartMarker);
var decodeMessage = function decodeMessage2(message) {
	var binary = Array.from(message)
		.map(function (character) {
			return INVISIBLE_CHARACTERS.indexOf(character);
		})
		.map(String)
		.join("");
	var textBytes = binary.match(/(.{9})/g);
	var codes = Uint8Array.from(
		(textBytes === null || textBytes === void 0
			? void 0
			: textBytes.map(function (byte) {
					return parseInt(byte.slice(0, 8), 2);
				})) || [],
	);
	return fromBytes(codes);
};
var decodeFromText = function decodeFromText2(text) {
	var _text$match;
	var invisibleMessages =
		(_text$match = text.match(INVISIBLE_REGEX)) === null ||
		_text$match === void 0
			? void 0
			: _text$match.filter(function (m) {
					return m.length > TEMPLATE_MINIMUM_LENGTH - 1;
				});
	if (!invisibleMessages || invisibleMessages.length === 0) return;
	return decodeMessage(invisibleMessages[invisibleMessages.length - 1]);
};
var removeInvisibles = function removeInvisibles2(text) {
	return text.replace(INVISIBLE_REGEX, "");
};
var encodeValue = function encodeValue2(data3) {
	if (Object.keys(data3).length === 0) return data3;
	var value = {
		k: data3.key,
		n: data3.ns,
		l: data3.lng,
		s: data3.source,
	};
	return JSON.stringify(value);
};
var decodeValue = function decodeValue2(value) {
	if (!value || typeof value !== "string" || value.indexOf("{") !== 0) return;
	try {
		var parsed = JSON.parse(value || "{}");
		return {
			key: parsed.k,
			ns: parsed.n,
			lng: parsed.l,
			source: parsed.s,
		};
	} catch (e) {
		return void 0;
	}
};
function wrap(text) {
	var invisibleMeta =
		arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var encodedValue = encodeValue(invisibleMeta);
	var invisibleMark = encodeMessage(encodedValue);
	return typeof text === "string" && text
		? encodedInvisibleStartMarker + text + invisibleMark
		: text;
}
function unwrap(text) {
	var encodedValue = decodeFromText(text);
	var decodedVal = decodeValue(encodedValue);
	var result = removeInvisibles(text);
	return {
		text: result,
		invisibleMeta: decodedVal,
	};
}
function containsHiddenMeta(text) {
	if (!text || text.length < 27) return false;
	if (!INVISIBLE_REGEX.test(text)) return false;
	var lastByte = text.substring(text.length - 9);
	var lastChar = decodeMessage(lastByte);
	return lastChar === "}";
}
function containsHiddenStartMarker(text) {
	return text.startsWith(encodedInvisibleStartMarker);
}

// node_modules/i18next-subliminal/dist/esm/postProcessor.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var postProcessorName = "subliminal";
var SubliminalPostProcessor = {
	name: postProcessorName,
	type: "postProcessor",
	options: {},
	setOptions: function setOptions(options) {
		this.options = _objectSpread(_objectSpread({}, options), this.options);
	},
	process: function process2(value, keyIn, options, translator) {
		var opt = (this.options = _objectSpread(
			_objectSpread({}, options),
			this.options,
		));
		var key, ns, lng, source;
		if (options.i18nResolved) {
			key = options.i18nResolved.exactUsedKey;
			ns = options.i18nResolved.usedNS;
			lng = options.i18nResolved.usedLng;
			if (options.i18nResolved.res === void 0) {
				if (key !== value) {
					source = "default";
				} else {
					source = "key";
				}
			} else {
				source = "translation";
			}
		} else {
			var _ref,
				_opt$keySeparator,
				_translator$options,
				_ref2,
				_namespaces$,
				_translator$options2;
			var keySeparator =
				(_ref =
					(_opt$keySeparator = opt.keySeparator) !== null &&
					_opt$keySeparator !== void 0
						? _opt$keySeparator
						: translator === null ||
							  translator === void 0 ||
							  (_translator$options = translator.options) === null ||
							  _translator$options === void 0
							? void 0
							: _translator$options.keySeparator) !== null && _ref !== void 0
					? _ref
					: ".";
			var _translator$extractFr = translator.extractFromKey(
					keyIn.join(keySeparator),
					options,
				),
				extractedKey = _translator$extractFr.key,
				namespaces = _translator$extractFr.namespaces;
			key = extractedKey;
			ns =
				(_ref2 =
					(_namespaces$ =
						namespaces === null || namespaces === void 0
							? void 0
							: namespaces[0]) !== null && _namespaces$ !== void 0
						? _namespaces$
						: opt.ns) !== null && _ref2 !== void 0
					? _ref2
					: translator === null ||
						  translator === void 0 ||
						  (_translator$options2 = translator.options) === null ||
						  _translator$options2 === void 0
						? void 0
						: _translator$options2.defaultNS;
			lng = options.lng || this.language;
			if (key === value) {
				source = "key";
			} else {
				source = "translation";
			}
		}
		return wrap(value, {
			key,
			ns,
			lng,
			source,
		});
	},
	overloadTranslationOptionHandler:
		function overloadTranslationOptionHandler() {
			return {
				postProcess: postProcessorName,
				postProcessPassResolved: true,
			};
		},
};

// node_modules/locize/dist/esm/vars.js
var validAttributes = ["placeholder", "title", "alt"];
var colors = {
	highlight: "#26a69a",
	warning: "#e67a00",
};
var getIframeUrl = function getIframeUrl2() {
	var _prc$env;
	var p;
	if (typeof process !== "undefined") p = process;
	if (!p && typeof window !== "undefined") p = window.process;
	var prc = p || {};
	var env =
		((_prc$env = prc.env) === null || _prc$env === void 0
			? void 0
			: _prc$env.locizeIncontext) || "production";
	return env === "development"
		? "http://localhost:3003/"
		: env === "staging"
			? "https://incontext-dev.locize.app"
			: "https://incontext.locize.app";
};

// node_modules/locize/dist/esm/ui/stylesheet.js
var sheet = (function () {
	if (typeof document === "undefined") return;
	var style = document.createElement("style");
	document.head.appendChild(style);
	return style.sheet;
})();

// node_modules/locize/dist/esm/api/postMessage.js
function ownKeys2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys2(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys2(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var legacyEventMapping = {
	committed: "commitKeys",
};
function getMappedLegacyEvent(msg) {
	if (legacyEventMapping[msg]) return legacyEventMapping[msg];
	return msg;
}
function addLocizeSavedHandler(handler11) {
	api.locizeSavedHandler = handler11;
}
function turnOn() {
	api.scriptTurnedOff = false;
	api.turnOn();
	return api.scriptTurnedOff;
}
function turnOff() {
	api.turnOff();
	api.scriptTurnedOff = true;
	return api.scriptTurnedOff;
}
function setEditorLng(lng) {
	api.sendCurrentTargetLanguage(lng);
}
var pendingMsgs = [];
function sendMessage(action, payload) {
	if (!api.source) {
		var _document$getElementB;
		api.source =
			(_document$getElementB = document.getElementById(
				"i18next-editor-iframe",
			)) === null || _document$getElementB === void 0
				? void 0
				: _document$getElementB.contentWindow;
	}
	if (!api.origin) api.origin = getIframeUrl();
	if (!api.source || !api.source.postMessage) {
		pendingMsgs.push({
			action,
			payload,
		});
		return;
	}
	if (api.legacy) {
		api.source.postMessage(
			_objectSpread2(
				{
					message: action,
				},
				payload,
			),
			api.origin,
		);
	} else {
		api.source.postMessage(
			{
				sender: "i18next-editor",
				senderAPIVersion: "v1",
				action,
				message: action,
				payload,
			},
			api.origin,
		);
	}
	var todo = pendingMsgs;
	pendingMsgs = [];
	todo.forEach(function (_ref) {
		var action2 = _ref.action,
			payload2 = _ref.payload;
		sendMessage(action2, payload2);
	});
}
var handlers = {};
var repeat = 5;
var api = {
	init: function init(implementation, clickHandler) {
		api.i18n = implementation;
		api.clickHandler = clickHandler;
	},
	requestInitialize: function requestInitialize(payload) {
		sendMessage("requestInitialize", payload);
		if (api.initInterval) return;
		api.initInterval = setInterval(function () {
			repeat = repeat - 1;
			api.requestInitialize(payload);
			if (repeat < 0 && api.initInterval) {
				clearInterval(api.initInterval);
				delete api.initInterval;
			}
		}, 1e3);
	},
	selectKey: function selectKey(meta) {
		sendMessage("selectKey", meta);
	},
	confirmResourceBundle: function confirmResourceBundle(payload) {
		sendMessage("confirmResourceBundle", payload);
	},
	sendCurrentParsedContent: function sendCurrentParsedContent() {
		sendMessage("sendCurrentParsedContent", {
			content: Object.values(store.data).map(function (item) {
				return {
					id: item.id,
					keys: item.keys,
				};
			}),
		});
	},
	sendCurrentTargetLanguage: function sendCurrentTargetLanguage(lng) {
		sendMessage("sendCurrentTargetLanguage", {
			targetLng: lng || api.i18n.getLng(),
		});
	},
	addHandler: function addHandler(action, fc) {
		if (!handlers[action]) handlers[action] = [];
		handlers[action].push(fc);
	},
	sendLocizeIsEnabled: function sendLocizeIsEnabled() {
		sendMessage("locizeIsEnabled", {
			enabled: true,
		});
	},
	turnOn: function turnOn2() {
		if (api.scriptTurnedOff) return sendMessage("forcedOff");
		if (!api.clickInterceptionEnabled) {
			window.document.body.addEventListener("click", api.clickHandler, true);
		}
		api.clickInterceptionEnabled = true;
		sendMessage("turnedOn");
	},
	turnOff: function turnOff2() {
		if (api.scriptTurnedOff) return sendMessage("forcedOff");
		if (api.clickInterceptionEnabled) {
			window.document.body.removeEventListener("click", api.clickHandler, true);
		}
		api.clickInterceptionEnabled = false;
		sendMessage("turnedOff");
	},
	onAddedKey: function onAddedKey(lng, ns, key, value) {
		var msg = {
			lng,
			ns,
			key,
			value,
		};
		sendMessage("added", msg);
	},
};
if (typeof window !== "undefined") {
	window.addEventListener("message", function (e) {
		var _e$data = e.data,
			sender = _e$data.sender,
			action = _e$data.action,
			message = _e$data.message,
			payload = _e$data.payload;
		if (message) {
			var usedEventName = getMappedLegacyEvent(message);
			if (handlers[usedEventName]) {
				handlers[usedEventName].forEach(function (fc) {
					fc(payload, e);
				});
			}
		} else if (sender === "i18next-editor-frame" && handlers[action]) {
			handlers[action].forEach(function (fc) {
				fc(payload);
			});
		}
	});
}

// node_modules/locize/dist/esm/api/handleEditKey.js
function setValueOnNode(meta, value) {
	var item = store.get(meta.eleUniqueID);
	if (!item || !item.keys[meta.textType]) return;
	var txtWithHiddenMeta = wrap(value, item.subliminal);
	if (meta.textType === "text") {
		item.node.textContent = txtWithHiddenMeta;
	} else if (meta.textType.indexOf("attr:") === 0) {
		var attr = meta.textType.replace("attr:", "");
		item.node.setAttribute(attr, txtWithHiddenMeta);
	} else if (meta.textType === "html") {
		var id = "".concat(meta.textType, "-").concat(meta.children);
		if (!item.originalChildNodes) {
			var clones = [];
			item.node.childNodes.forEach(function (c) {
				clones.push(c);
			});
			item.originalChildNodes = clones;
		}
		if (item.children[id].length === item.node.childNodes.length) {
			item.node.innerHTML = txtWithHiddenMeta;
		} else {
			var children = item.children[id];
			var first = children[0].child;
			var dummy = document.createElement("div");
			dummy.innerHTML = txtWithHiddenMeta;
			var nodes = [];
			dummy.childNodes.forEach(function (c) {
				nodes.push(c);
			});
			nodes.forEach(function (c) {
				try {
					item.node.insertBefore(c, first);
				} catch (error) {
					item.node.appendChild(c);
				}
			});
			children.forEach(function (replaceable) {
				if (item.node.contains(replaceable.child))
					item.node.removeChild(replaceable.child);
			});
		}
	}
}
function handler(payload) {
	var meta = payload.meta,
		value = payload.value;
	if (meta && value !== void 0) {
		setValueOnNode(meta, value);
	}
}
api.addHandler("editKey", handler);

// node_modules/locize/dist/esm/api/handleCommitKey.js
function handler2(payload) {
	var meta = payload.meta,
		value = payload.value,
		lng = payload.lng;
	if (meta && value !== void 0) {
		setValueOnNode(meta, value);
		var usedLng = lng || api.i18n.getLng();
		api.i18n.setResource(usedLng, meta.ns, meta.key, value);
		api.i18n.triggerRerender();
	}
}
api.addHandler("commitKey", handler2);

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray(r);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
	if (
		("undefined" != typeof Symbol && null != r[Symbol.iterator]) ||
		null != r["@@iterator"]
	)
		return Array.from(r);
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return (
			"Object" === t && r.constructor && (t = r.constructor.name),
			"Map" === t || "Set" === t
				? Array.from(r)
				: "Arguments" === t ||
					  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
					? _arrayLikeToArray(r, a)
					: void 0
		);
	}
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
	return (
		_arrayWithoutHoles(r) ||
		_iterableToArray(r) ||
		_unsupportedIterableToArray(r) ||
		_nonIterableSpread()
	);
}

// node_modules/locize/dist/esm/api/handleCommitKeys.js
function handler3(payload) {
	var updated = payload.updated;
	updated.forEach(function (item) {
		var lng = item.lng,
			ns = item.ns,
			key = item.key,
			data3 = item.data,
			metas = item.metas,
			meta = item.meta;
		if (meta && data3.value) setValueOnNode(meta, data3.value);
		if (metas) {
			Object.values(metas).forEach(function (metaItem) {
				setValueOnNode(metaItem, data3.value);
			});
		}
		api.i18n.setResource(lng, ns, key, data3.value);
	});
	Object.values(store.data).forEach(function (item) {
		if (item.originalChildNodes) {
			var _item$node;
			(_item$node = item.node).replaceChildren.apply(
				_item$node,
				_toConsumableArray(item.originalChildNodes),
			);
		}
	});
	api.i18n.triggerRerender();
	if (api.locizeSavedHandler) api.locizeSavedHandler(payload);
	if (window.locizeSavedHandler) window.locizeSavedHandler(payload);
}
api.addHandler("commitKeys", handler3);

// node_modules/locize/dist/esm/api/handleConfirmInitialized.js
function handler4(payload) {
	api.initialized = true;
	clearInterval(api.initInterval);
	delete api.initInterval;
	api.sendCurrentParsedContent();
	api.sendCurrentTargetLanguage();
}
api.addHandler("confirmInitialized", handler4);

// node_modules/locize/dist/esm/uninstrumentedStore.js
function ownKeys3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys3(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys3(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var data = {};
function clean() {
	Object.values(data).forEach(function (item) {
		if (!document.body.contains(item.node)) {
			resetHighlight(item.id, item.node);
			delete data[item.id];
		}
	});
}
function save(id, type, node) {
	if (!id || !type || !node) return;
	if (!data[id]) {
		data[id] = {
			id,
			node,
		};
	}
	data[id].keys = _objectSpread3(
		_objectSpread3({}, data[id].keys),
		{},
		_defineProperty({}, "".concat(type), "uninstrumented"),
	);
}
function get(id) {
	return data[id];
}
var uninstrumentedStore = {
	save,
	clean,
	get,
	data,
};

// node_modules/locize/dist/esm/ui/utils.js
function isInViewport(el) {
	var rect = el.getBoundingClientRect();
	var windowHeight =
		window.innerHeight || document.documentElement.clientHeight;
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
	var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
	return vertInView && horInView;
}
function mouseDistanceFromElement(mouseEvent, element) {
	var $n = element,
		mX = mouseEvent.pageX,
		mY = mouseEvent.pageY,
		from = {
			x: mX,
			y: mY,
		},
		off = $n.getBoundingClientRect(),
		ny1 = off.top + document.documentElement.scrollTop,
		ny2 = ny1 + $n.offsetHeight,
		nx1 = off.left + document.documentElement.scrollLeft,
		nx2 = nx1 + $n.offsetWidth,
		maxX1 = Math.max(mX, nx1),
		minX2 = Math.min(mX, nx2),
		maxY1 = Math.max(mY, ny1),
		minY2 = Math.min(mY, ny2),
		intersectX = minX2 >= maxX1,
		intersectY = minY2 >= maxY1,
		to = {
			x: intersectX ? mX : nx2 < mX ? nx2 : nx1,
			y: intersectY ? mY : ny2 < mY ? ny2 : ny1,
		},
		distX = to.x - from.x,
		distY = to.y - from.y,
		hypot = Math.pow(Math.pow(distX, 2) + Math.pow(distY, 2), 1 / 2);
	return Math.floor(hypot);
}

// node_modules/locize/dist/esm/utils.js
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this;
		var args = arguments;
		var later = function later2() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
function isWindow(obj) {
	return obj != null && obj === obj.window;
}
function getWindow(elem) {
	return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
}
function offset(elem) {
	var box = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};
	var doc = elem && elem.ownerDocument;
	var docElem = doc && doc.documentElement;
	if (!docElem) return box;
	if (_typeof(elem.getBoundingClientRect) !== "undefined") {
		box = elem.getBoundingClientRect();
	}
	var win = getWindow(doc);
	var top2 = box.top + win.pageYOffset - docElem.clientTop;
	var left = box.left + win.pageXOffset - docElem.clientLeft;
	return {
		top: top2,
		left,
		right: left + (box.right - box.left),
		bottom: top2 + (box.bottom - box.top),
	};
}
function getClickedElement(e) {
	if (
		e.srcElement &&
		e.srcElement.nodeType === 1 &&
		(e.srcElement.nodeName === "BUTTON" || e.srcElement.nodeName === "INPUT")
	) {
		if (
			e.srcElement.getAttribute &&
			e.srcElement.getAttribute("ignorelocizeeditor") === ""
		) {
			return null;
		}
		return e.srcElement;
	}
	var el;
	if (e.originalEvent && e.originalEvent.explicitOriginalTarget) {
		el = e.originalEvent.explicitOriginalTarget;
	} else {
		var parent = e.srcElement;
		if (parent.getAttribute && parent.getAttribute("ignorelocizeeditor") === "")
			return null;
		var left = e.pageX;
		var top2 = e.pageY;
		var topStartsAt = 0;
		var topBreaksAt;
		for (var i = 0; i < parent.childNodes.length; i++) {
			var n = parent.childNodes[i];
			var nOffset = offset(n);
			if (n.nodeType === 1 && nOffset.bottom < top2) topStartsAt = i + 1;
			if (!topBreaksAt && nOffset.top + (n.clientHeight || 0) > top2)
				topBreaksAt = i;
		}
		if (topStartsAt + 1 > parent.childNodes.length)
			topStartsAt = parent.childNodes.length - 1;
		if (!topBreaksAt) topBreaksAt = parent.childNodes.length;
		for (var y = topStartsAt; y < topBreaksAt; y++) {
			var _n = parent.childNodes[y];
			var _nOffset = offset(_n);
			if (_nOffset.left > left) {
				break;
			}
			if (_n && _n.nodeType !== 8) el = _n;
		}
	}
	return el;
}
function getElementText(el) {
	var str = el.textContent || (el.text && el.text.innerText) || el.placeholder;
	if (typeof str !== "string") return;
	return str.replace(/\n +/g, "").trim();
}
function getAttribute(el, name) {
	return el && el.getAttribute && el.getAttribute(name);
}
function getElementI18nKey(el) {
	var key = getAttribute(el, "data-i18n");
	if (key) return key;
	if (el.nodeType === window.Node.TEXT_NODE && el.parentElement) {
		return getElementI18nKey(el.parentElement);
	}
	return void 0;
}
function getElementNamespace(el) {
	var found;
	var find = function find2(ele) {
		var opts = getAttribute(ele, "i18next-options");
		if (!opts) opts = getAttribute(ele, "data-i18next-options");
		if (!opts) opts = getAttribute(ele, "i18n-options");
		if (!opts) opts = getAttribute(ele, "data-i18n-options");
		if (opts) {
			var jsonData = {};
			try {
				jsonData = JSON.parse(opts);
			} catch (e) {}
			if (jsonData.ns) found = jsonData.ns;
		}
		if (!found) found = getAttribute(ele, "i18next-ns");
		if (!found) found = getAttribute(ele, "data-i18next-ns");
		if (!found) found = getAttribute(ele, "i18n-ns");
		if (!found) found = getAttribute(ele, "data-i18n-ns");
		if (!found && ele.parentElement) find2(ele.parentElement);
	};
	find(el);
	return found;
}
function getQsParameterByName(name, url) {
	if (typeof window === "undefined") return null;
	if (!url) url = window.location.href.toLowerCase();
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
	var results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// node_modules/locize/dist/esm/ui/mouseDistance.js
var debouncedUpdateDistance = debounce(function (e, observer) {
	Object.values(store.data).forEach(function (item) {
		if (!isInViewport(item.node)) return;
		var distance = mouseDistanceFromElement(e, item.node);
		if (distance < 5) {
			highlight(item, item.node, item.keys);
		} else if (distance > 5) {
			var boxDistance = item.ribbonBox
				? mouseDistanceFromElement(e, item.ribbonBox)
				: 1e3;
			if (boxDistance > 10) resetHighlight(item, item.node, item.keys);
		}
	});
	Object.values(uninstrumentedStore.data).forEach(function (item) {
		if (!isInViewport(item.node)) return;
		var distance = mouseDistanceFromElement(e, item.node);
		if (distance < 10) {
			highlightUninstrumented(item, item.node, item.keys);
		} else if (distance > 10) {
			resetHighlight(item, item.node, item.keys);
		}
	});
}, 50);
var currentFC;
function startMouseTracking(observer) {
	currentFC = function handle(e) {
		debouncedUpdateDistance(e, observer);
	};
	document.addEventListener("mousemove", currentFC);
}
function stopMouseTracking() {
	document.removeEventListener("mousemove", currentFC);
}

// node_modules/locize/dist/esm/ui/elements/icons.js
var iconEdit =
	'<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="#FFFFFF"><g></g><g><g><g><path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z"/></g><g><path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z"/></g></g></g></svg>';
var i18nextIcon =
	'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 304" stroke="#000" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd">\n  <g stroke="none" class="B">\n    <path d="M 142 31.5 v 57.2 l 64.3 165.1 s 19.6 40.3 -36.5 50.1 h -128 s -52.3 -5.5 -39.8 -46.9 L 69.5 88.7 V 31.5 z" fill="#009688"/>\n    <path d="M 143.3 24.8 H 66.2 c -6.2 0 -11.3 -5.6 -11.3 -12.4 S 60 0 66.2 0 h 77.1 c 6.3 0 11.3 5.6 11.3 12.4 s -5.1 12.4 -11.3 12.4 z" class="C" fill="#004d40"/>\n    <path d="M 123 124.9 c 8.3 0 15 8.1 15 18.1 c 0 10 -6.8 18.1 -15 18.1 c -8.3 0 -15 -8.1 -15 -18.1 c 0 -10 6.7 -18.1 15 -18.1 z m -58.8 31.7 c 0 -8.5 5.6 -15.3 12.7 -15.3 s 12.7 6.8 12.7 15.3 s -5.6 15.3 -12.7 15.3 s -12.7 -6.8 -12.7 -15.3 z" fill="white"/>\n    <path d="M 147.7 84.9 V 57.7 s 34.5 -7.6 51.7 32.5 c 0 0 -26.9 19.6 -51.7 -5.3 z m -84.5 0 V 57.7 s -34.5 -7.6 -51.7 32.5 c 0 0 26.8 19.6 51.7 -5.3 z" class="C" fill="#004d40"/>\n    <path d="M 168.4 197.5 c -56.1 -17.4 -103.3 -8.1 -126.3 -1 l -23.2 56 c -10.5 33.4 33.2 37.8 33.2 37.8 h 106.9 c 46.9 -7.9 30.5 -40.4 30.5 -40.4 z" fill="white"/>\n    <path d="M 87.6 218.3 c 0 6 -8.1 10.9 -18.1 10.9 s -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 s 18.1 4.9 18.1 10.9 z m 64.4 0 c 0 6 -8.1 10.9 -18.1 10.9 c -10 0 -18.1 -4.9 -18.1 -10.9 c 0 -6.1 8.1 -10.9 18.1 -10.9 c 10 0 18.1 4.9 18.1 10.9 z" class="C" fill="#004d40"/>\n  </g>\n</svg>\n';
var locizeIcon =
	'\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.667 196" height="196" width="194.667" xml:space="preserve">\n  <defs>\n    <clipPath id="a" clipPathUnits="userSpaceOnUse">\n      <path d="M5.5 74.048C5.5 36.98 35.551 6.93 72.619 6.93c37.069 0 67.119 30.05 67.119 67.118 0 37.07-30.05 67.12-67.119 67.12-37.068 0-67.119-30.05-67.119-67.12"/>\n    </clipPath>\n    <clipPath id="b" clipPathUnits="userSpaceOnUse">\n      <path d="M0 147h146V0H0Z"/>\n    </clipPath>\n    <clipPath id="c" clipPathUnits="userSpaceOnUse">\n      <path d="M88.756 55.055h50.982l4.512 88.195-64 1.25z"/>\n    </clipPath>\n  </defs>\n  <g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 196)">\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0" transform="translate(13.926 109.38)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-.766-5.554 1.148-8.427 0-11.107-1.149-2.681-2.49-7.469-1.341-10.724 1.149-3.255 2.872-10.34 4.404-10.533 1.532-.19-1.148 7.66.383 5.171 1.533-2.49 1.533-6.193 4.214-8.746 2.68-2.553 6.319-2.17 9.192-4.658 2.872-2.49 5.744-6.129 8.425-5.746 0 0-.192-1.914-1.532-5.17-1.34-3.255-1.532-7.084.192-9.383 1.723-2.298 3.446-5.746 4.979-7.469 1.532-1.723 2.681-10.915 2.297-15.51-.382-4.596 1.724-14.937 6.511-17.236 4.787-2.298 0 1.15-.957 4.022-.958 2.872.739 9.575 3.052 10.533 2.309.958 4.416 4.787 6.139 7.469 1.724 2.68 6.128 3.83 7.469 7.084 1.341 3.255.766 7.085 1.532 8.809.766 1.724 2.873 5.554-1.724 7.852-4.595 2.298-6.51 1.148-6.702 3.255-.192 2.107-1.341 4.404-4.595 5.361-3.256.959-6.129 2.816-9.768 3.227-3.638.412-4.404-2.461-6.319-.928-1.914 1.531-3.446 3.064-4.213 4.978-.765 1.915-3.064.766-2.871 1.915.19 1.15 3.254 4.404-.193 3.255-3.446-1.148-6.51-.765-6.319 2.298.193 3.064 4.405 4.214 6.129 4.597 1.722.383 3.063-1.723 5.17-3.065 2.106-1.34.191 1.915 1.34 4.214 1.149 2.298 5.554 2.106 6.128 5.361.575 3.255-.191 5.937 3.256 6.32 3.446.383 7.084-.191 7.468 1.533.382 1.722-4.022-.576-4.213 1.531-.192 2.106 3.829 4.978 4.978 2.872 1.149-2.106 4.022-2.298 4.405-1.531.383.765 0 2.105-1.341 5.361-1.34 3.256-2.681 2.298-3.829 5.936-1.149 3.639-3.064-.191-4.979 1.724s-4.213 5.937-4.597 2.489c-.382-3.446-.382-5.361-2.105-8.042-1.724-2.682-2.489-.575-4.022 1.149-1.532 1.723-4.979 3.447-3.83 4.978C23.362 4.979 24.511 9 26.234 7.85c1.724-1.149 4.405-1.149 4.022.767-.383 1.914 0 2.681.766 3.638.766.958 3.447 2.682 3.447-.766 0-3.447-.384-4.405 2.298-4.788 2.681-.383 5.744-.574 5.554 1.149-.193 1.724.766 1.341 0 4.214-.767 2.873-3.065 3.063-5.554 4.405-2.489 1.34-3.83 3.446-5.936 2.68s-2.299-1.531-2.49-3.638c-.192-2.107-1.341-2.873-2.107-1.915-.765.957.192 4.022-2.68 2.106-2.873-1.914-4.021-5.171-5.553-2.872-1.533 2.297 2.297 6.319-1.724 4.595-4.022-1.723-6.895-3.637-4.788-4.404 2.107-.766 4.214-2.107 2.107-2.873-2.107-.765-6.32.575-7.852-.957C4.212 7.66 0 0 0 0Z" transform="translate(13.926 109.38)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0" transform="translate(36.522 130.061)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-.01-2.141.575-3.829 2.49-1.915C4.405 0 5.553 2.298 6.895 1.341c1.34-.958 3.638-.703 4.594-.639.959.064 1.15 2.937 3.831 2.554s1.724.574 4.596 2.107c2.873 1.532 9.001 4.212 2.681 3.446-6.32-.766-6.703.958-11.108-1.914-4.403-2.873-5.36-2.873-6.509-3.639-1.149-.766-2.49 2.298-4.022 0C-.575.958.011 2.182 0 0Z" transform="translate(36.522 130.061)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0" transform="translate(59.502 135.998)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-2.263-1.956-5.744-4.788-3.064-4.788 2.681 0 3.983 1.404 5.439-.447 1.456-1.85.88-4.723.88-6.063 0-1.341-.766-4.406 1.15-8.235 1.915-3.829 2.106-6.319 4.022-3.829 1.914 2.488 6.51 7.276 8.808 7.658 2.298.384 4.597 1.342 5.746 3.257 1.148 1.915 0 3.773 1.914 5.141 1.914 1.369 1.531 3.093 2.107 5.199C27.575 0 32.747 0 30.448 1.148c-2.297 1.15-6.51 1.916-11.49 1.341C13.979 1.915 4.213 3.638 0 0Z" transform="translate(59.502 135.998)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0" transform="translate(38.438 76.826)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-1.218-1.986-.575-2.107.766-2.49 1.34-.383-.575-2.68.957-2.872 1.532-.193 4.979-1.15 5.936 0 .959 1.148-1.531.7-3.255 1.977C2.682-2.107.865 1.41 0 0Z" transform="translate(38.438 76.826)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0" transform="translate(131.121 45.612)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-2.063-1.033-1.148-2.682-3.064-3.831-1.915-1.148-1.149-1.531-1.723-4.213-.575-2.68.191-4.212 1.532-2.106S2.298 1.148 0 0Z" transform="translate(131.121 45.612)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0m-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49m-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533M9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19" transform="translate(132.845 86.592)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-.575-.575-1.532 2.681-2.106 4.213-.575 1.532-.561 4.195 1.056 5.675C.964 11.734 0 7.469 0 5.17 0 2.873.574.575 0 0Zm-6.704 5.936c-1.341.766-3.828 0-6.892-.957-3.065-.958-.613 2.131.766 4.213 1.233 1.861.574-.574 3.256-.766 2.68-.192 4.213-3.256 2.87-2.49zm-4.402-6.511c-.192-1.531.574-4.021-3.639-3.064-4.213.958-4.213 3.256-5.936 1.533-1.723-1.724-3.83-3.255-6.32-.575C-29.49 0-29.107.766-30.447.958c-.955.135-4.138.846-6.792.074.206.123.426.285.663.5 1.915 1.723 1.532 2.298 3.638 4.213 2.108 1.916 3.639 3.638 5.171 1.916 1.532-1.725 4.788-2.108 3.639-4.023-1.149-1.914-.383-3.063.958-1.914 1.339 1.149 3.255 1.914 1.915 3.446-1.342 1.532-2.682 5.554-.766 2.873 1.915-2.681 2.489-4.022 3.637-5.553C-17.234.958-16.085 0-15.702.958c.383.957-.192 3.063.383 3.446.574.383 0-3.255 1.723-3.446 1.723-.192 2.681 0 2.49-1.533zM9.192-8.81c-.574 3.257-4.787 32.747-4.787 32.747s-11.299 7.277-13.213 5.746c-1.916-1.533-5.171-1.302-4.788.21s2.872 1.128-1.341 4.002c-4.212 2.873-4.978 5.362-8.233 1.724-3.257-3.639-4.022-6.703-5.937-7.661-1.915-.957-3.447-4.021-1.34-4.787 2.106-.765 2.298 0 4.02-1.531 1.725-1.533 4.023-1.149 4.406-.193.383.959.766 4.022.957 5.171.192 1.149 2.138 4.979 1.93 1.915-.207-3.064 2.665-3.064.75-5.17-1.914-2.106-.765-3.831-4.595-4.214-3.831-.382-4.022 1.915-6.128.766-2.107-1.148-1.915-1.915-2.681-3.063-.766-1.149-4.788-3.447-4.788-3.447s-3.255 1.149-1.724-.958c1.533-2.106 2.873-4.595 1.533-4.786-1.341-.192-4.98 1.914-4.98-.384s-.573-4.787.959-5.362c1.081-.405 1.783-1.284 2.775-1.161-.769-.332-1.468-.813-2.009-1.52-1.491-1.947-.575-5.362-3.639-6.511-3.063-1.15-3.063-2.489-3.639-4.979-.573-2.489 0-8.808.766-9.383.765-.574 2.107-5.362 5.363-4.978 3.256.383 6.702.53 7.851-.023 1.149-.551 3.063 1.171 3.638-3.233.575-4.404 1.915-4.979 2.681-7.277.766-2.297-.383-7.086 0-9.958s3.064-7.852 3.064-10.341c0-2.489 2.873-3.638 4.405-2.681 1.532.958 4.787 2.873 6.127 5.937 1.342 3.063 1.342 4.595 3.447 8.617 2.106 4.021 1.533 6.894 2.489 9.958.958 3.064 3.262 5.171 6.419 8.617 3.156 3.446 2.588 5.362 0 5.171-2.588-.191-4.314 2.297-5.654 5.361-1.338 3.065-2.87 10.724-1.721 8.235 1.149-2.491 3.446-9.384 5.744-10.533 2.298-1.149 6.512 1.953 7.469 3.083.957 1.131.574 4.385-1.916 5.726C.383-8.617 1.915-7.469 4.405-9c2.489-1.532 5.362-3.064 4.787.19z" transform="translate(132.845 86.592)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0" transform="translate(95.886 109.955)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-1.173-.353-2.106-2.681-1.532-3.831.576-1.148-.574.576-2.106-.382-1.533-.957-3.808-3.639-1.713-3.829 2.096-.193 1.713 1.531 3.628.765 1.915-.765 4.021-.575 4.021 1.34C2.298-4.021 1.915.574 0 0Z" transform="translate(95.886 109.955)"/>\n    <path style="fill:#2196f3;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0" transform="translate(83.44 118.763)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-1.154-.165-1.533-3.064.957-3.447 2.49-.383 6.947.575 5.293 2.107C4.596.191 2.682.383 0 0Z" transform="translate(83.44 118.763)"/>\n  </g>\n  <g clip-path="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 196)">\n    <path style="fill:none;stroke:#2196f3;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c0-37.068-30.05-67.119-67.119-67.119S-134.238-37.068-134.238 0c0 37.069 30.05 67.119 67.119 67.119S0 37.069 0 0Z" transform="translate(139.738 74.049)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:8;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c0-36.731-29.777-66.509-66.509-66.509S-133.019-36.731-133.019 0c0 36.733 29.778 66.51 66.51 66.51C-29.777 66.51 0 36.733 0 0Z" transform="translate(139.438 73.186)"/>\n  </g>\n  <g clip-path="url(#c)" transform="matrix(1.33333 0 0 -1.33333 0 196)">\n    <path style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754" transform="translate(119.64 109.307)"/>\n    <path style="fill:#fff;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0m12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754" transform="translate(119.64 109.307)"/>\n    <path style="fill:none;stroke:#2196f3;stroke-width:5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" d="M0 0c-1.542-1.541-3.386-2.311-5.533-2.311-2.148 0-3.991.77-5.532 2.311s-2.313 3.387-2.313 5.533c0 2.147.772 3.963 2.313 5.45 1.541 1.486 3.384 2.23 5.532 2.23 2.147 0 3.991-.744 5.533-2.23 1.54-1.487 2.312-3.303 2.312-5.45C2.312 3.387 1.54 1.541 0 0Zm12.551 23.039c-4.954 4.9-10.954 7.35-18.001 7.35-7.047 0-13.047-2.45-18.002-7.35-4.955-4.898-7.432-10.817-7.432-17.754 0-4.183 2.119-11.176 6.359-20.974 4.238-9.799 8.477-18.717 12.715-26.754 4.241-8.037 6.36-11.946 6.36-11.727.66 1.211 1.568 2.863 2.724 4.955 1.157 2.092 3.194 6.029 6.112 11.809 2.917 5.781 5.477 11.094 7.678 15.935a203.312 203.312 0 0 1 6.111 15.032c1.873 5.173 2.807 9.082 2.807 11.724 0 6.937-2.477 12.856-7.431 17.754z" transform="translate(119.64 109.307)"/>\n  </g>\n</svg>\n';
var minimizeIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h12v2H6v-2z"/></svg>';
var editIconUrl = URL.createObjectURL(
	new Blob([iconEdit], {
		type: "image/svg+xml",
	}),
);
var i18nextIconUrl = URL.createObjectURL(
	new Blob([i18nextIcon], {
		type: "image/svg+xml",
	}),
);
var minimizeIconUrl = URL.createObjectURL(
	new Blob([minimizeIcon], {
		type: "image/svg+xml",
	}),
);
var locizeIconUrl = URL.createObjectURL(
	new Blob([locizeIcon], {
		type: "image/svg+xml",
	}),
);
function EditIcon() {
	var image = document.createElement("img");
	image.setAttribute("data-i18next-editor-element", "true");
	image.src = editIconUrl;
	image.style.width = "15px";
	return image;
}
function RibbonLogo() {
	var circleSize =
		arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "18px";
	var logoSize =
		arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "15px";
	var ribbon = document.createElement("div");
	ribbon.setAttribute("data-i18next-editor-element", "true");
	ribbon.style =
		"display: inline-flex; align-items: center; justify-content: center; width: "
			.concat(circleSize, "; height: ")
			.concat(circleSize, "; box-shadow: inset 0 0 5px ")
			.concat(colors.highlight, "; border: 2px solid ")
			.concat(colors.highlight, "; border-radius: 50%");
	var image = document.createElement("img");
	image.src = i18nextIconUrl;
	image.style.width = logoSize;
	ribbon.appendChild(image);
	return ribbon;
}

// node_modules/locize/dist/esm/ui/elements/popup.js
if (sheet) {
	sheet.insertRule(
		"@keyframes i18next-editor-animate-top { \n      from {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n      to {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n    }",
	);
	sheet.insertRule(
		"@keyframes i18next-editor-animate-bottom { \n      from {\n        top: var(--i18next-editor-popup-position-top);\n        left: var(--i18next-editor-popup-position-left);\n        opacity: 1;\n      }\n      to {\n        top: calc(100vh + 600px); \n        left: calc(100vw + 300px);\n        opacity: 0;\n      }\n    }",
	);
	sheet.insertRule(
		".i18next-editor-popup * { \n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none; /* Safari */\n      -khtml-user-select: none; /* Konqueror HTML */\n      -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */\n    }",
	);
	sheet.insertRule(
		".i18next-editor-popup .resizer-right {\n      width: 15px;\n      height: 100%;\n      background: transparent;\n      position: absolute;\n      right: -15px;\n      bottom: 0;\n      cursor: e-resize;\n    }",
	);
	sheet.insertRule(
		".i18next-editor-popup .resizer-both {\n      width: 15px;\n      height: 15px;\n      background: transparent;\n      z-index: 10;\n      position: absolute;\n      right: -15px;\n      bottom: -15px;\n      cursor: se-resize;\n    }",
	);
	sheet.insertRule(
		".i18next-editor-popup .resizer-bottom {\n      width: 100%;\n      height: 15px;\n      background: transparent;\n      position: absolute;\n      right: 0;\n      bottom: -15px;\n      cursor: s-resize;\n    }",
	);
}
function Ribbon(popupEle, onMaximize) {
	var ribbon = document.createElement("div");
	ribbon.setAttribute("data-i18next-editor-element", "true");
	ribbon.style =
		"\n  cursor: pointer;\n  position: fixed;\n  bottom: 25px;\n  right: 25px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  background-color:  rgba(249, 249, 249, 0.2);\n  backdrop-filter: blur(3px);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);\n  border-radius: 50%\n  ";
	ribbon.onclick = function () {
		onMaximize();
	};
	var image = document.createElement("img");
	image.src = locizeIconUrl;
	image.style.width = "45px";
	ribbon.appendChild(image);
	return ribbon;
}
function Minimize(popupEle, onMinimize) {
	var image = document.createElement("img");
	image.setAttribute("data-i18next-editor-element", "true");
	image.src = minimizeIconUrl;
	image.style.width = "24px";
	image.style.cursor = "pointer";
	image.onclick = function () {
		popupEle.style.setProperty(
			"--i18next-editor-popup-position-top",
			popupEle.style.top,
		);
		popupEle.style.setProperty(
			"--i18next-editor-popup-position-left",
			popupEle.style.left,
		);
		popupEle.style.animation = "i18next-editor-animate-bottom 2s forwards";
		onMinimize();
	};
	return image;
}
var popupId = "i18next-editor-popup";
function Popup(url, cb) {
	var popup = document.createElement("div");
	popup.setAttribute("id", popupId);
	popup.classList.add("i18next-editor-popup");
	popup.style =
		"\n  z-index: 9;\n  background-color: transparent;\n  border: 1px solid rgba(200, 200, 200, 0.9);\n  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  --i18next-editor-popup-height: 200px;\n  height: var(--i18next-editor-popup-height);\n  min-height: 150px;\n  min-width: 300px;\n  --i18next-editor-popup-width: 400px;\n  width: var(--i18next-editor-popup-width);\n  max-height: 600px;\n  max-width: 800px;\n\n  position: fixed;\n  --i18next-editor-popup-position-top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  top: calc(100vh - var(--i18next-editor-popup-height) - 10px);\n  --i18next-editor-popup-position-left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n  left: calc(100vw - var(--i18next-editor-popup-width) - 10px);\n\n  overflow: visible;\n  ";
	popup.setAttribute("data-i18next-editor-element", "true");
	var header = document.createElement("div");
	header.classList.add("i18next-editor-popup-header");
	header.style =
		"\n  padding: 2px 10px;\n  cursor: move;\n  z-index: 10;\n  backdrop-filter: blur(3px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(200, 200, 200, 0.6), rgba(200, 200, 200, 0.5));\n  color: #fff;\n  text-align: right;\n  ";
	popup.appendChild(header);
	header.appendChild(
		Minimize(popup, function () {
			var ribbon = Ribbon(popup, function () {
				popup.style.animation = "i18next-editor-animate-top 1s";
				startMouseTracking();
				setTimeout(function () {
					document.body.removeChild(ribbon);
				}, 1e3);
			});
			document.body.appendChild(ribbon);
			stopMouseTracking();
		}),
	);
	var iframe = document.createElement("iframe");
	iframe.setAttribute("id", "i18next-editor-iframe");
	iframe.setAttribute("data-i18next-editor-element", "true");
	iframe.style =
		"\n    z-index: 100;\n    width: 100%;\n    height: calc(100% - 28px);\n    border: none;\n    background: #fff;\n  ";
	iframe.setAttribute("src", url);
	iframe.addEventListener("load", cb);
	popup.appendChild(iframe);
	var overlay = document.createElement("div");
	overlay.setAttribute("id", "i18next-editor-popup-overlay");
	overlay.setAttribute("data-i18next-editor-element", "true");
	overlay.style =
		"\n  display: none;\n  position: absolute;\n  top: 32px;\n  z-index: 101;\n  width: 100%;\n  height: calc(100% - 32px);\n  background-color: rgba(200, 200, 200, 0.5);\n  background: linear-gradient(0deg, rgba(240, 240, 240, 0.6), rgba(255, 255, 255, 0.5));\n  backdrop-filter: blur(2px);\n";
	popup.appendChild(overlay);
	return popup;
}

// node_modules/locize/dist/esm/api/handleRequestPopupChanges.js
function handler5(payload) {
	var containerStyle = payload.containerStyle;
	if (containerStyle) {
		var popup = document.getElementById(popupId);
		if (containerStyle.height) {
			var diff = "calc("
				.concat(containerStyle.height, " - ")
				.concat(popup.style.height, ")");
			popup.style.setProperty(
				"top",
				"calc(".concat(popup.style.top, " - ").concat(diff, ")"),
			);
			popup.style.setProperty("height", containerStyle.height);
		}
		if (containerStyle.width) {
			var _diff = "calc("
				.concat(containerStyle.width, " - ")
				.concat(popup.style.width, ")");
			popup.style.setProperty(
				"left",
				"calc(".concat(popup.style.left, " - ").concat(_diff, ")"),
			);
			popup.style.setProperty("width", containerStyle.width);
		}
	}
}
api.addHandler("requestPopupChanges", handler5);

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r)
		if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
	return t;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o,
		r,
		i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++)
			(o = n[r]),
				-1 === t.indexOf(o) &&
					{}.propertyIsEnumerable.call(e, o) &&
					(i[o] = e[o]);
	}
	return i;
}

// node_modules/locize/dist/esm/api/handleRequestResourceBundle.js
var _excluded = ["lng", "ns"];
function ownKeys4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys4(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys4(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
function handler6(payload) {
	var lng = payload.lng,
		ns = payload.ns,
		rest = _objectWithoutProperties(payload, _excluded);
	api.i18n.getResourceBundle(lng, ns, function (resources) {
		api.confirmResourceBundle(
			_objectSpread4(
				{
					resources,
					lng,
					ns,
				},
				rest,
			),
		);
	});
}
api.addHandler("requestResourceBundle", handler6);

// node_modules/locize/dist/esm/api/handleSelectedKeys.js
var previousMatches = [];
function handler7(payload) {
	var keys = payload.keys;
	var matchingItems = [];
	Object.values(store.data).forEach(function (item) {
		var matches = Object.values(item.keys).filter(function (k) {
			return keys.includes(k.qualifiedKey);
		});
		if (matches.length) {
			matchingItems.push(item);
		}
	});
	previousMatches.forEach(function (item) {
		resetHighlight(item, item.node, item.keys, false);
	});
	matchingItems.forEach(function (item) {
		selectedHighlight(item, item.node, item.keys);
	});
	previousMatches = matchingItems;
}
api.addHandler("selectedKeys", handler7);

// node_modules/locize/dist/esm/api/handleIsLocizeEnabled.js
function handler8(payload, e) {
	api.source = e.source;
	api.origin = e.origin;
	api.legacy = true;
	api.sendLocizeIsEnabled();
}
api.addHandler("isLocizeEnabled", handler8);

// node_modules/locize/dist/esm/api/handleTurnOn.js
function handler9(payload, e) {
	api.turnOn();
}
api.addHandler("turnOn", handler9);

// node_modules/locize/dist/esm/api/handleTurnOff.js
function handler10(payload, e) {
	api.turnOff();
}
api.addHandler("turnOff", handler10);

// node_modules/locize/dist/esm/ui/elements/ribbonBox.js
if (sheet) {
	sheet.insertRule(
		".i18next-editor-button:hover { background-color: rgba(38, 166, 154, 1) !important; }",
	);
}
function RibbonButton(text, attrTitle, onClick) {
	var btn = document.createElement("button");
	btn.style =
		"font-family: Arial; position: relative; backdrop-filter: blur(3px); cursor: pointer; padding: 2px 10px 2px 20px; font-size: 15px; font-weight: 300; text-transform: uppercase; color: #fff; background-color: rgba(38, 166, 154, 0.8); border: none; border-radius: 12px";
	btn.classList.add("i18next-editor-button");
	btn.setAttribute("data-i18next-editor-element", "true");
	btn.setAttribute("title", attrTitle);
	var icon = EditIcon();
	icon.style = "position: absolute; left: 4px; top: 3px;";
	icon.style.width = "15px";
	btn.appendChild(icon);
	var span = document.createElement("span");
	span.textContent = text;
	btn.appendChild(span);
	btn.onclick = onClick;
	return btn;
}
function RibbonBox() {
	var keys =
		arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	var box = document.createElement("div");
	box.style =
		"position: absolute; top: 0; left: 0; display: flex; align-items: flex-start; justify-content: center; filter: drop-shadow(0px 0px 20px #aaa );";
	box.setAttribute("data-i18next-editor-element", "true");
	var arrow3 = document.createElement("div");
	arrow3.style =
		"\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-top-width: 7px;\n    border-bottom-width: 7px;\n    border-left-width: 10px;\n    border-right-width: 10px;\n    border-style: solid;\n    border-color: transparent ".concat(
			colors.highlight,
			" transparent\n      transparent;\n    ",
		);
	box.appendChild(arrow3);
	var logo = RibbonLogo();
	box.appendChild(logo);
	var btnbox = document.createElement("div");
	btnbox.style =
		"display: flex; flex-direction: column; align-items: flex-start; margin-left: 2px; margin-top: 1px";
	Object.keys(keys).forEach(function (k) {
		var data3 = keys[k];
		var btn = RibbonButton(
			k.replace("attr:", ""),
			"".concat(data3.ns, ":").concat(data3.key),
			function () {
				api.selectKey(data3);
			},
		);
		btn.style.marginBottom = "2px";
		btnbox.appendChild(btn);
	});
	box.appendChild(btnbox);
	return {
		box,
		arrow: arrow3,
	};
}

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce(
	(acc, side) =>
		acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]),
	[],
);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var createCoords = (v) => ({
	x: v,
	y: v,
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom",
};
var oppositeAlignmentMap = {
	start: "end",
	end: "start",
};
function clamp(start2, value, end) {
	return max(start2, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) {
		rtl = false;
	}
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide =
		alignmentAxis === "x"
			? alignment === (rtl ? "end" : "start")
				? "right"
				: "left"
			: alignment === "start"
				? "bottom"
				: "top";
	if (rects.reference[length] > rects.floating[length]) {
		mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	}
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement),
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.replace(
		/start|end/g,
		(alignment) => oppositeAlignmentMap[alignment],
	);
}
function getSideList(side, isStart, rtl) {
	const lr = ["left", "right"];
	const rl = ["right", "left"];
	const tb = ["top", "bottom"];
	const bt = ["bottom", "top"];
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rl : lr;
			return isStart ? lr : rl;
		case "left":
		case "right":
			return isStart ? tb : bt;
		default:
			return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) {
			list = list.concat(list.map(getOppositeAlignmentPlacement));
		}
	}
	return list;
}
function getOppositePlacement(placement) {
	return placement.replace(
		/left|right|bottom|top/g,
		(side) => oppositeSideMap[side],
	);
}
function expandPaddingObject(padding) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...padding,
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number"
		? expandPaddingObject(padding)
		: {
				top: padding,
				right: padding,
				bottom: padding,
				left: padding,
			};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y,
	};
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height,
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height,
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY,
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY,
			};
			break;
		default:
			coords = {
				x: reference.x,
				y: reference.y,
			};
	}
	switch (getAlignment(placement)) {
		case "start":
			coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
			break;
		case "end":
			coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
			break;
	}
	return coords;
}
var computePosition = async (reference, floating, config) => {
	const {
		placement = "bottom",
		strategy = "absolute",
		middleware = [],
		platform: platform2,
	} = config;
	const validMiddleware = middleware.filter(Boolean);
	const rtl = await (platform2.isRTL == null
		? void 0
		: platform2.isRTL(floating));
	let rects = await platform2.getElementRects({
		reference,
		floating,
		strategy,
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let middlewareData = {};
	let resetCount = 0;
	for (let i = 0; i < validMiddleware.length; i++) {
		const { name, fn } = validMiddleware[i];
		const {
			x: nextX,
			y: nextY,
			data: data3,
			reset,
		} = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platform2,
			elements: {
				reference,
				floating,
			},
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData = {
			...middlewareData,
			[name]: {
				...middlewareData[name],
				...data3,
			},
		};
		if (reset && resetCount <= 50) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) {
					statefulPlacement = reset.placement;
				}
				if (reset.rects) {
					rects =
						reset.rects === true
							? await platform2.getElementRects({
									reference,
									floating,
									strategy,
								})
							: reset.rects;
				}
				({ x, y } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData,
	};
};
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) {
		options = {};
	}
	const { x, y, platform: platform2, rects, elements, strategy } = state;
	const {
		boundary = "clippingAncestors",
		rootBoundary = "viewport",
		elementContext = "floating",
		altBoundary = false,
		padding = 0,
	} = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const altContext = elementContext === "floating" ? "reference" : "floating";
	const element = elements[altBoundary ? altContext : elementContext];
	const clippingClientRect = rectToClientRect(
		await platform2.getClippingRect({
			element: (
				(_await$platform$isEle = await (platform2.isElement == null
					? void 0
					: platform2.isElement(element))) != null
					? _await$platform$isEle
					: true
			)
				? element
				: element.contextElement ||
					(await (platform2.getDocumentElement == null
						? void 0
						: platform2.getDocumentElement(elements.floating))),
			boundary,
			rootBoundary,
			strategy,
		}),
	);
	const rect =
		elementContext === "floating"
			? {
					x,
					y,
					width: rects.floating.width,
					height: rects.floating.height,
				}
			: rects.reference;
	const offsetParent = await (platform2.getOffsetParent == null
		? void 0
		: platform2.getOffsetParent(elements.floating));
	const offsetScale = (await (platform2.isElement == null
		? void 0
		: platform2.isElement(offsetParent)))
		? (await (platform2.getScale == null
				? void 0
				: platform2.getScale(offsetParent))) || {
				x: 1,
				y: 1,
			}
		: {
				x: 1,
				y: 1,
			};
	const elementClientRect = rectToClientRect(
		platform2.convertOffsetParentRelativeRectToViewportRelativeRect
			? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
					elements,
					rect,
					offsetParent,
					strategy,
				})
			: rect,
	);
	return {
		top:
			(clippingClientRect.top - elementClientRect.top + paddingObject.top) /
			offsetScale.y,
		bottom:
			(elementClientRect.bottom -
				clippingClientRect.bottom +
				paddingObject.bottom) /
			offsetScale.y,
		left:
			(clippingClientRect.left - elementClientRect.left + paddingObject.left) /
			offsetScale.x,
		right:
			(elementClientRect.right -
				clippingClientRect.right +
				paddingObject.right) /
			offsetScale.x,
	};
}
var arrow = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const {
			x,
			y,
			placement,
			rects,
			platform: platform2,
			elements,
			middlewareData,
		} = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) {
			return {};
		}
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y,
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform2.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff =
			rects.reference[length] +
			rects.reference[axis] -
			coords[axis] -
			rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform2.getOffsetParent == null
			? void 0
			: platform2.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (
			!clientSize ||
			!(await (platform2.isElement == null
				? void 0
				: platform2.isElement(arrowOffsetParent)))
		) {
			clientSize = elements.floating[clientProp] || rects.floating[length];
		}
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding =
			clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const min$1 = minPadding;
		const max2 = clientSize - arrowDimensions[length] - maxPadding;
		const center =
			clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset4 = clamp(min$1, center, max2);
		const shouldAddOffset =
			!middlewareData.arrow &&
			getAlignment(placement) != null &&
			center !== offset4 &&
			rects.reference[length] / 2 -
				(center < min$1 ? minPadding : maxPadding) -
				arrowDimensions[length] / 2 <
				0;
		const alignmentOffset = shouldAddOffset
			? center < min$1
				? center - min$1
				: center - max2
			: 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset4,
				centerOffset: center - offset4 - alignmentOffset,
				...(shouldAddOffset && {
					alignmentOffset,
				}),
			},
			reset: shouldAddOffset,
		};
	},
});
var flip = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const {
				placement,
				middlewareData,
				rects,
				initialPlacement,
				platform: platform2,
				elements,
			} = state;
			const {
				mainAxis: checkMainAxis = true,
				crossAxis: checkCrossAxis = true,
				fallbackPlacements: specifiedFallbackPlacements,
				fallbackStrategy = "bestFit",
				fallbackAxisSideDirection = "none",
				flipAlignment = true,
				...detectOverflowOptions
			} = evaluate(options, state);
			if (
				(_middlewareData$arrow = middlewareData.arrow) != null &&
				_middlewareData$arrow.alignmentOffset
			) {
				return {};
			}
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform2.isRTL == null
				? void 0
				: platform2.isRTL(elements.floating));
			const fallbackPlacements =
				specifiedFallbackPlacements ||
				(isBasePlacement || !flipAlignment
					? [getOppositePlacement(initialPlacement)]
					: getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
				fallbackPlacements.push(
					...getOppositeAxisPlacements(
						initialPlacement,
						flipAlignment,
						fallbackAxisSideDirection,
						rtl,
					),
				);
			}
			const placements2 = [initialPlacement, ...fallbackPlacements];
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData =
				((_middlewareData$flip = middlewareData.flip) == null
					? void 0
					: _middlewareData$flip.overflows) || [];
			if (checkMainAxis) {
				overflows.push(overflow[side]);
			}
			if (checkCrossAxis) {
				const sides2 = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
			}
			overflowsData = [
				...overflowsData,
				{
					placement,
					overflows,
				},
			];
			if (!overflows.every((side2) => side2 <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex =
					(((_middlewareData$flip2 = middlewareData.flip) == null
						? void 0
						: _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements2[nextIndex];
				if (nextPlacement) {
					return {
						data: {
							index: nextIndex,
							overflows: overflowsData,
						},
						reset: {
							placement: nextPlacement,
						},
					};
				}
				let resetPlacement =
					(_overflowsData$filter = overflowsData
						.filter((d) => d.overflows[0] <= 0)
						.sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null
						? void 0
						: _overflowsData$filter.placement;
				if (!resetPlacement) {
					switch (fallbackStrategy) {
						case "bestFit": {
							var _overflowsData$filter2;
							const placement2 =
								(_overflowsData$filter2 = overflowsData
									.filter((d) => {
										if (hasFallbackAxisSideDirection) {
											const currentSideAxis = getSideAxis(d.placement);
											return (
												currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
												// reading directions favoring greater width.
												currentSideAxis === "y"
											);
										}
										return true;
									})
									.map((d) => [
										d.placement,
										d.overflows
											.filter((overflow2) => overflow2 > 0)
											.reduce((acc, overflow2) => acc + overflow2, 0),
									])
									.sort((a, b) => a[1] - b[1])[0]) == null
									? void 0
									: _overflowsData$filter2[0];
							if (placement2) {
								resetPlacement = placement2;
							}
							break;
						}
						case "initialPlacement":
							resetPlacement = initialPlacement;
							break;
					}
				}
				if (placement !== resetPlacement) {
					return {
						reset: {
							placement: resetPlacement,
						},
					};
				}
			}
			return {};
		},
	};
};
async function convertValueToCoords(state, options) {
	const { placement, platform: platform2, elements } = state;
	const rtl = await (platform2.isRTL == null
		? void 0
		: platform2.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } =
		typeof rawValue === "number"
			? {
					mainAxis: rawValue,
					crossAxis: 0,
					alignmentAxis: null,
				}
			: {
					mainAxis: rawValue.mainAxis || 0,
					crossAxis: rawValue.crossAxis || 0,
					alignmentAxis: rawValue.alignmentAxis,
				};
	if (alignment && typeof alignmentAxis === "number") {
		crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	}
	return isVertical
		? {
				x: crossAxis * crossAxisMulti,
				y: mainAxis * mainAxisMulti,
			}
		: {
				x: mainAxis * mainAxisMulti,
				y: crossAxis * crossAxisMulti,
			};
}
var offset2 = function (options) {
	if (options === void 0) {
		options = 0;
	}
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (
				placement ===
					((_middlewareData$offse = middlewareData.offset) == null
						? void 0
						: _middlewareData$offse.placement) &&
				(_middlewareData$arrow = middlewareData.arrow) != null &&
				_middlewareData$arrow.alignmentOffset
			) {
				return {};
			}
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement,
				},
			};
		},
	};
};
var shift = function (options) {
	if (options === void 0) {
		options = {};
	}
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement } = state;
			const {
				mainAxis: checkMainAxis = true,
				crossAxis: checkCrossAxis = false,
				limiter = {
					fn: (_ref) => {
						let { x: x2, y: y2 } = _ref;
						return {
							x: x2,
							y: y2,
						};
					},
				},
				...detectOverflowOptions
			} = evaluate(options, state);
			const coords = {
				x,
				y,
			};
			const overflow = await detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(getSide(placement));
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			if (checkMainAxis) {
				const minSide = mainAxis === "y" ? "top" : "left";
				const maxSide = mainAxis === "y" ? "bottom" : "right";
				const min2 = mainAxisCoord + overflow[minSide];
				const max2 = mainAxisCoord - overflow[maxSide];
				mainAxisCoord = clamp(min2, mainAxisCoord, max2);
			}
			if (checkCrossAxis) {
				const minSide = crossAxis === "y" ? "top" : "left";
				const maxSide = crossAxis === "y" ? "bottom" : "right";
				const min2 = crossAxisCoord + overflow[minSide];
				const max2 = crossAxisCoord - overflow[maxSide];
				crossAxisCoord = clamp(min2, crossAxisCoord, max2);
			}
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord,
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis,
					},
				},
			};
		},
	};
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) {
		return (node.nodeName || "").toLowerCase();
	}
	return "#document";
}
function getWindow2(node) {
	var _node$ownerDocument;
	return (
		(node == null || (_node$ownerDocument = node.ownerDocument) == null
			? void 0
			: _node$ownerDocument.defaultView) || window
	);
}
function getDocumentElement(node) {
	var _ref;
	return (_ref =
		(isNode(node) ? node.ownerDocument : node.document) || window.document) ==
		null
		? void 0
		: _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) {
		return false;
	}
	return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
	if (!hasWindow()) {
		return false;
	}
	return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) {
		return false;
	}
	return (
		value instanceof HTMLElement ||
		value instanceof getWindow2(value).HTMLElement
	);
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") {
		return false;
	}
	return (
		value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot
	);
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
	return (
		/auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
		!["inline", "contents"].includes(display)
	);
}
function isTableElement(element) {
	return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
	return [":popover-open", ":modal"].some((selector) => {
		try {
			return element.matches(selector);
		} catch (e) {
			return false;
		}
	});
}
function isContainingBlock(elementOrCss) {
	const webkit = isWebKit();
	const css = isElement(elementOrCss)
		? getComputedStyle(elementOrCss)
		: elementOrCss;
	return (
		["transform", "translate", "scale", "rotate", "perspective"].some(
			(value) => (css[value] ? css[value] !== "none" : false),
		) ||
		(css.containerType ? css.containerType !== "normal" : false) ||
		(!webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false)) ||
		(!webkit && (css.filter ? css.filter !== "none" : false)) ||
		["transform", "translate", "scale", "rotate", "perspective", "filter"].some(
			(value) => (css.willChange || "").includes(value),
		) ||
		["paint", "layout", "strict", "content"].some((value) =>
			(css.contain || "").includes(value),
		)
	);
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) {
			return currentNode;
		} else if (isTopLayer(currentNode)) {
			return null;
		}
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (typeof CSS === "undefined" || !CSS.supports) return false;
	return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
	return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element) {
	return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) {
		return {
			scrollLeft: element.scrollLeft,
			scrollTop: element.scrollTop,
		};
	}
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY,
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") {
		return node;
	}
	const result =
		// Step into the shadow DOM of the parent of a slotted node.
		node.assignedSlot || // DOM Element detected.
		node.parentNode || // ShadowRoot detected.
		(isShadowRoot(node) && node.host) || // Fallback.
		getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) {
		return node.ownerDocument ? node.ownerDocument.body : node.body;
	}
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
		return parentNode;
	}
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) {
		list = [];
	}
	if (traverseIframes === void 0) {
		traverseIframes = true;
	}
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody =
		scrollableAncestor ===
		((_node$ownerDocument2 = node.ownerDocument) == null
			? void 0
			: _node$ownerDocument2.body);
	const win = getWindow2(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(
			win,
			win.visualViewport || [],
			isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
			frameElement && traverseIframes ? getOverflowAncestors(frameElement) : [],
		);
	}
	return list.concat(
		scrollableAncestor,
		getOverflowAncestors(scrollableAncestor, [], traverseIframes),
	);
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent)
		? win.frameElement
		: null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback =
		round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback,
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) {
		return createCoords(1);
	}
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) {
		x = 1;
	}
	if (!y || !Number.isFinite(y)) {
		y = 1;
	}
	return {
		x,
		y,
	};
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow2(element);
	if (!isWebKit() || !win.visualViewport) {
		return noOffsets;
	}
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop,
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) {
		isFixed = false;
	}
	if (
		!floatingOffsetParent ||
		(isFixed && floatingOffsetParent !== getWindow2(element))
	) {
		return false;
	}
	return isFixed;
}
function getBoundingClientRect(
	element,
	includeScale,
	isFixedStrategy,
	offsetParent,
) {
	if (includeScale === void 0) {
		includeScale = false;
	}
	if (isFixedStrategy === void 0) {
		isFixedStrategy = false;
	}
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) {
				scale = getScale(offsetParent);
			}
		} else {
			scale = getScale(element);
		}
	}
	const visualOffsets = shouldAddVisualOffsets(
		domElement,
		isFixedStrategy,
		offsetParent,
	)
		? getVisualOffsets(domElement)
		: createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement) {
		const win = getWindow2(domElement);
		const offsetWin =
			offsetParent && isElement(offsetParent)
				? getWindow2(offsetParent)
				: offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetParent && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle(currentIFrame);
			const left =
				iframeRect.left +
				(currentIFrame.clientLeft + parseFloat(css.paddingLeft)) *
					iframeScale.x;
			const top2 =
				iframeRect.top +
				(currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top2;
			currentWin = getWindow2(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y,
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) {
		return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	}
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
	if (ignoreScrollbarX === void 0) {
		ignoreScrollbarX = false;
	}
	const htmlRect = documentElement.getBoundingClientRect();
	const x =
		htmlRect.left +
		scroll.scrollLeft -
		(ignoreScrollbarX
			? 0
			: // RTL <body> scrollbar.
				getWindowScrollBarX(documentElement, htmlRect));
	const y = htmlRect.top + scroll.scrollTop;
	return {
		x,
		y,
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || (topLayer && isFixed)) {
		return rect;
	}
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0,
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
		if (
			getNodeName(offsetParent) !== "body" ||
			isOverflowElement(documentElement)
		) {
			scroll = getNodeScroll(offsetParent);
		}
		if (isHTMLElement(offsetParent)) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset =
		documentElement && !isOffsetParentAnElement && !isFixed
			? getHTMLOffset(documentElement, scroll, true)
			: createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x:
			rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
	};
}
function getClientRects(element) {
	return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
	const html = getDocumentElement(element);
	const scroll = getNodeScroll(element);
	const body = element.ownerDocument.body;
	const width = max(
		html.scrollWidth,
		html.clientWidth,
		body.scrollWidth,
		body.clientWidth,
	);
	const height = max(
		html.scrollHeight,
		html.clientHeight,
		body.scrollHeight,
		body.clientHeight,
	);
	let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	const y = -scroll.scrollTop;
	if (getComputedStyle(body).direction === "rtl") {
		x += max(html.clientWidth, body.clientWidth) - width;
	}
	return {
		width,
		height,
		x,
		y,
	};
}
function getViewportRect(element, strategy) {
	const win = getWindow2(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		width = visualViewport.width;
		height = visualViewport.height;
		const visualViewportBased = isWebKit();
		if (!visualViewportBased || (visualViewportBased && strategy === "fixed")) {
			x = visualViewport.offsetLeft;
			y = visualViewport.offsetTop;
		}
	}
	return {
		width,
		height,
		x,
		y,
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top2 = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	const width = element.clientWidth * scale.x;
	const height = element.clientHeight * scale.y;
	const x = left * scale.x;
	const y = top2 * scale.y;
	return {
		width,
		height,
		x,
		y,
	};
}
function getClientRectFromClippingAncestor(
	element,
	clippingAncestor,
	strategy,
) {
	let rect;
	if (clippingAncestor === "viewport") {
		rect = getViewportRect(element, strategy);
	} else if (clippingAncestor === "document") {
		rect = getDocumentRect(getDocumentElement(element));
	} else if (isElement(clippingAncestor)) {
		rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	} else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height,
		};
	}
	return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
	const parentNode = getParentNode(element);
	if (
		parentNode === stopNode ||
		!isElement(parentNode) ||
		isLastTraversableNode(parentNode)
	) {
		return false;
	}
	return (
		getComputedStyle(parentNode).position === "fixed" ||
		hasFixedPositionAncestor(parentNode, stopNode)
	);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) {
		return cachedResult;
	}
	let result = getOverflowAncestors(element, [], false).filter(
		(el) => isElement(el) && getNodeName(el) !== "body",
	);
	let currentContainingBlockComputedStyle = null;
	const elementIsFixed = getComputedStyle(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		if (!currentNodeIsContaining && computedStyle.position === "fixed") {
			currentContainingBlockComputedStyle = null;
		}
		const shouldDropCurrentNode = elementIsFixed
			? !currentNodeIsContaining && !currentContainingBlockComputedStyle
			: (!currentNodeIsContaining &&
					computedStyle.position === "static" &&
					!!currentContainingBlockComputedStyle &&
					["absolute", "fixed"].includes(
						currentContainingBlockComputedStyle.position,
					)) ||
				(isOverflowElement(currentNode) &&
					!currentNodeIsContaining &&
					hasFixedPositionAncestor(element, currentNode));
		if (shouldDropCurrentNode) {
			result = result.filter((ancestor) => ancestor !== currentNode);
		} else {
			currentContainingBlockComputedStyle = computedStyle;
		}
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const elementClippingAncestors =
		boundary === "clippingAncestors"
			? isTopLayer(element)
				? []
				: getClippingElementAncestors(element, this._c)
			: [].concat(boundary);
	const clippingAncestors = [...elementClippingAncestors, rootBoundary];
	const firstClippingAncestor = clippingAncestors[0];
	const clippingRect = clippingAncestors.reduce(
		(accRect, clippingAncestor) => {
			const rect = getClientRectFromClippingAncestor(
				element,
				clippingAncestor,
				strategy,
			);
			accRect.top = max(rect.top, accRect.top);
			accRect.right = min(rect.right, accRect.right);
			accRect.bottom = min(rect.bottom, accRect.bottom);
			accRect.left = max(rect.left, accRect.left);
			return accRect;
		},
		getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy),
	);
	return {
		width: clippingRect.right - clippingRect.left,
		height: clippingRect.bottom - clippingRect.top,
		x: clippingRect.left,
		y: clippingRect.top,
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height,
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0,
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
		if (
			getNodeName(offsetParent) !== "body" ||
			isOverflowElement(documentElement)
		) {
			scroll = getNodeScroll(offsetParent);
		}
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(
				offsetParent,
				true,
				isFixed,
				offsetParent,
			);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		} else if (documentElement) {
			offsets.x = getWindowScrollBarX(documentElement);
		}
	}
	const htmlOffset =
		documentElement && !isOffsetParentAnElement && !isFixed
			? getHTMLOffset(documentElement, scroll)
			: createCoords(0);
	const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
	const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
	return {
		x,
		y,
		width: rect.width,
		height: rect.height,
	};
}
function isStaticPositioned(element) {
	return getComputedStyle(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (
		!isHTMLElement(element) ||
		getComputedStyle(element).position === "fixed"
	) {
		return null;
	}
	if (polyfill) {
		return polyfill(element);
	}
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) {
		rawOffsetParent = rawOffsetParent.ownerDocument.body;
	}
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow2(element);
	if (isTopLayer(element)) {
		return win;
	}
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
				return svgOffsetParent;
			}
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (
		offsetParent &&
		isTableElement(offsetParent) &&
		isStaticPositioned(offsetParent)
	) {
		offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	}
	if (
		offsetParent &&
		isLastTraversableNode(offsetParent) &&
		isStaticPositioned(offsetParent) &&
		!isContainingBlock(offsetParent)
	) {
		return win;
	}
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function (data3) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data3.floating);
	return {
		reference: getRectRelativeToOffsetParent(
			data3.reference,
			await getOffsetParentFn(data3.floating),
			data3.strategy,
		),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height,
		},
	};
};
function isRTL(element) {
	return getComputedStyle(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL,
};
var offset3 = offset2;
var shift2 = shift;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = {
		platform,
		...options,
	};
	const platformWithCache = {
		...mergedOptions.platform,
		_c: cache,
	};
	return computePosition(reference, floating, {
		...mergedOptions,
		platform: platformWithCache,
	});
};

// node_modules/locize/dist/esm/ui/highlightNode.js
var eleToOutline = [
	"DIV",
	"P",
	"H1",
	"H2",
	"H3",
	"H4",
	"H5",
	"H6",
	"OL",
	"UL",
	"ADDRESS",
	"BLOCKQUOTE",
	"DL",
	"PRE",
];
var overriddenStyles = ["outline", "border-radius", "outline-offset", "filter"];
var originalStyles = {};
var selected = {};
function highlight(item, node, keys) {
	var id = item.id;
	if (selected[id]) return;
	if (!originalStyles[id]) {
		originalStyles[id] = overriddenStyles.reduce(function (mem, s) {
			mem[s] = node.style[s];
			return mem;
		}, {});
	}
	if (eleToOutline.includes(node.nodeName)) {
		node.style.outline = "".concat(colors.highlight, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "2px");
		node.style.filter = "brightness(110%)";
	} else {
		node.style.outline = "".concat(colors.highlight, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "1px");
		node.style.filter = "brightness(110%)";
	}
	if (!item.ribbonBox) {
		var _RibbonBox = RibbonBox(keys),
			actions = _RibbonBox.box,
			arrowEle = _RibbonBox.arrow;
		document.body.appendChild(actions);
		var refEle = node;
		if (node.childNodes.length === 1) {
			var childNode = node.childNodes[0];
			if (childNode && childNode.nodeName === "#text") {
				var range = document.createRange();
				range.selectNode(childNode);
				var rect = range.getBoundingClientRect();
				refEle = {
					getBoundingClientRect: function getBoundingClientRect2() {
						return rect;
					},
				};
			}
		}
		computePosition2(refEle, actions, {
			placement: "right",
			middleware: [
				flip2({
					fallbackPlacements: ["left", "bottom"],
				}),
				shift2(),
				offset3(function (_ref) {
					var placement = _ref.placement,
						rects = _ref.rects;
					if (placement === "bottom") return rects.r;
					return 35;
				}),
				arrow2({
					element: arrowEle,
				}),
			],
		}).then(function (_ref2) {
			var x = _ref2.x,
				y = _ref2.y,
				middlewareData = _ref2.middlewareData,
				placement = _ref2.placement;
			Object.assign(actions.style, {
				left: "".concat(x, "px"),
				top: "".concat(y, "px"),
				display: "inline-flex",
			});
			var side = placement.split("-")[0];
			var staticSide = {
				top: "bottom",
				right: "left",
				bottom: "top",
				left: "right",
			}[side];
			if (middlewareData.arrow) {
				var _middlewareData$arrow = middlewareData.arrow,
					_x = _middlewareData$arrow.x,
					_y = _middlewareData$arrow.y;
				Object.assign(
					arrowEle.style,
					_defineProperty(
						_defineProperty(
							{
								left: _x != null ? "".concat(_x, "px") : "",
								top: _y != null ? "".concat(_y, "px") : "",
								right: "",
								bottom: "",
							},
							staticSide,
							"".concat(side === "bottom" ? -18 : -25, "px"),
						),
						"transform",
						side === "bottom"
							? "rotate(90deg)"
							: side === "left"
								? "rotate(180deg)"
								: "",
					),
				);
			}
		});
		item.ribbonBox = actions;
	}
}
function highlightUninstrumented(item, node, keys) {
	var id = item.id;
	if (selected[id]) return;
	if (!originalStyles[id]) {
		originalStyles[id] = overriddenStyles.reduce(function (mem, s) {
			mem[s] = node.style[s];
			return mem;
		}, {});
	}
	if (eleToOutline.includes(node.nodeName)) {
		node.style.outline = "".concat(colors.warning, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "2px");
		node.style.filter = "brightness(110%)";
	} else {
		node.style.outline = "".concat(colors.warning, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "1px");
		node.style.filter = "brightness(110%)";
	}
}
function selectedHighlight(item, node, keys) {
	var id = item.id;
	if (!originalStyles[id]) {
		originalStyles[id] = overriddenStyles.reduce(function (mem, s) {
			mem[s] = node.style[s];
			return mem;
		}, {});
	}
	if (eleToOutline.includes(node.nodeName)) {
		node.style.outline = "".concat(colors.highlight, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "2px");
		node.style.filter = "brightness(110%) drop-shadow(0px 0px 2px ".concat(
			colors.highlight,
			" )",
		);
	} else {
		node.style.outline = "".concat(colors.highlight, " solid 1px");
		node.style.setProperty("border-radius", "1px");
		node.style.setProperty("outline-offset", "1px");
		node.style.filter = "brightness(110%) drop-shadow(0px 0px 2px ".concat(
			colors.highlight,
			" )",
		);
	}
	if (item.ribbonBox) {
		document.body.removeChild(item.ribbonBox);
		delete item.ribbonBox;
	}
	selected[id] = true;
}
function resetHighlight(item, node, keys) {
	var ignoreSelected =
		arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
	var id = item.id;
	if (ignoreSelected && selected[id]) return;
	if (originalStyles[id]) {
		overriddenStyles.forEach(function (s) {
			node.style.setProperty(s, originalStyles[id][s]);
		});
		delete originalStyles[id];
	}
	if (item.ribbonBox) {
		document.body.removeChild(item.ribbonBox);
		delete item.ribbonBox;
	}
	delete selected[id];
}

// node_modules/locize/dist/esm/store.js
function ownKeys5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys5(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys5(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var data2 = {};
function clean2() {
	Object.values(data2).forEach(function (item) {
		if (!document.body.contains(item.node)) {
			resetHighlight(item.id, item.node);
			delete data2[item.id];
		}
	});
}
function save2(id, subliminal, type, meta, node, children) {
	if (!id || !type || !meta || !node) return;
	if (!data2[id]) {
		data2[id] = {
			id,
			node,
			subliminal,
		};
	}
	data2[id].keys = _objectSpread5(
		_objectSpread5({}, data2[id].keys),
		{},
		_defineProperty({}, "".concat(type), meta),
	);
	if (children) {
		data2[id].children = _objectSpread5(
			_objectSpread5({}, data2[id].children),
			{},
			_defineProperty(
				{},
				"".concat(type, "-").concat(
					children
						.map(function (c) {
							return c.childIndex;
						})
						.join(","),
				),
				children,
			),
		);
	}
}
function get2(id) {
	return data2[id];
}
var store = {
	save: save2,
	clean: clean2,
	get: get2,
	data: data2,
};

// node_modules/locize/dist/esm/shims/uniqueID.js
(function () {
	if (typeof Document === "undefined") return;
	var nextID = 1;
	if (Document.prototype.hasOwnProperty("uniqueID")) {
		return;
	}
	console.info('"document.uniqueID" not implemented; creating shim');
	Object.defineProperty(Document.prototype, "uniqueID", {
		get: function get3() {
			return nextID++;
		},
		enumerable: false,
		configurable: false,
	});
	Object.defineProperty(Element.prototype, "uniqueID", {
		get: function get3() {
			Object.defineProperty(this, "uniqueID", {
				value: document.uniqueID,
				writable: false,
				enumerable: false,
				configurable: false,
			});
			return this.uniqueID;
		},
		enumerable: false,
		configurable: true,
	});
})();

// node_modules/locize/dist/esm/parser.js
function ownKeys6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys6(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys6(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var currentSourceLng;
var i18n;
var ignoreMergedEleUniqueIds = [];
function setImplementation(impl) {
	i18n = impl;
}
function walk(node, func) {
	if (node.dataset && node.dataset.i18nextEditorElement === "true") return;
	func(node);
	var children = node.childNodes;
	for (var i = 0; i < children.length; i++) {
		walk(children[i], func);
	}
}
function extractMeta(id, type, meta, children) {
	var _i18n, _i18n2;
	var invisibleMeta = meta.invisibleMeta,
		text = meta.text;
	if (!invisibleMeta || !invisibleMeta.key || !invisibleMeta.ns) return;
	if (!currentSourceLng)
		currentSourceLng =
			(_i18n = i18n) === null || _i18n === void 0
				? void 0
				: _i18n.getSourceLng();
	return _objectSpread6(
		_objectSpread6(
			{
				eleUniqueID: id,
				textType: type,
				children: children
					? children
							.map(function (c) {
								return c.childIndex;
							})
							.join(",")
					: null,
				qualifiedKey: ""
					.concat(invisibleMeta.ns, ":")
					.concat(invisibleMeta.key),
			},
			invisibleMeta,
		),
		{},
		{
			extractedText: text,
			i18nTargetLng:
				(_i18n2 = i18n) === null || _i18n2 === void 0
					? void 0
					: _i18n2.getLng(),
			i18nSourceLng: currentSourceLng,
			i18nRawText: _defineProperty(
				_defineProperty(
					{},
					"".concat(invisibleMeta.lng),
					invisibleMeta.source === "translation" && i18n
						? i18n.getResource(
								invisibleMeta.lng,
								invisibleMeta.ns,
								invisibleMeta.key,
							)
						: null,
				),
				"".concat(currentSourceLng),
				invisibleMeta.source === "translation" && i18n
					? i18n.getResource(
							currentSourceLng,
							invisibleMeta.ns,
							invisibleMeta.key,
						)
					: null,
			),
		},
	);
}
function containsOnlySpaces(str) {
	return /^\s*$/.test(str);
}
function handleNode(node) {
	if (node.childNodes && !ignoreMergedEleUniqueIds.includes(node.uniqueID)) {
		var merge = [];
		node.childNodes.forEach(function (child, i) {
			if (merge.length && child.nodeName !== "#text") {
				ignoreMergedEleUniqueIds.push(child.uniqueID);
				merge.push({
					childIndex: i,
					child,
				});
			}
			if (child.nodeName !== "#text") return;
			var txt = child.textContent;
			if (containsOnlySpaces(txt)) return;
			var hasHiddenMeta = containsHiddenMeta(txt);
			var hasHiddenStartMarker = containsHiddenStartMarker(txt);
			if (hasHiddenStartMarker && hasHiddenMeta) {
				var meta = unwrap(txt);
				store.save(
					node.uniqueID,
					meta.invisibleMeta,
					"text",
					extractMeta(node.uniqueID, "text", meta),
					node,
				);
			} else if (hasHiddenStartMarker) {
				merge.push({
					childIndex: i,
					child,
					text: txt,
				});
			} else if (merge.length && !hasHiddenMeta) {
				merge.push({
					childIndex: i,
					child,
					text: txt,
				});
			} else if (merge.length && hasHiddenMeta) {
				merge.push({
					childIndex: i,
					child,
					text: txt,
				});
				var _meta = unwrap(
					merge.reduce(function (mem, item) {
						return mem + item.text;
					}, ""),
				);
				store.save(
					node.uniqueID,
					_meta.invisibleMeta,
					"html",
					extractMeta(node.uniqueID, "html", _meta, merge),
					node,
					merge,
				);
				merge = [];
			} else if (txt) {
				uninstrumentedStore.save(node.uniqueID, "text", node);
			}
		});
	}
	if (!node.getAttribute) return;
	validAttributes.forEach(function (attr) {
		var txt = node.getAttribute(attr);
		if (containsHiddenMeta(txt)) {
			var meta = unwrap(txt);
			store.save(
				node.uniqueID,
				meta.invisibleMeta,
				"attr:".concat(attr),
				extractMeta(node.uniqueID, "attr:".concat(attr), meta),
				node,
			);
		} else if (txt) {
			uninstrumentedStore.save(node.uniqueID, "attr:".concat(attr), node);
		}
	});
}
function parseTree(node) {
	currentSourceLng = void 0;
	walk(node, handleNode);
	store.clean();
	ignoreMergedEleUniqueIds = [];
	return store.data;
}

// node_modules/locize/dist/esm/observer.js
var mutationTriggeringElements = {};
function ignoreMutation(ele) {
	if (ele.uniqueID) {
		var info = mutationTriggeringElements[ele.uniqueID];
		if (
			info &&
			info.triggered > 10 &&
			info.lastTriggerDate + 500 < Date.now()
		) {
			if (!info.warned && console) {
				console.warn(
					"locize ::: ignoring element change - an element is rerendering too often in short interval",
					"\n",
					'consider adding the "data-locize-editor-ignore:" attribute to the element:',
					ele,
				);
				info.warned = true;
			}
			return true;
		}
	}
	var ret =
		ele.dataset &&
		(ele.dataset.i18nextEditorElement === "true" ||
			ele.dataset.locizeEditorIgnore === "true");
	if (!ret && ele.parentElement) return ignoreMutation(ele.parentElement);
	return ret;
}
function createObserver(ele, handle) {
	var internalChange;
	var lastToggleTimeout;
	var toggleInternal = function toggleInternal2() {
		if (lastToggleTimeout) clearTimeout(lastToggleTimeout);
		lastToggleTimeout = setTimeout(function () {
			if (internalChange) internalChange = false;
		}, 200);
	};
	var targetEles = [];
	var debouncedHandler = debounce(function h() {
		handle(targetEles);
		targetEles = [];
	}, 100);
	var observer = new MutationObserver(function (mutations) {
		if (internalChange) {
			toggleInternal();
			return;
		}
		var triggerMutation = false;
		mutations.forEach(function (mutation) {
			if (
				mutation.type === "attributes" &&
				!validAttributes.includes(mutation.attributeName)
			) {
				return;
			}
			Object.keys(mutationTriggeringElements).forEach(function (k) {
				var info2 = mutationTriggeringElements[k];
				if (info2.lastTriggerDate + 6e4 < Date.now()) {
					delete mutationTriggeringElements[k];
				}
			});
			if (mutation.type === "childList") {
				var notOurs = 0;
				if (!ignoreMutation(mutation.target)) {
					mutation.addedNodes.forEach(function (n) {
						if (ignoreMutation(n)) return;
						notOurs = notOurs + 1;
					}, 0);
					mutation.removedNodes.forEach(function (n) {
						if (ignoreMutation(n)) return;
						notOurs = notOurs + 1;
					}, 0);
				}
				if (notOurs === 0) return;
			}
			triggerMutation = true;
			if (mutation.target && mutation.target.uniqueID) {
				var info = mutationTriggeringElements[mutation.target.uniqueID] || {
					triggered: 0,
				};
				info.triggered = info.triggered + 1;
				info.lastTriggerDate = Date.now();
				mutationTriggeringElements[mutation.target.uniqueID] = info;
			}
			var includedAlready = targetEles.reduce(function (mem, element) {
				if (
					mem ||
					element.contains(mutation.target) ||
					!mutation.target.parentElement
				) {
					return true;
				}
				return false;
			}, false);
			if (!includedAlready) {
				targetEles = targetEles.filter(function (element) {
					return !mutation.target.contains(element);
				});
				targetEles.push(mutation.target);
			}
		});
		if (triggerMutation) debouncedHandler();
	});
	return {
		start: function start2() {
			var observerConfig =
				arguments.length > 0 && arguments[0] !== void 0
					? arguments[0]
					: {
							attributes: true,
							childList: true,
							characterData: true,
							subtree: true,
						};
			observer.observe(ele, observerConfig);
		},
		skipNext: function skipNext() {
			internalChange = true;
		},
	};
}

// node_modules/locize/dist/esm/ui/popup.js
function initDragElement() {
	var pos1 = 0;
	var pos2 = 0;
	var pos3 = 0;
	var pos4 = 0;
	var popups = document.getElementsByClassName("i18next-editor-popup");
	var elmnt = null;
	var overlay = null;
	var currentZIndex = 100;
	for (var i = 0; i < popups.length; i++) {
		var popup = popups[i];
		var header = getHeader(popup);
		popup.onmousedown = function () {
			this.style.zIndex = "" + ++currentZIndex;
		};
		if (header) {
			header.parentPopup = popup;
			header.onmousedown = dragMouseDown;
		}
	}
	function dragMouseDown(e) {
		if (!overlay)
			overlay = document.getElementById("i18next-editor-popup-overlay");
		if (overlay) overlay.style.display = "block";
		stopMouseTracking();
		elmnt = this.parentPopup;
		elmnt.style.zIndex = "" + ++currentZIndex;
		e = e || window.event;
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}
	function elementDrag(e) {
		if (!elmnt) {
			return;
		}
		e = e || window.event;
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}
	function closeDragElement() {
		startMouseTracking();
		if (overlay) overlay.style.display = "none";
		document.onmouseup = null;
		document.onmousemove = null;
	}
	function getHeader(element) {
		var headerItems = element.getElementsByClassName(
			"i18next-editor-popup-header",
		);
		if (headerItems.length === 1) {
			return headerItems[0];
		}
		return null;
	}
}
function initResizeElement() {
	var popups = document.getElementsByClassName("i18next-editor-popup");
	var element = null;
	var overlay = null;
	var startX, startY, startWidth, startHeight;
	for (var i = 0; i < popups.length; i++) {
		var p = popups[i];
		var right = document.createElement("div");
		right.className = "resizer-right";
		p.appendChild(right);
		right.addEventListener("mousedown", initDrag, false);
		right.parentPopup = p;
		var bottom = document.createElement("div");
		bottom.className = "resizer-bottom";
		p.appendChild(bottom);
		bottom.addEventListener("mousedown", initDrag, false);
		bottom.parentPopup = p;
		var both = document.createElement("div");
		both.className = "resizer-both";
		p.appendChild(both);
		both.addEventListener("mousedown", initDrag, false);
		both.parentPopup = p;
	}
	function initDrag(e) {
		stopMouseTracking();
		if (!overlay)
			overlay = document.getElementById("i18next-editor-popup-overlay");
		if (overlay) overlay.style.display = "block";
		element = this.parentPopup;
		startX = e.clientX;
		startY = e.clientY;
		startWidth = parseInt(
			document.defaultView.getComputedStyle(element).width,
			10,
		);
		startHeight = parseInt(
			document.defaultView.getComputedStyle(element).height,
			10,
		);
		document.documentElement.addEventListener("mousemove", doDrag, false);
		document.documentElement.addEventListener("mouseup", stopDrag, false);
	}
	function doDrag(e) {
		element.style.width = startWidth + e.clientX - startX + "px";
		element.style.height = startHeight + e.clientY - startY + "px";
	}
	function stopDrag() {
		startMouseTracking();
		if (overlay) overlay.style.display = "none";
		document.documentElement.removeEventListener("mousemove", doDrag, false);
		document.documentElement.removeEventListener("mouseup", stopDrag, false);
	}
}

// node_modules/locize/dist/esm/process.js
function ownKeys7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys7(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys7(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
function start() {
	var implementation =
		arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	if (typeof document === "undefined") return;
	var scriptEle = document.getElementById("locize");
	var config = {};
	["projectId", "version"].forEach(function (attr) {
		if (!scriptEle) return;
		var value =
			scriptEle.getAttribute(attr.toLowerCase()) ||
			scriptEle.getAttribute("data-" + attr.toLowerCase());
		if (value === "true") value = true;
		if (value === "false") value = false;
		if (value !== void 0 && value !== null) config[attr] = value;
	});
	config = _objectSpread7(
		_objectSpread7({}, implementation.getLocizeDetails()),
		config,
	);
	api.init(implementation);
	setImplementation(implementation);
	implementation === null ||
		implementation === void 0 ||
		implementation.bindLanguageChange(function (lng) {
			api.sendCurrentTargetLanguage(implementation.getLng());
		});
	function continueToStart() {
		var observer = createObserver(document.body, function (eles) {
			eles.forEach(function (ele) {
				parseTree(ele);
			});
			api.sendCurrentParsedContent();
		});
		observer.start();
		startMouseTracking(observer);
		if (!document.getElementById(popupId)) {
			document.body.append(
				Popup(getIframeUrl(), function () {
					api.requestInitialize(config);
				}),
			);
			initDragElement();
			initResizeElement();
		}
	}
	if (document.body) return continueToStart();
	window.addEventListener("load", function () {
		return continueToStart();
	});
}

// node_modules/locize/dist/esm/clickHandler.js
function createClickHandler(cb) {
	var options =
		arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	var handler11 = function handler12(e) {
		var el = getClickedElement(e);
		if (!el) return {};
		e.preventDefault();
		e.stopPropagation();
		function getFallbackNS() {
			if (options.isLocizify) return options.defaultNS;
		}
		var text = getElementText(el);
		var key = getElementI18nKey(el);
		var ns = getElementNamespace(el) || getFallbackNS();
		if (containsHiddenMeta(text)) {
			var meta = unwrap(text);
			if (meta && meta.invisibleMeta && meta.invisibleMeta.key)
				key = meta.invisibleMeta.key;
			if (meta && meta.invisibleMeta && meta.invisibleMeta.ns)
				ns = meta.invisibleMeta.ns;
		}
		var rectEl = el.getBoundingClientRect ? el : el.parentElement;
		var _rectEl$getBoundingCl = rectEl.getBoundingClientRect(),
			top2 = _rectEl$getBoundingCl.top,
			left = _rectEl$getBoundingCl.left,
			width = _rectEl$getBoundingCl.width,
			height = _rectEl$getBoundingCl.height;
		var style = window.getComputedStyle(rectEl, null);
		var pT = parseFloat(style.getPropertyValue("padding-top"));
		var pB = parseFloat(style.getPropertyValue("padding-bottom"));
		var pR = parseFloat(style.getPropertyValue("padding-right"));
		var pL = parseFloat(style.getPropertyValue("padding-left"));
		var sizing = style.getPropertyValue("box-sizing");
		cb({
			tagName: rectEl.tagName,
			text,
			key,
			ns,
			box: {
				top: top2,
				left,
				width: sizing === "border-box" ? width : width - pR - pL,
				height: sizing === "border-box" ? height : height - pT - pB,
			},
			style: style.cssText,
		});
	};
	return handler11;
}

// node_modules/locize/dist/esm/processLegacy.js
function ownKeys8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys8(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys8(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
function startLegacy() {
	var implementation =
		arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	if (typeof document === "undefined") return;
	var scriptEle = document.getElementById("locize");
	var config = {};
	["projectId", "version"].forEach(function (attr) {
		if (!scriptEle) return;
		var value =
			scriptEle.getAttribute(attr.toLowerCase()) ||
			scriptEle.getAttribute("data-" + attr.toLowerCase());
		if (value === "true") value = true;
		if (value === "false") value = false;
		if (value !== void 0 && value !== null) config[attr] = value;
	});
	config = _objectSpread8(
		_objectSpread8({}, implementation.getLocizeDetails()),
		config,
	);
	api.init(
		implementation,
		createClickHandler(function (payload) {
			sendMessage("clickedElement", {
				payload,
			});
		}, implementation.getLocizeDetails()),
	);
	api.sendCurrentTargetLanguage = function (lng) {
		sendMessage("setLng", {
			lng: lng || implementation.getLng(),
		});
	};
	if (typeof window !== "undefined") {
		var oldHref = window.document.location.href;
		window.addEventListener("load", function () {
			sendMessage("hrefChanged", {
				href: window.document.location.href,
			});
			var bodyList = window.document.querySelector("body");
			var observer = new window.MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (oldHref !== window.document.location.href) {
						oldHref = window.document.location.href;
						sendMessage("hrefChanged", {
							href: oldHref,
						});
					}
				});
			});
			var config2 = {
				childList: true,
				subtree: true,
			};
			observer.observe(bodyList, config2);
		});
	}
	implementation === null ||
		implementation === void 0 ||
		implementation.bindLanguageChange(function (lng) {
			api.sendCurrentTargetLanguage(implementation.getLng());
		});
	implementation === null ||
		implementation === void 0 ||
		implementation.bindMissingKeyHandler(function (lng, ns, k, val) {
			api.onAddedKey(lng, ns, k, val);
		});
}

// node_modules/locize/dist/esm/locizePlugin.js
function ownKeys9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r &&
			(o = o.filter(function (r2) {
				return Object.getOwnPropertyDescriptor(e, r2).enumerable;
			})),
			t.push.apply(t, o);
	}
	return t;
}
function _objectSpread9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2
			? ownKeys9(Object(t), true).forEach(function (r2) {
					_defineProperty(e, r2, t[r2]);
				})
			: Object.getOwnPropertyDescriptors
				? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
				: ownKeys9(Object(t)).forEach(function (r2) {
						Object.defineProperty(
							e,
							r2,
							Object.getOwnPropertyDescriptor(t, r2),
						);
					});
	}
	return e;
}
var isInIframe = typeof window !== "undefined";
try {
	isInIframe = self !== top;
} catch (e) {}
function configurePostProcessor(i18next2, options) {
	i18next2.use(SubliminalPostProcessor);
	if (typeof options.postProcess === "string") {
		options.postProcess = [options.postProcess, "subliminal"];
	} else if (Array.isArray(options.postProcess)) {
		options.postProcess.push("subliminal");
	} else {
		options.postProcess = "subliminal";
	}
	options.postProcessPassResolved = true;
}
function getImplementation(i18n2) {
	var impl = {
		getResource: function getResource(lng, ns, key) {
			return i18n2.getResource(lng, ns, key);
		},
		setResource: function setResource(lng, ns, key, value) {
			return i18n2.addResource(lng, ns, key, value, {
				silent: true,
			});
		},
		getResourceBundle: function getResourceBundle(lng, ns, cb) {
			i18n2.loadNamespaces(ns, function () {
				cb(i18n2.getResourceBundle(lng, ns));
			});
		},
		getLng: function getLng() {
			return i18n2.resolvedLanguage || i18n2.languages[0];
		},
		getSourceLng: function getSourceLng() {
			var fallback = i18n2.options.fallbackLng;
			if (typeof fallback === "string") return fallback;
			if (Array.isArray(fallback)) return fallback[fallback.length - 1];
			if (fallback && fallback["default"]) {
				if (typeof fallback["default"] === "string") return fallback;
				if (Array.isArray(fallback["default"]))
					return fallback["default"][fallback["default"].length - 1];
			}
			if (typeof fallback === "function") {
				var res = fallback(i18n2.resolvedLanguage);
				if (typeof res === "string") return res;
				if (Array.isArray(res)) return res[res.length - 1];
			}
			return "dev";
		},
		getLocizeDetails: function getLocizeDetails() {
			var backendName;
			if (
				i18n2.services.backendConnector.backend &&
				i18n2.services.backendConnector.backend.options &&
				i18n2.services.backendConnector.backend.options.loadPath &&
				i18n2.services.backendConnector.backend.options.loadPath.indexOf(
					".locize.",
				) > 0
			) {
				backendName = "I18NextLocizeBackend";
			} else {
				backendName = i18n2.services.backendConnector.backend
					? i18n2.services.backendConnector.backend.constructor.name
					: "options.resources";
			}
			var opts = {
				backendName,
				sourceLng: impl.getSourceLng(),
				i18nFormat:
					i18n2.options.compatibilityJSON === "v3"
						? "i18next_v3"
						: "i18next_v4",
				i18nFramework: "i18next",
				isLocizify: i18n2.options.isLocizify,
				defaultNS: i18n2.options.defaultNS,
			};
			if (!i18n2.options.backend && !i18n2.options.editor) return opts;
			var pickFrom = i18n2.options.backend || i18n2.options.editor;
			return _objectSpread9(
				_objectSpread9({}, opts),
				{},
				{
					projectId: pickFrom.projectId,
					version: pickFrom.version,
				},
			);
		},
		bindLanguageChange: function bindLanguageChange(cb) {
			i18n2.on("languageChanged", cb);
		},
		bindMissingKeyHandler: function bindMissingKeyHandler(cb) {
			i18n2.options.missingKeyHandler = function (
				lng,
				ns,
				k,
				val,
				isUpdate,
				opts,
			) {
				if (!isUpdate) cb(lng, ns, k, val);
			};
		},
		triggerRerender: function triggerRerender() {
			i18n2.emit("editorSaved");
		},
	};
	return impl;
}
var i18next;
var locizeEditorPlugin = function locizeEditorPlugin2() {
	var opt = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	opt.qsProp = opt.qsProp || "incontext";
	return {
		type: "3rdParty",
		init: function init2(i18n2) {
			var options = i18n2.options;
			i18next = i18n2;
			var showInContext =
				opt.show || getQsParameterByName(opt.qsProp) === "true";
			if (!isInIframe && showInContext)
				configurePostProcessor(i18next, options);
			var impl = getImplementation(i18n2);
			if (!isInIframe && showInContext) {
				start(impl);
			} else if (isInIframe) {
				startLegacy(impl);
			}
		},
	};
};
var locizePlugin = locizeEditorPlugin();

// node_modules/locize/dist/esm/startStandalone.js
function startStandalone() {
	startLegacy({
		getLocizeDetails: function getLocizeDetails() {
			return {};
		},
		getLng: function getLng() {
			return void 0;
		},
		setResource: function setResource() {},
		triggerRerender: function triggerRerender() {},
		getResourceBundle: function getResourceBundle() {
			return {};
		},
		bindMissingKeyHandler: function bindMissingKeyHandler() {},
		bindLanguageChange: function bindLanguageChange() {},
	});
}
if (typeof window !== "undefined")
	window.locizeStartStandalone = startStandalone;

// node_modules/locize/dist/esm/index.js
var index = {
	wrap,
	unwrap,
	containsHiddenMeta,
	PostProcessor: SubliminalPostProcessor,
	addLocizeSavedHandler,
	locizePlugin,
	locizeEditorPlugin,
	turnOn,
	turnOff,
	setEditorLng,
	startStandalone,
};
export {
	SubliminalPostProcessor as PostProcessor,
	addLocizeSavedHandler,
	containsHiddenMeta,
	index as default,
	locizeEditorPlugin,
	locizePlugin,
	setEditorLng,
	startStandalone,
	turnOff,
	turnOn,
	unwrap,
	wrap,
};
//# sourceMappingURL=locize.js.map
