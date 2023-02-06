## Installations:

```shell
yarn add --dev hardhat
yarn add --dev hardhat-deploy
yarn add --dev @openzeppelin/contracts
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
yarn add --dev typescript typechain ts-node @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node
yarn add --dev @chainlink/contracts
```

## Interact with contracts:

1. Run a local node:

```shell
yarn hardhat node
```

2. Fund the campaign:

```shell
yarn hardhat run scripts/fund.ts
```

3. Propose a function:

```shell
yarn hardhat run scripts/propose.ts
```

4. Vote a proposal:

```shell
yarn hardhat run scripts/vote.ts
```

5. Queue and Execute a propsal after voting:

```shell
yarn hardhat run scripts/queue-and-execute.ts
```
