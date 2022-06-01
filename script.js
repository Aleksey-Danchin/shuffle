const textarea = document.querySelector("textarea");
const button = document.querySelector("button");

init();

function init() {
	if (location.search.startsWith("?c=")) {
		try {
			const decode = decodeURI(location.search);
			const json = decode.slice(3);
			const str = JSON.parse(json);
			textarea.value = str;
		} catch (e) {}
	}

	textarea.addEventListener("keyup", handler);
	button.addEventListener("click", shuffle);
}

function handler() {
	const sp = new URLSearchParams("");
	sp.set("c", JSON.stringify(textarea.value));
	history.pushState(null, "", "?" + sp.toString());
}

function shuffle() {
	const rows = textarea.value.split("\n");
	const lines = rows.filter((line) => line);

	if (!lines.length) {
		return;
	}

	const shuffled = [];
	while (lines.length) {
		const index = Math.floor(Math.random() * lines.length);
		const line = lines.splice(index, 1)[0];
		shuffled.push(line);
	}

	for (let i = 0; i < rows.length; i++) {
		if (rows[i]) {
			rows[i] = shuffled.pop();
		}
	}

	textarea.value = rows.join("\n");
	handler();
}
