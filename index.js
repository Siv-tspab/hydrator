const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
const math = require("mathjs");
require("dotenv").config();


function shortId(str) {
    return str.substr(0, 6) + "..." + str.substr(36, 42);
}


//WEB3 Config
const web3 = new Web3(process.env.RPC_URL); // INIT WEB3
const PRIVATE_KEYS = process.env.PRIVATE_KEYS.split(","); // GET ALL PRIVATE_KEYS
const FAUCET_CONTRACT = process.env.FAUCET_CONTRACT; // CONTRACT ADDRESS
const ABI = require("./ABI.json"); // SMART CONTRACT ABI
const contract = new web3.eth.Contract(ABI, FAUCET_CONTRACT); // CONTRACT OBJECTS


// CONFIG
const POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL);
const AVAILABLE_THRESHOLD = parseInt(process.env.AVAILABLE_THRESHOLD);


console.log(`Polling time: ${POLLING_INTERVAL / 60000} minutes`);

PRIVATE_KEYS.forEach((element, index) => {
    var wallet = web3.eth.accounts.wallet.add(PRIVATE_KEYS[index]);
    let currently_compounding = false;
    async function checkRollAvailability() {
        if (currently_compounding) return;
        try {
            const claimsAvailable = await contract.methods.claimsAvailable(wallet.address).call();

            var gasPrice = await web3.eth.getGasPrice();
            var block = await web3.eth.getBlock("latest");
            var gasLimit = math.floor(block.gasLimit / block.transactions.length);

            const txCost = gasPrice * gasLimit;
            console.log("Total gas cost: ", txCost);

            // if over 0.5 DRIP available, hydrate
            if (claimsAvailable > AVAILABLE_THRESHOLD) {
                console.log(`Time to compound ${web3.utils.fromWei(claimsAvailable.toString(), "ether")} DRIP!, ${shortId(wallet.address)}`);
                currently_compounding = true;
                console.log(`gas Price: ${gasPrice}`);
                compound();
                setTimeout(() => {
                    console.log("\nSleeping 1 second\n");
                }, 1000);
            } else {
                console.log(`Not ready to compound ${web3.utils.fromWei(claimsAvailable.toString(), "ether")} DRIP, ${shortId(wallet.address)}`);
            }
        } catch (err) {
            console.log(`Didn't roll any Drip (err, ${shortId(wallet.address)})\n`);
            return;
        }

        async function compound() {
            console.log("Starting Compound...\n");

            try {
                const roll = await contract.methods.roll().send({
                    from: wallet.address,
                    gas: gasLimit,
                    gasPrice: gasPrice,
                });
                console.log(`Roll status: ${roll.status}, ${shortId(wallet.address)}`);
            } catch (err) {
                currently_compounding = false;
                console.log(`Roll error ${err.message}, ${shortId(wallet.address)}`);
                return;
            }

            currently_compounding = false;
        }
    }

    checkRollAvailability();
    setInterval(async () => {
        await checkRollAvailability();
    }, POLLING_INTERVAL);
});
