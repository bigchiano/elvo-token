const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider")
require("dotenv").config()

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => 
        new HDWalletProvider(
          process.env.RINKEBY_DEPLOYER_SECRET_KEY,
          process.env.RINKEBY_URL
        ),
      network_id: 4
    }
  }
};
