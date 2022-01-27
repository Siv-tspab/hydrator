# hydrator
## Drip.community auto-hydrator

This script will automatically compound your DRIP accounts at a pre-determined rate, currently 30 mins.

Enter your private key(s) into the .env file provided.

Consider changing your RPC within the .env file.

## Build

```
yarn build
```

__Never share your private keys with anyone, this equates to giving all rights over the account in question.__

__Anyone that has access to these private keys can take any funds located within that wallet, from any chain.__


## Run

```
node hydrate.js
```
