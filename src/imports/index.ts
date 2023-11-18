import Module from "../module";

// Needs lot of improvement here by considering edge cases
export function replaceImports(modules: Module[]) {
	const importMatcher = /.*import[ ]+.+[ ]+from[ ]+'([a-zA-Z_\.\/]+)'.*/gm;
	const importsSeen = new Set();

	let finalCode = "";

	for (let i = modules.length - 1; i >= 0; i--) {
		const currentModule = modules[i];

		let code = currentModule?.content || "";
		const matches = code.matchAll(new RegExp(importMatcher));
		const rawImports = [...matches];

		for (let j = 0; j < rawImports.length; j++) {
			const matchedImport = rawImports[j];
			if (!!!matchedImport?.length) continue;

			const importLine = matchedImport[0];
			if (importsSeen.has(importLine)) {
				// import already parsed
			} else {
				// get code from map
				const importedCode = modules.find(mod =>
					mod.filePath.match(matchedImport[1] as string)
				)?.content;

				if (importedCode && importLine) {
					code = code.replace(importLine, importedCode);
					importsSeen.add(importLine);
				}
			}
		}

		finalCode = code;
	}

	return finalCode;
}
