// var to_js_list = document.getElementsByClassName("tos");

const t_data_list = document.querySelectorAll("t-data");

const t_components_list = document.querySelectorAll("t-components");

const t_components_exs = document.querySelectorAll("t-export");

// alltdata.style.display = "none";
// console.log(t_data_list);

var data = "";

function init_compenents() {
	Array.from(t_components_exs).map((at) => {
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
		Array.from(t_values)
			// .filter((elem) => {
			// 	const tval = elem.getAttribute("t-value");
			// 	return tval.includes(`{${valuename.getAttribute("")}}`);
			// })
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
			found_t_value(valuename);
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
		console.log("[<t-components>]", t_comp);
		// t_comp.style.display = "none";

		const comp_name = t_comp.getAttribute("t-name");
		let exports_has = {};
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

						const re = /\{[^\}]+\}/g;
						const t_val = new_child.getAttribute("t-value");
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

window.onload = () => {
	found_t_value();
	get_components();
	init_compenents();
	found_t_hide();
};

// // console.log(x, "<<<t-export");
// let target_div = t_exp.nextElementSibling;
// while (target_div) {
// 	const target_tval_attr = document.querySelectorAll("t-export");
// 	Array.from(target_tval_attr).map((a) => {
// 		console.log(a, "<<<a");

// 		// const re = /\{[^\}]+\}/g;
// 		const attr_kstr_arr = a.innerText; // .match(re)
// 		console.log(attr_kstr_arr, a, "<<<attr_kstr_arr");
// 		if (attr_kstr_arr) {
// 			const attr_kstr = attr_kstr_arr;
// 			const kid = attr_kstr; //.substring(1, attr_kstr.length - 1);
// 			console.log(kid, attr_kstr);
// 			document.querySelectorAll(`${tct}[${kid}]`).forEach((acom) => {
// 				const k_val = acom.getAttribute(`${kid}`);
// 				// console.log(acom_val, a, k, "<<<acom[]");
// 				target_div.innerText = k_val;
// 			});
// 		}
// 	});

// 	target_div = target_div.nextElementSibling;
// }

// });

// const t_components_exs = document.querySelectorAll("t-export");
// // const in_c_value = t_components_list.getAttribute("t-value");
// const exl = Array.from(t_components_exs).map((t_ex) => {
// 	t_ex.display = "none";
// 	return t_ex.innerText;
// });

// console.log(exl);
// Array.from(t_components_list).map((t_com) => {
// 	const inctv = t_com.getAttribute("t-value");
// 	t_com.style.display = "none";
// 	var t_name = t_com.getAttribute("t-name");
// 	console.log(t_com, t_name);
// 	const t_com_name = document.querySelectorAll(t_name);
// 	Array.from(t_com_name).map((t_com_namin) => {
// 		t_com_namin.innerHTML = t_com.innerHTML;
// 		console.log(t_com_namin.innerHTML);
// 	});

// 	console.log(t_com_name);
// });
// encode = "aa{ddsdd}gh";
// var re = /\{[^\}]+\}/g;
// encode = encode.match(re)[0];
// encode = encode.substring(1, encode.length - 1); //ddsdd
// console.log(encode);
// let a = "0";
// let str = "aaa {" + a + "}";

// var nstr = str.replace(re, "coffey");

// console.log(nstr);

// function old_Topn(valuename, number) {
// 	var time = 0;
// 	if (time == 0) {
// 		const [change_data] = Array.from(newdata).filter((data) => {
// 			console.log("data", data.innerText, "and", data.getAttribute("t-name"));
// 			if (data.getAttribute("t-name") == valuename) {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		});
// 		if (change_data) {
// 			console.log(change_data, valuename, number, "test");
// 			// change_data.innerText = change_data.innerText + operating;
// 			//operating;
// 			// console.log(change_data.innerText);
// 			// newdata;
// 			// console.log(newdata);
// 			var opn = Number.parseInt(change_data.innerText) + number;
// 			const t_data_list = document.querySelectorAll(`*[t-value="${valuename}"]`);
// 			t_data_list.forEach((x) => {
// 				console.log(x, x.getAttribute("t-value"), "<<<< before");
// 			});
// 			t_data_list.forEach((data) => {
// 				// data.setAttribute("t-value", opn);
// 				found_t_value();
// 			});
// 			t_data_list.forEach((x) => {
// 				console.log(x, x.getAttribute("t-value"), "<<<< after");
// 			});
// 		}
// 		time++;
// 	} else {
// 		const [change_data] = Array.from(newdata).filter((data) => {
// 			console.log("data", data.innerText, "and", data.getAttribute("t-name"));
// 			if (data.getAttribute("t-name") == valuename) {
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		});
// 		if (change_data) {
// 			console.log(change_data, valuename, number, "test");
// 			// change_data.innerText = change_data.innerText + operating;
// 			//operating;
// 			// console.log(change_data.innerText);
// 			// newdata;
// 			// console.log(newdata);
// 			const t_data_list = document.querySelectorAll(`*[t-value="${opn}"]`);
// 			opn = Number.parseInt(change_data.innerText) + number;
// 			t_data_list.forEach((x) => {
// 				console.log(x, x.getAttribute("t-value"), "<<<< before");
// 			});
// 			t_data_list.forEach((data) => {
// 				data.setAttribute("t-value", opn);
// 				found_t_value();
// 			});
// 			t_data_list.forEach((x) => {
// 				console.log(x, x.getAttribute("t-value"), "<<<< after");
// 			});
// 		}
// 	}
// }

