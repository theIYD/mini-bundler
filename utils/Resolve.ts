import path from "path"

export default function resolveRequest(requester: string, requestedPath: string): string {
    return path.join(path.dirname(requester), requestedPath)
}