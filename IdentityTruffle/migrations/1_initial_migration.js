const Migrations = artifacts.require("Migrations");
const Identity = artifacts.require("Identity");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Identity);

};
