import env from "./envGetter";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import ABI from "../../ABI.json"; // SMART CONTRACT ABI
import Web3 from "web3";

export default function web3Provider(): { web3: Web3; contract: Contract } {
    const web3 = new Web3(env("RPC_URL")); // INIT WEB3
    const FAUCET_CONTRACT = env("FAUCET_CONTRACT"); // CONTRACT ADDRESS
    const contract: Contract = new web3.eth.Contract(ABI as AbiItem[], FAUCET_CONTRACT); // CONTRACT OBJECTS

    return { web3, contract };
}
