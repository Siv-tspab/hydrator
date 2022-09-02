# hydrator
## DRIP.community auto-hydrator

This script will automatically compound your DRIP accounts at a pre-determined rate, currently 30 mins.

Enter your private key(s) into the .env file provided. The script is designed to accept a single private key or multiple private keys in a comma separated list ( no spaces )

Consider changing your RPC within the .env file.

## Dev

```
yarn dev
```

__Never share your private keys with anyone, this equates to giving all rights over the account in question.__

__Anyone that has access to these private keys can take any funds located within that wallet, from any chain.__


## Run

```
yarn start
```
