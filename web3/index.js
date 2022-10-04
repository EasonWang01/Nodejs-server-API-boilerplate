const {
  Contract,
  providers: Providers,
  utils: Utils,
  Wallet,
} = require("ethers");

const { abi } = require("./abis/gemopay.js");

const contractAddress = process.env?.contractAddress; // basic
const mergeContractAddress = process.env?.mergeContractAddress; // Merge NFT contract

const url = "https://cronos-testnet-3.crypto.org:8545";
const provider = new Providers.JsonRpcProvider(url);

const getUserLastestMintedTokenId = async (privateKey, userAddress) => {
  // Load the wallet to deploy the contract with
  const wallet = new Wallet(privateKey, provider);
  var contract = new Contract(contractAddress, abi, wallet);
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userAddress)
      const mintedList = await contract.getUserMintedList(userAddress);
      resolve(mintedList[mintedList.length - 1]?.tokenId?.toNumber() || -1);
    } catch (error) {
      console.log(error)
      console.log(error?.error?.reason);
      reject(error?.error?.reason);
    }
  });
};

const mint = (privateKey, level, type) => {
  return new Promise(async (resolve, reject) => {
    // Load the wallet to deploy the contract with
    const wallet = new Wallet(privateKey, provider);

    var contract = new Contract(contractAddress, abi, wallet);

    try {
      const wei = Utils.parseEther("100");
      const mintAction = await contract.mint(level, type, {
        value: wei,
      });
      resolve(mintAction);
    } catch (error) {
      console.log(error?.error?.reason);
      reject(error?.error?.reason);
      //console.log("error.... ", error) //fires as the contract reverted the payment
    }
  });
};

module.exports = {
  mint,
  getUserLastestMintedTokenId,
};
