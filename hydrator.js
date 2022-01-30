const fs = require('fs');
const path = require('path');
require('dotenv').config()
const Web3 = require('web3')

function shortId(str, size) {
        return str.substr(0, 6) + '...' + str.substr(36,42);
}
const P =  process.env.PRIVATE_KEYS.split(",") ;

//WEB3 Config
const web3 = new Web3(process.env.RPC_URL);
const POLLING_INTERVAL = 1800000 // 30 mins in milliseconds;
let i = 0;
let y = 0;
console.log("\nDDDDDDDDDDDDD      RRRRRRRRRRRRRRRRR   IIIIIIIIIIPPPPPPPPPPPPPPPPP   \nD::::::::::::DDD   R::::::::::::::::R  I::::::::IP::::::::::::::::P  \nD:::::::::::::::DD R::::::RRRRRR:::::R I::::::::IP::::::PPPPPP:::::P \nDDD:::::DDDDD:::::DRR:::::R     R:::::RII::::::IIPP:::::P     P:::::P\n  D:::::D    D:::::D R::::R     R:::::R  I::::I    P::::P     P:::::P\n  D:::::D     D:::::DR::::R     R:::::R  I::::I    P::::P     P:::::P\n  D:::::D     D:::::DR::::RRRRRR:::::R   I::::I    P::::PPPPPP:::::P \n  D:::::D     D:::::DR:::::::::::::RR    I::::I    P:::::::::::::PP  \n  D:::::D     D:::::DR::::RRRRRR:::::R   I::::I    P::::PPPPPPPPP    \n  D:::::D     D:::::DR::::R     R:::::R  I::::I    P::::P            \n  D:::::D     D:::::DR::::R     R:::::R  I::::I    P::::P            \n  D:::::D    D:::::D R::::R     R:::::R  I::::I    P::::P            \nDDD:::::DDDDD:::::DRR:::::R     R:::::RII::::::IIPP::::::PP          \nD:::::::::::::::DD R::::::R     R:::::RI::::::::IP::::::::P          \nD::::::::::::DDD   R::::::R     R:::::RI::::::::IP::::::::P          \nDDDDDDDDDDDDD      RRRRRRRR     RRRRRRRIIIIIIIIIIPPPPPPPPPP\n");          
                                                                  
console.log("DRIP.community Auto Hydrator/compounder consider joining t.me/DRIPSTARS a.k.a DRIP-TEAM-ALPHA\n");

console.log("If you find this script useful, consider donating to the developers:\n0xE1751655b290C573573eB1E14358C3E092AaA467 \n")

console.log(`Polling time: ${POLLING_INTERVAL / 60000} minutes`);

P.forEach(element => {
        //SMART CONTRACT ABI
        const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_src","type":"address"},{"indexed":true,"internalType":"address","name":"_dest","type":"address"},{"indexed":false,"internalType":"uint256","name":"_deposits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_payouts","type":"uint256"}],"name":"BalanceTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"}],"name":"BeneficiaryUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Checkin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DirectPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"HeartBeat","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"interval","type":"uint256"}],"name":"HeartBeatIntervalUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"referrals","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_deposits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_payouts","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_structure","type":"uint256"}],"name":"Leaderboard","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LimitReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"manager","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ManagerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MatchPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"NewAirdrop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"}],"name":"Upline","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"stateMu

        //Contract address
        const Faucet_Contract="0xffe811714ab35360b67ee195ace7c10d93f89d8c"

        //Contract objects
        const contract = new web3.eth.Contract(ABI, Faucet_Contract)

        var wallet = web3.eth.accounts.wallet.add(P[i]);
        let currently_compounding = false
        async function checkRollAvailability(){
                if(currently_compounding) return
                try{
                        const claimsAvailable = await contract.methods.claimsAvailable(wallet.address).call()

                        var gasLimit = 400000
                        var gasPrice = await web3.eth.getGasPrice()
                        const txCost = web3.utils.fromWei(gasPrice.toString(),'ether') * gasLimit
                        console.log('Total gas cost: ', txCost)

                        // if over 0.5 DRIP available, hydrate
                        if(claimsAvailable > 512500000000000000) {
                                console.log(`Time to compound ${web3.utils.fromWei(claimsAvailable.toString(),'ether')} DRIP! ${shortId(wallet.address)}`)
                                currently_compounding = true
                                console.log(`gas Price: ${gasPrice}`)
                                compound()
                                setTimeout(() => {console.log("\nSleeping 1 second\n")}, 1000);
                        }
                        else{
                                console.log(`Not ready to compound ${web3.utils.fromWei(claimsAvailable.toString(),'ether')} DRIP ${shortId(wallet.address)}`)
                        }
                } catch (err){
                        console.log(`Didn't roll any Drip (err, ${shortId(wallet.address)})\n`)
                        return
                }

                async function compound(){
                        console.log('Starting Compound...\n')

                        try{
                                const roll = await contract.methods.roll().send(
                                        {
                                                from: wallet.address,
                                                gas: gasLimit,
                                                gasPrice: gasPrice
                                        }
                                )
                                console.log(`Roll status: ${roll.status}, shortId(wallet.address)`)
                        } catch (err){
                                currently_compounding = false
                                console.log(`Roll error ${err.message}`)
                                return
                        }

                        currently_compounding = false
                }
        }

//rechecks every 30mins. Adjust accordingly in Milliseconds
checkRollAvailability()
setInterval(async () => { await checkRollAvailability() }, POLLING_INTERVAL)
i++
});
