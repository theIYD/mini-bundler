import path from "path";
import fs from "fs";
import { BuildOptions } from "./types";
import Module from "./utils/Module";
import collectModules, { replaceCode } from "./utils/Collect";

// Start
function build({ entryFile, outputFolder }: BuildOptions): void {
	const graph = createDependencyGraph(entryFile);
	const outputCode = bundle(graph);

	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder, { recursive: true });
	}

	fs.writeFileSync(path.join(outputFolder, "bundle.js"), outputCode, "utf-8");
}

function createDependencyGraph(filePath: string): Module {
	return new Module(filePath);
}

function bundle(graph: Module) {
	const modules = collectModules(graph);
	const code = replaceCode(modules);
	return code;
}

build({
	entryFile: "./inputs/index.js",
	outputFolder: "./build"
});
