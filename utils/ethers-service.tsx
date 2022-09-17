import { ethers, utils } from 'ethers';


export const getSigner = (ethersProvider: any) => {
    return ethersProvider?.getSigner();
}

export const getAddressFromSigner = (ethersProvider: any) => {
  return getSigner(ethersProvider)._address;
}


export const splitSignature = (signature: any) => {
    return utils.splitSignature(signature)
}

export const sendTx = (transaction: any, ethersProvider: any) => {
  const signer = ethersProvider?.getSigner();
  return signer.sendTransaction(transaction);
}