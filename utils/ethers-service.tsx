import { ethers, utils } from 'ethers';
import omitDeep from 'omit-deep';


export const getSigner = (ethersProvider) => {
    return ethersProvider?.getSigner();
}

export const getAddressFromSigner = (ethersProvider) => {
  return getSigner(ethersProvider)._address;
}


export const splitSignature = (signature) => {
    return utils.splitSignature(signature)
}

export const sendTx = (transaction, ethersProvider) => {
  const signer = ethersProvider?.getSigner();
  return signer.sendTransaction(transaction);
}