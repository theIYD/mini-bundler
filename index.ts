import { BuildOptions } from "types";
import Module from "./utils/Module";

// Start
function build({ entryFile }: BuildOptions): void {
	const graph = createDependencyGraph(entryFile);
	console.log("graph", graph);
}

function createDependencyGraph(filePath: string): Module {
	return new Module(filePath);
}

build({
	entryFile: "./inputs/index.js"
});
