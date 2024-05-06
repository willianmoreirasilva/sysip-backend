import { separateNetworkIp } from "../types/SeparateNetworkIp";

export const separeteAddress = (address: string): separateNetworkIp  => {
    
    const separeteAddress: separateNetworkIp =  { networkAddress: '', IpAddress: '' } 

    let array = address.split('.');
    let onlyIp = array [array.length -1];
    array [array.length -1]= '0';
    
    separeteAddress.networkAddress = array.join('.');
    separeteAddress.IpAddress = onlyIp;
    
    return separeteAddress;

}

export const separeteNetwork = (address: string)   => {

    let array = address.split('.');
    array.pop();
    const addressNetwork = array.join('.');
    return addressNetwork;

   
    
}