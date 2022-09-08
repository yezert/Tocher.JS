export function found_t_map() {
	var t_map_list = document.querySelectorAll(`t-map`);

	t_map_list.forEach((x: any) => {
		var name = x.getAttribute("t-name");

		var things: any = x.getAttribute("t-list");

		var lists = things.split(",");
		console.log(lists, lists.length);
		var othings = x.children;
		var ins = "";

		lists.map((y: string) => {
			console.log(y);
		});
	});

	console.log("hello found_t_map");
}
