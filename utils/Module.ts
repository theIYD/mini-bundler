import fs from "fs";
import { parseSync, Module as SWCModule, ImportDeclaration } from "@swc/core";
import resolveRequest from "./Resolve";

class Module {
	public filePath: string;
	public content: string;
	public ast: SWCModule;
	public dependencies: Module[];

	constructor(filePath: string) {
		this.filePath = filePath;
		this.content = this.readFile(filePath);
		this.ast = parseSync(this.content);
		this.dependencies = this.findDependencies();
	}

	readFile(filePath: string) {
		let code = fs.readFileSync(filePath, "utf-8");
		return this.cleanUpExports(code);
	}

	cleanUpExports(code: string) {
		let exportMatcher = /.*(export).*/gi;
		let match = null;
		do {
			match = exportMatcher.exec(code);
			if (match) {
				code = code.replace(match[0], "");
			}
		} while (match != null);

		return code;
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
