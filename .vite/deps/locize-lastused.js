import "./chunk-WOOG5QLI.js";

// node_modules/locize-lastused/esm/utils.js
var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
	each.call(slice.call(arguments, 1), function (source) {
		if (source) {
			for (var prop in source) {
				if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		}
	});
	return obj;
}
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
function isMissingOption(obj, props) {
	return props.reduce(function (mem, p) {
		if (mem) return mem;
		if (
			!obj ||
			!obj[p] ||
			typeof obj[p] !== "string" ||
			!obj[p].toLowerCase() === p.toLowerCase()
		) {
			var err = 'i18next-lastused :: got "'
				.concat(obj[p], '" in options for ')
				.concat(p, " which is invalid.");
			console.warn(err);
			return err;
		}
		return false;
	}, false);
}
function replaceIn(str, arr2, options) {
	var ret = str;
	arr2.forEach(function (s) {
		var regexp = new RegExp("{{".concat(s, "}}"), "g");
		ret = ret.replace(regexp, options[s]);
	});
	return ret;
}

// node_modules/locize-lastused/esm/request.js
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
var fetchApi = typeof fetch === "function" ? fetch : void 0;
if (typeof global !== "undefined" && global.fetch) {
	fetchApi = global.fetch;
} else if (typeof window !== "undefined" && window.fetch) {
	fetchApi = window.fetch;
}
var XmlHttpRequestApi;
if (
	typeof XMLHttpRequest === "function" ||
	(typeof XMLHttpRequest === "undefined"
		? "undefined"
		: _typeof(XMLHttpRequest)) === "object"
) {
	if (typeof global !== "undefined" && global.XMLHttpRequest) {
		XmlHttpRequestApi = global.XMLHttpRequest;
	} else if (typeof window !== "undefined" && window.XMLHttpRequest) {
		XmlHttpRequestApi = window.XMLHttpRequest;
	}
}
var ActiveXObjectApi;
if (typeof ActiveXObject === "function") {
	if (typeof global !== "undefined" && global.ActiveXObject) {
		ActiveXObjectApi = global.ActiveXObject;
	} else if (typeof window !== "undefined" && window.ActiveXObject) {
		ActiveXObjectApi = window.ActiveXObject;
	}
}
if (typeof fetchApi !== "function") fetchApi = void 0;
if (!fetchApi && !XmlHttpRequestApi && !ActiveXObjectApi) {
	try {
		import("./browser-ponyfill-TXRLFSLK.js")
			.then(function (mod) {
				fetchApi = mod.default;
			})
			.catch(function () {});
	} catch (e) {}
}
var requestWithFetch = function requestWithFetch2(
	options,
	url,
	payload,
	callback,
) {
	var resolver = function resolver2(response) {
		var resourceNotExisting =
			response.headers &&
			response.headers.get("x-cache") === "Error from cloudfront";
		if (!response.ok)
			return callback(response.statusText || "Error", {
				status: response.status,
				resourceNotExisting,
			});
		response
			.text()
			.then(function (data) {
				callback(null, {
					status: response.status,
					data,
					resourceNotExisting,
				});
			})
			.catch(callback);
	};
	var headers = {
		Authorization:
			options.authorize && options.apiKey ? options.apiKey : void 0,
		"Content-Type": "application/json",
	};
	if (
		typeof window === "undefined" &&
		typeof global !== "undefined" &&
		typeof global.process !== "undefined" &&
		global.process.versions &&
		global.process.versions.node
	) {
		headers["User-Agent"] = "locize-lastused (node/"
			.concat(global.process.version, "; ")
			.concat(global.process.platform, " ")
			.concat(global.process.arch, ")");
	}
	if (typeof fetch === "function") {
		fetch(url, {
			method: payload ? "POST" : "GET",
			body: payload ? JSON.stringify(payload) : void 0,
			headers,
		})
			.then(resolver)
			.catch(callback);
	} else {
		fetchApi(url, {
			method: payload ? "POST" : "GET",
			body: payload ? JSON.stringify(payload) : void 0,
			headers,
		})
			.then(resolver)
			.catch(callback);
	}
};
var requestWithXmlHttpRequest = function requestWithXmlHttpRequest2(
	options,
	url,
	payload,
	callback,
) {
	try {
		var x = XmlHttpRequestApi
			? new XmlHttpRequestApi()
			: new ActiveXObjectApi("MSXML2.XMLHTTP.3.0");
		x.open(payload ? "POST" : "GET", url, 1);
		if (!options.crossDomain) {
			x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		}
		if (options.authorize && options.apiKey) {
			x.setRequestHeader("Authorization", options.apiKey);
		}
		if (payload || options.setContentTypeJSON) {
			x.setRequestHeader("Content-Type", "application/json");
		}
		x.onreadystatechange = function () {
			var resourceNotExisting =
				x.getResponseHeader("x-cache") === "Error from cloudfront";
			x.readyState > 3 &&
				callback(x.status >= 400 ? x.statusText : null, {
					status: x.status,
					data: x.responseText,
					resourceNotExisting,
				});
		};
		x.send(JSON.stringify(payload));
	} catch (e) {
		console && console.log(e);
	}
};
var request = function request2(options, url, payload, callback) {
	if (typeof payload === "function") {
		callback = payload;
		payload = void 0;
	}
	callback = callback || function () {};
	if (fetchApi) {
		return requestWithFetch(options, url, payload, callback);
	}
	if (
		typeof XMLHttpRequest === "function" ||
		(typeof XMLHttpRequest === "undefined"
			? "undefined"
			: _typeof(XMLHttpRequest)) === "object" ||
		typeof ActiveXObject === "function"
	) {
		return requestWithXmlHttpRequest(options, url, payload, callback);
	}
	callback(new Error("No fetch and no xhr implementation found!"));
};
var request_default = request;

