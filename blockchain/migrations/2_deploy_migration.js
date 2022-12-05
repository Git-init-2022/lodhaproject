const imageUpload = artifacts.require("imageUpload");

module.exports = function(deployer) {
  deployer.deploy(imageUpload);
};
