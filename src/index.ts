import { getPrivateKeys } from "./utils";
import { checkRollAvailability } from "./services/checker";
import env from "./services/envGetter";

//PARAMS
const PRIVATE_KEYS: string[] = getPrivateKeys(); // GET ALL PRIVATE_KEYS
const POLLING_INTERVAL = parseInt(env("POLLING_INTERVAL"));


console.log(`Polling time: ${POLLING_INTERVAL / 60000} minutes`);
PRIVATE_KEYS.forEach(app);


async function app(currentKey: string) {
    let currently_compounding = false;

    if (!currently_compounding) {
        currently_compounding = await checkRollAvailability({ currentKey, currently_compounding });
    }

    setInterval(async () => {
        if (!currently_compounding) {
            currently_compounding = await checkRollAvailability({ currentKey, currently_compounding });
        }
    }, POLLING_INTERVAL);
}
