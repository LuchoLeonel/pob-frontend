import { create } from 'ipfs-core'
import { METADATA } from './dummy_data';
import { v4 as uuidv4 } from 'uuid';

export const sendMetadataToIpfs = async () => {

    const new_metadata_id = uuidv4();
    METADATA.metadata_id = new_metadata_id;
    const data = JSON.stringify(METADATA);

    const node = await create();
    const results = await node.add(data);

    const url: string = "https://ipfs.io/ipfs/" + results.path;
    console.log(url);
    return url;
  
}