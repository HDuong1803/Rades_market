# Project information

- Node version: v16.17.0
- NPM version: v8.15.0
- Yarn version: v1.22.17

# Setup environment

- Setup MongoDB
- Install Node.js
- Install Yarn
- Install dependencies: `yarn install`
- Create `.env` file from `.env.example` and fill in the values

`.env` file:

```bash
NETWORK_RPC=YOUR_RPC_URL
PORT=3001
MONGODB_URL=mongodb://localhost:27017
IPFS_PROVIDER_URI=YOUR_IPFS_PROVIDER_URI
IPFS_GATEWAY_URI=YOUR_IPFS_GATEWAY_URI
```

# Run the project

- Run the project: `yarn start`
- Run the project in development mode: `yarn dev`
