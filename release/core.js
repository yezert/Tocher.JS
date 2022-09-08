// var to_js_list = document.getElementsByClassName("tos");

const t_data_list = document.querySelectorAll("t-data");

const t_components_list = document.querySelectorAll("t-components");

const t_components_exs = document.querySelectorAll("t-export");

// alltdata.style.display = "none";
// console.log(t_data_list);

var data = "";

function init_compenents() {
	t_components_exs.forEach((at) => {
		at.style.display = "none";
	});
	t_components_list.forEach((at) => {
		at.style.display = "none";
	});
}
var newdata = Array.from(t_data_list).map((x) => {
	//let tcvalue = alltjs.getAttribute("tocher-value");
	x.style.display = "none";
	// console.log(x);

	// data = x.innerText;

	// console.log("data::", data);
	// let a = (x.x.innerText = a);
	// x.setAttribute("value", a);
	return x;
});

// console.log(newdata);

function found_t_value() {
	// console.log("aaa");
	// const to_js_list = document.getElementsByClassName("to-js");
	const to_js_list = document.querySelectorAll(`*[t-value]`);
	Array.from(to_js_list).filter((valuename) => {
		const t_data_collect = document.querySelectorAll("t-data");
		const t_data_array = Array.from(t_data_collect).map((x) => ({ [x.getAttribute("t-name")]: x.innerText }));
		// console.log(t_data_array, "<<<array");
		let dict = Object.assign({}, ...t_data_array);

		const t_values = document.querySelectorAll(`*[t-value]`);
		t_values
			// .filter((elem) => { const tval = elem.getAttribute("t-value");return tval.includes(`{${valuename.getAttribute("")}}`);})
			.forEach((elem) => {
				const tval = elem.getAttribute("t-value");
				var re = /\{[^\}]+\}/g;
				const val_matched = tval.match(re);
				if (val_matched) {
					const val = val_matched[0];
					const k = val.substring(1, val.length - 1); //ddsdd
					var newval = tval.replace(re, dict[k]);
					//console.log(tval, val, k, newval, "<<<", elem);
					elem.innerText = newval;
					elem.setAttribute("value", newval);
					//elem.setAttribute("t-value", newval);
					// console.log(elem, dict, "<<<elem,dict");
				} else {
					const disval = elem.getAttribute("t-value");
					elem.innerText = disval;
					elem.setAttribute("value", disval);
					elem.style.display = "normal";
				}
			});
	});
}

// console.log("www");

function T_changevalue(valuename, what) {
	const [nowdata] = Array.from(newdata).filter((nowda) => {
		// console.log(nowda);
		if (nowda.getAttribute("t-name") == valuename) {
			// console.log(nowda);
			// nowda.innerText = nowda.innerText
			nowda.innerText = what;
			// console.log(nowda.innerText);
			found_t_value();
			found_t_if();
		} else {
			return false;
		}
	});
}

function T_operating(valuename, number) {
	const [nowda] = Array.from(newdata).filter((nowda) => {
		// console.log(nowda);
		if (nowda.getAttribute("t-name") == valuename) {
			// console.log(nowda);
			// nowda.innerText = nowda.innerText
			var opn = Number.parseInt(nowda.innerText) + number;
			nowda.innerText = opn;
			// console.log(nowda.innerText);
			found_t_value();
			found_t_if();
		} else {
			return false;
		}
	});
	// console.log(nowda);
}
function oninput_str(self) {
	// console.log(self, self.value, self.getAttribute("t-value"));
	const t_val = self.getAttribute("t-value");
	const t_data_collect = document.querySelectorAll("t-data");
	Array.from(t_data_collect)
		.filter((x) => x.getAttribute("t-name") == t_val)
		.forEach((x) => {
			x.innerText = self.value;
		});
}

function element_onload(self) {
	// console.log(self, self.value, self.getAttribute("t-value"), "<<<element-onload");
	const t_val = self.getAttribute("t-value");
	const t_data_collect = document.querySelectorAll("t-data");
	Array.from(t_data_collect)
		.filter((t_d) => t_d.getAttribute("t-name") == t_val)
		.forEach((t_d) => {
			self.value = t_d.innerText;
		});
	// found_t_value();
}

