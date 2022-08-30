import compound from "./compound";
import IGas from "../types/Gas";
import calculateGas from "./gas";
import { shortId } from "../utils";
import env from "./envGetter";
import web3Provider from "./web3Provider";


const { web3, contract } = web3Provider(); // INIT WEB3
const AVAILABLE_THRESHOLD: number = parseInt(env("AVAILABLE_THRESHOLD"));


export interface IChecker {
    currentKey: string;
    currently_compounding: boolean;
}


export async function checkRollAvailability({ currentKey, currently_compounding }: IChecker): Promise<boolean> {

    const wallet = web3.eth.accounts.wallet.add(currentKey);

    try {

        const claimsAvailable: number = parseInt(await contract.methods.claimsAvailable(wallet.address).call());
        const gas: IGas = await calculateGas(web3);
        
        if (claimsAvailable > AVAILABLE_THRESHOLD) {
            console.log(`Time to compound ${web3.utils.fromWei(claimsAvailable.toString(), "ether")} DRIP!, ${shortId(wallet.address)}`);
            console.log(`gas Price: ${gas.price}`);

            currently_compounding = await compound({ contract, wallet, gas });

        } else {
            console.log(`Not ready to compound ${web3.utils.fromWei(claimsAvailable.toString(), "ether")} DRIP, ${shortId(wallet.address)}`);
        }
    } catch (err) {
        console.log(`Didn't roll any Drip (err, ${shortId(wallet.address)})\n`);

        currently_compounding = false;
    }
    return currently_compounding;
}
