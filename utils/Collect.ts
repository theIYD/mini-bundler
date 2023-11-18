import Module from "./Module";

function collect(currentModule: Module, modules: Module[]) {
	modules.push(currentModule);

	for (let i = 0; i < currentModule.dependencies.length; i++) {
		const currentDependency = currentModule.dependencies[i];
		if (currentDependency) {
			collect(currentDependency, modules);
		}
	}
}

export default function collectModules(graph: Module) {
	const modules: Module[] = [];
	collect(graph, modules);
	return modules;
}

export function replaceCode(modules: Module[]) {
	const importMatcher = /.*import[ ]+.+[ ]+from[ ]+'([a-zA-Z_\.\/]+)'/gm;
	const importsSeen = new Set();

	// console.log("modules", modules);

	for (let i = modules.length - 1; i >= 0; i--) {
		const currentModule = modules[i];

		let code = currentModule?.content || "";
		const matches = code.matchAll(new RegExp(importMatcher));
		const rawImports = [...matches];

		// console.log("rawImports", rawImports);

		for (let j = 0; j < rawImports.length; j++) {
			const matchedImport = rawImports[j];
			if (!!!matchedImport?.length) continue;

			const importLine = matchedImport[0];
			if (importsSeen.has(importLine)) {
				// import already parsed
			} else {
				// console.log("am i here ?");
				// get code from map
				const importedCode = modules.find(mod =>
					mod.filePath.match(matchedImport[1] as string)
				)?.content;

				// console.log("importedCode", importedCode);

				if (importedCode && importLine) {
					code = code.replace(importLine, importedCode);
					console.log(importLine, " inserted");
					importsSeen.add(importLine);
				}
			}
		}

		console.log("code", code);
	}

	let moduleMap = "";
	// console.log("modules", modules);

	return moduleMap;
}
