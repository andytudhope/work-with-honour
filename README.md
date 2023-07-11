# Work With Honour

This repo hosts the code required for a workshop given at co:operate in Paris, July 2023. 

It walks you through how to gate any content you like with the Honour token (HON). Honour is **not an asset**: it is an obligation. 

When we gate our chats or content with tokens that are assets and which represent the power to govern others, we mix the worst of capitalism with tyranny. 

When, instead, the tokens required to get into any communal space represent a promise to pay back the debt incurred for entry, then the incentive is not to manipulate othersand speculate on price: it is to find the others whom you might serve such that they can forgive your debt. 

## 🏗 Scaffold-ETH 2

🧪 This workshop uses [Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2/), an open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Get Started

To get started, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/andytudhope/work-with-honour.git
cd work-with-honour
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys Honour to your local network.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. This is where we will begin the tutorial. The completed code will be provided in another branch.