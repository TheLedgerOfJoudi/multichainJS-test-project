
import { ContractInterface } from 'ethers'

export const rinkbyContractAddress = '0xFCb1aD772ec4CB6d8351dd417008984f9C16E18b'

export const rinkbyContractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "number",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as ContractInterface
