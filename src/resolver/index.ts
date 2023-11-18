import path from "path";
import fs from "fs";
import { Resolver } from "../types";

export default function resolveRequest(
	requester: string,
	requestedPath: string
): Resolver {
	const joinedPath = path.join(path.dirname(requester), requestedPath);
	let resolvedPath = "",
		relativePath = "";

	const possibleExtensions = ["", ".js", ".json", ".node"];
	for (let i = 0; i < possibleExtensions.length; i++) {
		const extension = possibleExtensions[i];
		let currentPath = `${path.resolve(joinedPath)}${extension}`;
		const isPathExists = fs.existsSync(currentPath);

		if (isPathExists) {
			relativePath = `${joinedPath}${extension}`;
			resolvedPath = currentPath;
			break;
		}
	}

	return { resolvedPath, relativePath };
}
