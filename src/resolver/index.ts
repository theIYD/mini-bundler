import path from "path";
import fs from "fs";
import { Resolver } from "../types";

export default function resolveRequest(
	requester: string,
	requestedPath: string
): Resolver {
	let resolvedPath = "",
		relativePath = "";

	if (requestedPath[0] === ".") {
		const joinedPath = path.join(path.dirname(requester), requestedPath);
		const asFile = loadAsFile(joinedPath);
		if (asFile.isFile) {
			return {
				resolvedPath: String(asFile.resolvedPath),
				relativePath: String(asFile.relativePath)
			};
		}

		const asDirectory = loadAsDirectory(joinedPath);
		if (asDirectory.isFile) {
			return {
				resolvedPath: String(asDirectory.resolvedPath),
				relativePath: String(asDirectory.relativePath)
			};
		}
	} else {
		const asPackage = loadAsPackage(requester, requestedPath);
		if (asPackage.isFile) {
			return {
				resolvedPath: String(asPackage.relativePath),
				relativePath: String(asPackage.relativePath)
			};
		}
	}

	return { resolvedPath, relativePath };
}

function loadAsFile(pathWithDir: string) {
	let resolvedPath = "",
		relativePath = "";

	const possibleExtensions = [".js", ".json", ".node"];
	for (let i = 0; i < possibleExtensions.length; i++) {
		const extension = possibleExtensions[i];
		let currentPath = `${path.resolve(pathWithDir)}${extension}`;
		const isPathExists = fs.existsSync(currentPath);

		if (isPathExists) {
			relativePath = `${pathWithDir}${extension}`;
			resolvedPath = currentPath;
			break;
		}
	}

	return {
		resolvedPath,
		relativePath,
		isFile: resolvedPath.length > 0 && relativePath.length > 0
	};
}

function loadAsDirectory(pathWithDir: string) {
	const dirWithIndex = `${pathWithDir}/index`;
	return loadAsFile(dirWithIndex);
}

function loadAsPackage(requester: string, requestPath: string) {
	const requesterParts = requester.split("/");
	const requestPaths = [];
	for (let i = requesterParts.length - 1; i > 0; i--) {
		requestPaths.push(
			requesterParts.slice(0, i).join("/") + "/node_modules"
		);
	}

	const path = require.resolve(requestPath, { paths: requestPaths });

	return {
		relativePath: path,
		isFile: path.length > 0
	};
}
