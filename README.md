## Installations:

```shell
yarn add --dev hardhat
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

2. Propose a function:

```shell
yarn hardhat run scripts/propose.ts
```

3. Vote a proposal:

```shell
yarn hardhat run scripts/vote.ts
```

4. Queue and Execute a propsal after voting:

```shell
yarn hardhat run scripts/queue-and-execute.ts
```
