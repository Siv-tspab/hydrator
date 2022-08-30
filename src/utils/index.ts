import env from "../services/envGetter";

export function getPrivateKeys(): string[] {
    return env("PRIVATE_KEYS")?.split(",") || [""];
}

export function shortId(str: string): string {
    return str.substring(0, 6) + "..." + str.substring(36, 42);
}