function get_components() {
	// Array.from(t_components_list).filter((tc) => {
	// let tct = tc.getAttribute("t-name");
	// console.log(tct);
	document.querySelectorAll(`t-components[t-name]`).forEach((t_comp) => {
		// console.log("[<t-components>]", t_comp);
		// t_comp.style.display = "none";

		const comp_name = t_comp.getAttribute("t-name");
		let exports_has = {};
		const tex = t_comp.querySelectorAll("t-export");
		t_comp.querySelectorAll("t-export").forEach((ex) => {
			const k = String(ex.innerText).trim();
			exports_has[`${k}`] = true;
		});

		document.querySelectorAll(`${comp_name}`).forEach((comp) => {
			let exports_attrs = {};
			comp.getAttributeNames().forEach((a) => {
				exports_attrs[a] = comp.getAttribute(a);
			});

			let child = t_comp.firstChild;
			while (child) {
				if (child.nodeType == child.ELEMENT_NODE) {
					if (child.nodeName != "T-EXPORT") {
						// console.log(`[[${child.nodeName}]]`, child);
						const cloned = child.cloneNode();
						const new_child = comp.appendChild(cloned);

						const t_val = new_child.getAttribute("t-value");
						if (t_val) {
							const re = /\{[^\}]+\}/g;
							const match_result = t_val.match(re);
							// console.log(t_val, match_result, cc);
							if (match_result) {
								const [vk] = match_result;
								const k = vk.substring(1, vk.length - 1);
								if (exports_has[k]) {
									new_child.innerText = t_val.replace(vk, exports_attrs[k]);
									new_child.setAttribute("value", exports_attrs[k]);
								}
							}
						}
					} else if (child.nodeName == "T-IF") {
					}
				}
				child = child.nextSibling;
			}
		});
	});
}

function found_t_hide() {
	const t_hide_list = document.querySelectorAll(`*[t-hide]`);
	Array.from(t_hide_list).map((x) => {
		if (x.getAttribute("t-hide") == "true") {
			x.style.display = "none";
		} else {
			x.style.display = "block";
		}
	});
}

function found_t_if() {
	const t_if_list = document.querySelectorAll(`t-if`);
	Array.from(t_if_list).map((x) => {
		const logic = x.getAttribute("t-logic");
		let ratio = x.getAttribute("t-ratio");
		let ratio2 = x.getAttribute("t-ratios");
		const tdata = document.querySelectorAll("t-data");
		Array.from(tdata).map((y) => {
			// console.log(ratio, ratio2, x, y.innerText, y.getAttribute("t-name"));

			if (ratio == y.getAttribute("t-name")) {
				ratio = y.innerText;
			}
			if (ratio2 == y.getAttribute("t-name")) {
				ratio2 = y.innerText;
				// console.log(y.innerText);
			}
			// console.log("dhi", ratio, ratio2);
			if (logic == ">") {
				if (parseInt(ratio) > parseInt(ratio2)) {
					x.style.display = "block";
				} else {
					x.style.display = "none";
				}
			} else if (logic == "<") {
				if (parseInt(ratio) < parseInt(ratio2)) {
					x.style.display = "block";
				} else {
					x.style.display = "none";
				}
			} else if (logic == "=") {
				if (parseInt(ratio) === parseInt(ratio2)) {
					x.style.display = "block";
				} else {
					x.style.display = "none";
				}
			}
		});
	});
}

function found_t_map() {
	var t_map_list = document.querySelectorAll(`t-map`);

	Array.from(t_map_list).map((x) => {
		var name = x.getAttribute("t-name");

		var things = x.getAttribute("t-list");

		var lists = things.split(";");
		console.log(lists, lists.length);
		var othings = x.childNodes;
		lists.map((y) => {
			console.log(othings);
			othings.forEach((z) => {
				console.log(z);
				x.appendChild(z);
			});
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

window.onload = () => {
	init();
};
