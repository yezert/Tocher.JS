var to_js_list = document.getElementsByClassName("to-js");

const t_data_list = document.querySelectorAll("t-data");
// alltdata.style.display = "none";
console.log(t_data_list);

var data = "";

var newdata = Array.from(t_data_list).map((x) => {
	//let tcvalue = alltjs.getAttribute("tocher-value");
	x.style.display = "none";
	console.log(x);

	// data = x.innerText;

	// console.log("data::", data);
	// let a = (x.x.innerText = a);
	// x.setAttribute("value", a);
	return x;
});

console.log(newdata);

function change_t_value() {
	Array.from(to_js_list).map((to_js) => {
		//let tcvalue = alltjs.getAttribute("tocher-value");
		let tvalue = to_js.getAttribute("t-value");
		const [t_data] = newdata.filter((y, index) => {
			let dataname = y.getAttribute("t-name");
			console.log(`filter ${index}`, dataname, tvalue);
			return dataname == tvalue;
		});
		// console.log(`~~~ ${d}`, d);
		if (t_data) {
			// console.log(
			// 	"aaa::",
			// 	newdata.filter((y) => y !== tvalue),
			// 	a
			// );
			to_js.innerText = t_data.innerText;
			to_js.setAttribute("value", t_data.innerText);
			to_js.style.display = "";

			console.log("tyrp:", to_js.nodeName == "INPUT");
			// if (to_js.nodeName == "INPUT") {
			// 	to_js.innerText = "";
			// 	to_js.setAttribute("value", t_data.innerText);
			// }
			console.log(`~~~ `, to_js, t_data);
		} else {
			// let a = newdata.filter((ry) => ry !== x.innerText);
			console.log("filter:::", tvalue);
			to_js.innerText = tvalue;

			console.log("tyrp:", to_js);
			to_js.setAttribute("value", tvalue);
			// for (var ty in newdata) {
			// 	console.log(ty);
			// 	if (to_js.innerText == ty) {
			// 		to_js.innerText = ty;
			// 		to_js.setAttribute("value", ty);
			// 	} else {
			// 		to_js.innerText = "unexpected";
			// 	}
			// }
			// x.innerText = a;
			// x.setAttribute("value", a);
		}
	});
}
console.log("www");

function Tchangevalue(valuename, what) {
	// console.log(event.target);
	// var button = event.target;
	const [change_data] = Array.from(newdata).filter((data) => {
		console.log("data", data.innerText, "and", data.getAttribute("t-name"));
		if (data.getAttribute("t-name") == valuename) {
			return true;
		} else {
			return false;
		}
	});
	// console.log(change_data);
	change_data.innerText = what;
	// console.log(change_data.innerText);
	// newdata;
	// console.log(newdata);
	const t_data_list = document.querySelectorAll(`*[t-value="${valuename}"]`);
	t_data_list.forEach((x) => {
		console.log(x, x.getAttribute("t-value"), "<<<< before");
	});
	t_data_list.forEach((data) => {
		data.setAttribute("t-value", what);
		change_t_value();
	});
	t_data_list.forEach((x) => {
		console.log(x, x.getAttribute("t-value"), "<<<< after");
	});
}

function T_operating(valuename, number) {
	var time = 0;

	if (time == 0) {
		const [change_data] = Array.from(newdata).filter((data) => {
			console.log("data", data.innerText, "and", data.getAttribute("t-name"));
			if (data.getAttribute("t-name") == valuename) {
				return true;
			} else {
				return false;
			}
		});
		if (change_data) {
			console.log(change_data, valuename, number, "test");
			// change_data.innerText = change_data.innerText + operating;
			//operating;
			// console.log(change_data.innerText);
			// newdata;
			// console.log(newdata);
			var opn = Number.parseInt(change_data.innerText) + number;
			const t_data_list = document.querySelectorAll(`*[t-value="${valuename}"]`);
			t_data_list.forEach((x) => {
				console.log(x, x.getAttribute("t-value"), "<<<< before");
			});
			t_data_list.forEach((data) => {
				data.setAttribute("t-value", opn);
				change_t_value();
			});
			t_data_list.forEach((x) => {
				console.log(x, x.getAttribute("t-value"), "<<<< after");
			});
		}
		time++;
	} else {
		const [change_data] = Array.from(newdata).filter((data) => {
			console.log("data", data.innerText, "and", data.getAttribute("t-name"));
			if (data.getAttribute("t-name") == valuename) {
				return true;
			} else {
				return false;
			}
		});
		if (change_data) {
			console.log(change_data, valuename, number, "test");
			// change_data.innerText = change_data.innerText + operating;
			//operating;
			// console.log(change_data.innerText);
			// newdata;
			// console.log(newdata);
			const t_data_list = document.querySelectorAll(`*[t-value="${opn}"]`);
			opn = Number.parseInt(change_data.innerText) + number;
			t_data_list.forEach((x) => {
				console.log(x, x.getAttribute("t-value"), "<<<< before");
			});
			t_data_list.forEach((data) => {
				data.setAttribute("t-value", opn);
				change_t_value();
			});
			t_data_list.forEach((x) => {
				console.log(x, x.getAttribute("t-value"), "<<<< after");
			});
		}
	}
}

change_t_value();
