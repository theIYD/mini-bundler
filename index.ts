// import path from "path";
// import fs from "fs";
import { BuildOptions } from "./types";
import Module from "./utils/Module";
import collectModules, { replaceCode } from "./utils/Collect";

// Start
function build({ entryFile }: BuildOptions): void {
	const graph = createDependencyGraph(entryFile);
	bundle(graph);

	// for (let i = 0; i < outputFiles.length; i++) {
	// 	const outputFile = outputFiles[i];
	// 	fs.writeFileSync(
	// 		path.join(outputFolder, outputFile?.name),
	// 		outputFile.content,
	// 		"utf-8"
	// 	);
	// }
}

function createDependencyGraph(filePath: string): Module {
	return new Module(filePath);
}

function bundle(graph: Module) {
	const modules = collectModules(graph);
	replaceCode(modules);
	return [];
}

build({
	entryFile: "./inputs/index.js",
	outputFolder: "./build"
});
