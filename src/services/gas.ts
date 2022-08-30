import { floor } from "mathjs";
import Web3 from "web3";
import IGas from "../types/Gas";

export default async function calculateGas(web3: Web3): Promise<IGas> {

    const block = await web3.eth.getBlock("latest");
    const gas: IGas = {
        limit: floor(block.gasLimit / block.transactions.length),
        price: Number(await web3.eth.getGasPrice()),
        txCost: 0,
    };

    gas.txCost = gas.price * gas.limit;

    console.log("Total gas cost: ", gas.txCost);

    return gas;
}
