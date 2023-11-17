import fs from "fs";
import { parseSync, Module as SWCModule, ImportDeclaration } from "@swc/core";
import resolveRequest from "./Resolve";

class Module {
	private filePath: string;
	private content: string;
	private ast: SWCModule;
	private dependencies: Module[];

	constructor(filePath: string) {
		this.filePath = filePath;
		this.content = fs.readFileSync(filePath, "utf-8");
		this.ast = parseSync(this.content);
		this.dependencies = this.findDependencies();
	}

	findDependencies(): Module[] {
		if (!this.dependencies) {
			return this.ast.body
				.filter(node => node.type === "ImportDeclaration")
				.map((node: ImportDeclaration) => node.source.value)
				.map(relativePath =>
					resolveRequest(this.filePath, relativePath)
				)
				.map(absolutePath => new Module(absolutePath));
		}

		return [];
	}
}

export default Module;
