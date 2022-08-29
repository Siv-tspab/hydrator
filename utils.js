import dotenv from "dotenv";

export function getPrivateKeys() {
    dotenv.config({ path: ".env.local" });
    return process.env.PRIVATE_KEYS;
};

export function shortId(str) {
    return str.substr(0, 6) + "..." + str.substr(36, 42);
};