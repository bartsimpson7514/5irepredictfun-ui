// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider, "any");
    // polling every 15 seconds
    library.pollingInterval = 15 * 1000;
    return library;
};

export default getLibrary;