// node_modules/locize-lastused/esm/index.js
var getDefaults = function getDefaults2() {
	return {
		lastUsedPath:
			"https://api.locize.app/used/{{projectId}}/{{version}}/{{lng}}/{{ns}}",
		referenceLng: "en",
		crossDomain: true,
		setContentTypeJSON: false,
		version: "latest",
		debounceSubmit: 9e4,
		allowedHosts: ["localhost"],
	};
};
var locizeLastUsed = {
	init: function init(options) {
		var isI18next = options.t && typeof options.t === "function";
		if (
			isI18next &&
			!options.options.locizeLastUsed.projectId &&
			options.options.backend.projectId
		) {
			options.options.locizeLastUsed.projectId =
				options.options.backend.projectId;
		}
		if (
			isI18next &&
			!options.options.locizeLastUsed.version &&
			options.options.backend.version
		) {
			options.options.locizeLastUsed.version = options.options.backend.version;
		}
		if (
			isI18next &&
			!options.options.locizeLastUsed.apiKey &&
			options.options.backend.apiKey
		) {
			options.options.locizeLastUsed.apiKey = options.options.backend.apiKey;
		}
		if (
			isI18next &&
			!options.options.locizeLastUsed.referenceLng &&
			options.options.backend.referenceLng
		) {
			options.options.locizeLastUsed.referenceLng =
				options.options.backend.referenceLng;
		}
		if (
			isI18next &&
			!options.options.locizeLastUsed.referenceLng &&
			options.options.fallbackLng &&
			Array.isArray(options.options.fallbackLng) &&
			options.options.fallbackLng[0] !== "dev"
		) {
			options.options.locizeLastUsed.referenceLng =
				options.options.fallbackLng[0];
		}
		this.options = isI18next
			? defaults(
					options.options.locizeLastUsed,
					this.options || {},
					getDefaults(),
				)
			: defaults(options, this.options || {}, getDefaults());
		var hostname =
			typeof window !== "undefined" &&
			window.location &&
			window.location.hostname;
		if (hostname) {
			this.isAllowed = this.options.allowedHosts.indexOf(hostname) > -1;
		} else {
			this.isAllowed = true;
		}
		this.submitting = null;
		this.pending = {};
		this.done = {};
		this.submit = debounce(this.submit, this.options.debounceSubmit);
		if (isI18next) this.interceptI18next(options);
	},
	interceptI18next: function interceptI18next(i18next) {
		var _this = this;
		var origGetResource = i18next.services.resourceStore.getResource;
		i18next.services.resourceStore.getResource = function (
			lng,
			ns,
			key,
			options,
		) {
			if (key) _this.used(ns, key);
			return origGetResource.call(
				i18next.services.resourceStore,
				lng,
				ns,
				key,
				options,
			);
		};
	},
	used: function used(ns, key, callback) {
		var _this2 = this;
		["pending", "done"].forEach(function (k) {
			if (_this2.done[ns] && _this2.done[ns][key]) return;
			if (!_this2[k][ns]) _this2[k][ns] = {};
			_this2[k][ns][key] = true;
		});
		this.submit(callback);
	},
	submit: function submit(callback) {
		var _this3 = this;
		if (!this.isAllowed) return callback && callback(new Error("not allowed"));
		if (this.submitting) return this.submit(callback);
		var isMissing = isMissingOption(this.options, [
			"projectId",
			"version",
			"apiKey",
			"referenceLng",
		]);
		if (isMissing) return callback && callback(new Error(isMissing));
		this.submitting = this.pending;
		this.pending = {};
		var namespaces = Object.keys(this.submitting);
		var todo = namespaces.length;
		var doneOne = function doneOne2(err) {
			todo--;
			if (!todo) {
				_this3.submitting = null;
				if (callback) callback(err);
			}
		};
		namespaces.forEach(function (ns) {
			var keys = Object.keys(_this3.submitting[ns]);
			var url = replaceIn(
				_this3.options.lastUsedPath,
				["projectId", "version", "lng", "ns"],
				defaults(
					{
						lng: _this3.options.referenceLng,
						ns,
					},
					_this3.options,
				),
			);
			if (keys.length) {
				request_default(
					defaults(
						{
							authorize: true,
						},
						_this3.options,
					),
					url,
					keys,
					doneOne,
				);
			} else {
				doneOne();
			}
		});
	},
};
locizeLastUsed.type = "3rdParty";
var esm_default = locizeLastUsed;
export { esm_default as default };
//# sourceMappingURL=locize-lastused.js.map
