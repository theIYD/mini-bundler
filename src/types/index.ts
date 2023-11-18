import { Module as SWCModule } from "@swc/core";

export type BuildOptions = {
	entryFile: string;
	outputFolder: string;
};

export interface ModuleInterface {
	filePath: string;
	content: string;
	ast: SWCModule;
	dependencies: ModuleInterface[];
}

export type Resolver = {
	resolvedPath: string;
	relativePath: string;
};
