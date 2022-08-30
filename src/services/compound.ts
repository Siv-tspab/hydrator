import { shortId } from "../utils";
import IGas from "../types/Gas";
import { Contract } from "web3-eth-contract";

export interface ICompound {
    contract: Contract;
    wallet: any;
    gas: IGas;
}

export default async function compound({ contract, wallet, gas }: ICompound) {

    console.log("Starting Compound...\n");

    try {
        const roll = await contract.methods.roll().send({
            from: wallet.address,
            gas: gas.limit,
            gasPrice: gas.price,
        });
        console.log(`Roll status: ${roll.status}, ${shortId(wallet.address)}`);

    } catch (err: any) {
        console.log(`Roll error ${err.message}, ${shortId(wallet.address)}`);
        
        return false;
    }

    return false;
}
