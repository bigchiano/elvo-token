var token = artifacts.require("./Token.sol");

module.exports = function(deployer) {
  deployer.deploy(token);
};