// function oldChangevalue(valuename, what) {
// 	console.log(event.target);
// 	var button = event.target;
// 	const [change_data] = Array.from(newdata).filter((data) => {
// 		console.log("data", data.innerText, "and", data.getAttribute("t-name"));
// 		if (data.getAttribute("t-name") == valuename) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	});
// 	// console.log(change_data);
// 	change_data.innerText = what;
// 	// console.log(change_data.innerText);
// 	// newdata;
// 	// console.log(newdata);
// 	const t_data_list = document.querySelectorAll(`*[t-value="${valuename}"]`);
// 	t_data_list.forEach((x) => {
// 		console.log(x, x.getAttribute("t-value"), "<<<< before");
// 	});
// 	t_data_list.forEach((data) => {
// 		// data.setAttribute("t-value", what);
// 		found_t_value();
// 	});
// 	t_data_list.forEach((x) => {
// 		console.log(x, x.getAttribute("t-value"), "<<<< after");
// 	});
// }

// let nac = /\{[^\)]+\}/g;

// let vars = "sew{aaa}";

// var a = a.match(nac)[0];

// a = a.substring(1, a.length - 1);

// console.log(a);

// function old_found_t_value() {
// 	Array.from(to_js_list).map((to_js) => {
// 		//let tcvalue = alltjs.getAttribute("tocher-value");
// 		let tvalue = to_js.getAttribute("t-value");
// 		const [t_data] = newdata.filter((y, index) => {
// 			let dataname = y.getAttribute("t-name");
// 			console.log(`filter ${index}`, dataname, tvalue);
// 			return dataname == tvalue;
// 		});
// 		// console.log(`~~~ ${d}`, d);
// 		if (t_data) {
// 			// console.log(
// 			// 	"aaa::",
// 			// 	newdata.filter((y) => y !== tvalue),
// 			// 	a
// 			// );
// 			let h_t_value = to_js.getAttribute("t-value");
// 			var found_var_value = /\{[^\}]+\}/g;

// 			var var_value = h_t_value;
// 			var now_var_value = var_value.replace(var_value, t_data.innerText);
// 			console.log("before::" + var_value);
// 			console.log("now::" + now_var_value);
// 			to_js.innerText = now_var_value;
// 			to_js.setAttribute("value", t_data.innerText);
// 			to_js.style.display = "";

// 			console.log("tyrp:", to_js.nodeName == "INPUT");
// 			// if (to_js.nodeName == "INPUT") {
// 			// 	to_js.innerText = "";
// 			// 	to_js.setAttribute("value", t_data.innerText);
// 			// }
// 			console.log(`~~~ `, to_js, t_data);
// 		} else {
// 			// let a = newdata.filter((ry) => ry !== x.innerText);
// 			console.log("filter:::", tvalue);
// 			to_js.innerText = tvalue;

// 			console.log("tyrp:", to_js);
// 			to_js.setAttribute("value", tvalue);
// 			// for (var ty in newdata) {
// 			// 	console.log(ty);
// 			// 	if (to_js.innerText == ty) {
// 			// 		to_js.innerText = ty;
// 			// 		to_js.setAttribute("value", ty);
// 			// 	} else {
// 			// 		to_js.innerText = "unexpected";
// 			// 	}
// 			// }
// 			// x.innerText = a;
// 			// x.setAttribute("value", a);
// 		}
// 	});
// }
