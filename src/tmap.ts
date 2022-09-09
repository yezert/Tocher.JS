export function found_t_map() {
	var t_map_list = document.querySelectorAll(`t-map`);

	t_map_list.forEach((t_map: Element) => {
		var name = t_map.getAttribute("t-name");

		var things: any = t_map.getAttribute("t-list");

		var lists = things.split(",");
		console.log(lists, lists.length);
		var t_map_children = Array.from(t_map.childNodes.values());
		var ins = "";
		lists.forEach((y: string) => {
			// let el = document.createElement("div");
			// el.style.color = "blue";
			t_map_children.forEach((chn: ChildNode) => {
				if (chn.nodeType == chn.ELEMENT_NODE) {
					// console.log(chn);
					const n = chn.cloneNode(true);
					// n.style.color = "blue";
					t_map.appendChild(n);
					// console.log(n);
				}
			});
			// t_map.appendChild(el);
		});
	});
}
