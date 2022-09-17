import { getSigner } from './ethers-service';
import { ethers } from 'ethers';
import { LENS_HUB_ABI } from './lens-hub-abi';

const LENS_HUB_CONTRACT_ADDRESS = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

export const createLensHub = (ethersProvider: any) => {
    const lensHub = new ethers.Contract(
        LENS_HUB_CONTRACT_ADDRESS,
        LENS_HUB_ABI,
        getSigner(ethersProvider)
    )
    return lensHub
}
