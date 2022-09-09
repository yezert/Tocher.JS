function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
	var _i = arr == null ? null : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) || arr["@@iterator"];
	if (_i == null) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _s, _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _nonIterableRest() {
	throw new TypeError(
		"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
	);
}
function _slicedToArray(arr, i) {
	return (
		_arrayWithHoles(arr) ||
		_iterableToArrayLimit(arr, i) ||
		_unsupportedIterableToArray(arr, i) ||
		_nonIterableRest()
	);
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(n);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function found_t_map() {
	var t_map_list = document.querySelectorAll("t-map");
	t_map_list.forEach(function (t_map) {
		t_map.getAttribute("t-name");
		var things = t_map.getAttribute("t-list");
		var lists = things.split(",");
		console.log(lists, lists.length);
		var t_map_children = Array.from(t_map.childNodes.values());
		lists.forEach(function (y) {
			t_map_children.forEach(function (chn) {
				if (chn.nodeType == chn.ELEMENT_NODE) {
					var n = chn.cloneNode(true);
					t_map.appendChild(n);
				}
			});
		});
	});
}
var t_data_list = document.querySelectorAll("t-data");
var t_components_list = document.querySelectorAll("t-components");
var t_components_exs = document.querySelectorAll("t-export");
function init_compenents() {
	t_components_exs.forEach(function (at) {
		at.style.display = "none";
	});
	t_components_list.forEach(function (at) {
		at.style.display = "none";
	});
}
t_data_list.forEach(function (x) {
	x.style.display = "none";
});
function found_t_value() {
	var to_js_list = document.querySelectorAll("*[t-value]");
	to_js_list.forEach(function (valuename) {
		var dict = {};
		var t_data_collect = document.querySelectorAll("t-data");
		t_data_collect.forEach(function (x) {
			return (dict[x.getAttribute("t-name")] = x.innerText);
		});
		var t_values = document.querySelectorAll("*[t-value]");
		t_values.forEach(function (elem) {
			var tval = elem.getAttribute("t-value");
			var re = /\{[^\}]+\}/g;
			var val_matched = tval.match(re);
			if (val_matched) {
				var val = val_matched[0];
				var k = val.substring(1, val.length - 1);
				var newval = tval.replace(re, dict[k]);
				elem.innerText = newval;
				elem.setAttribute("value", newval);
			} else {
				var disval = elem.getAttribute("t-value");
				elem.innerText = disval;
				elem.setAttribute("value", disval);
				elem.style.display = "normal";
			}
		});
	});
}
function T_changevalue(valuename, what) {
	t_data_list.forEach(function (nowda) {
		if (nowda.getAttribute("t-name") == valuename) {
			nowda.innerText = what;
			found_t_value();
			found_t_if();
		}
	});
}
function T_operating(valuename, number) {
	t_data_list.forEach(function (nowda) {
		if (nowda.getAttribute("t-name") == valuename) {
			var opn = parseInt(nowda.innerText) + number;
			nowda.innerText = opn;
			found_t_value();
			found_t_if();
		}
	});
}
function get_components() {
	document.querySelectorAll("t-components[t-name]").forEach(function (t_comp) {
		var comp_name = t_comp.getAttribute("t-name");
		var exports_has = {};
		t_comp.querySelectorAll("t-export");
		t_comp.querySelectorAll("t-export").forEach(function (ex) {
			var k = String(ex.innerText).trim();
			exports_has["".concat(k)] = true;
		});
		document.querySelectorAll("".concat(comp_name)).forEach(function (comp) {
			var exports_attrs = {};
			comp.getAttributeNames().forEach(function (a) {
				exports_attrs[a] = comp.getAttribute(a);
			});
			var child = t_comp.firstChild;
			while (child) {
				if (child.nodeType == child.ELEMENT_NODE) {
					if (child.nodeName != "T-EXPORT") {
						var cloned = child.cloneNode();
						var new_child = comp.appendChild(cloned);
						var t_val = new_child.getAttribute("t-value");
						if (t_val) {
							var re = /\{[^\}]+\}/g;
							var match_result = t_val.match(re);
							if (match_result) {
								var _match_result = _slicedToArray(match_result, 1),
									vk = _match_result[0];
								var k = vk.substring(1, vk.length - 1);
								if (exports_has[k]) {
									new_child.innerText = t_val.replace(vk, exports_attrs[k]);
									new_child.setAttribute("value", exports_attrs[k]);
								}
							}
						}
					} else child.nodeName;
				}
				child = child.nextSibling;
			}
		});
	});
}
function found_t_hide() {
	var t_hide_list = document.querySelectorAll("*[t-hide]");
	t_hide_list.forEach(function (x) {
		if (x.getAttribute("t-hide") == "true") x.style.display = "none";
		else x.style.display = "block";
	});
}
function found_t_if() {
	var t_if_list = document.querySelectorAll("t-if");
	t_if_list.forEach(function (x) {
		var logic = x.getAttribute("t-logic");
		var ratio = x.getAttribute("t-ratio");
		var ratio2 = x.getAttribute("t-ratios");
		var tdata = document.querySelectorAll("t-data");
		tdata.forEach(function (y) {
			if (ratio == y.getAttribute("t-name")) ratio = y.innerText;
			if (ratio2 == y.getAttribute("t-name")) ratio2 = y.innerText;
			if (logic == ">") {
				if (parseInt(ratio) > parseInt(ratio2)) x.style.display = "block";
				else x.style.display = "none";
			} else if (logic == "<") {
				if (parseInt(ratio) < parseInt(ratio2)) x.style.display = "block";
				else x.style.display = "none";
			} else if (logic == "=") {
				if (parseInt(ratio) === parseInt(ratio2)) x.style.display = "block";
				else x.style.display = "none";
			}
		});
	});
}
function init() {
	found_t_map();
	found_t_value();
	get_components();
	init_compenents();
	found_t_hide();
	found_t_if();
}
window.onload = function () {
	init();
};
