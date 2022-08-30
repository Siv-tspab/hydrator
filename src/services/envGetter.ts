import { config } from "dotenv";
config();

/**
 * Get the environnement variable from .env file
 * @param variable string
 * @return string
 */
export default function env(variable: string): string {
    return String(process.env[variable]);
}
