
const Identity = artifacts.require("Identities");

module.exports = function (deployer, network, accounts) {
 deployer.deploy(Identity,{from: accounts[0]});

};
