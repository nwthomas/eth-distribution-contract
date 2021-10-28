/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  EthDistributor,
  EthDistributorInterface,
} from "../EthDistributor";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_contributionLimit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumContribution",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maximumContributors",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Contribution",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Distribution",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "contributionLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "contributionsPerAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "contributors",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "distributeEther",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasContributed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maximumContributors",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumContribution",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newContributionLimit",
        type: "uint256",
      },
    ],
    name: "updateContributionLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllAddressEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040526000600260006101000a81548160ff021916908315150217905550670de0b6b3a76400006003553480156200003857600080fd5b50604051620025863803806200258683398181016040528101906200005e9190620002ed565b6200007e62000072620000ad60201b60201c565b620000b560201b60201c565b6001808190555062000096836200017960201b60201c565b8060068190555081600581905550505050620004f4565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b62000189620000ad60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16620001af620002ad60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff161462000208576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001ff90620003da565b60405180910390fd5b600260009054906101000a900460ff16156200025b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200025290620003fc565b60405180910390fd5b600354811115620002a3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200029a90620003b8565b60405180910390fd5b8060048190555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600081519050620002e781620004da565b92915050565b6000806000606084860312156200030357600080fd5b60006200031386828701620002d6565b93505060206200032686828701620002d6565b92505060406200033986828701620002d6565b9150509250925092565b6000620003526035836200041e565b91506200035f8262000439565b604082019050919050565b6000620003796020836200041e565b9150620003868262000488565b602082019050919050565b6000620003a06020836200041e565b9150620003ad82620004b1565b602082019050919050565b60006020820190508181036000830152620003d38162000343565b9050919050565b60006020820190508181036000830152620003f5816200036a565b9050919050565b60006020820190508181036000830152620004178162000391565b9050919050565b600082825260208201905092915050565b6000819050919050565b7f546865206e657720636f6e747269627574696f6e206c696d6974206d7573742060008201527f6265206c657373207468616e2031302065746865720000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f54686520636f6e74726163742069732063757272656e746c79206c6f636b6564600082015250565b620004e5816200042f565b8114620004f157600080fd5b50565b61208280620005046000396000f3fe6080604052600436106100ab5760003560e01c806381b0f9a71161006457806381b0f9a7146105885780638da5cb5b146105c5578063937e09b1146105f0578063a71404261461061b578063f2fde38b14610646578063f6c99acb1461066f57610487565b8063205b19461461048c5780633cb5d100146104c9578063494bf60814610506578063715018a61461051d5780637332e0771461053457806374bcedf01461055f57610487565b3661048757600260009054906101000a900460ff1615610100576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100f790611a04565b60405180910390fd5b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168061016b575060065460016007805490506101689190611b11565b11155b6101aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101a190611a24565b60405180910390fd5b600034600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546101f79190611b11565b905060055434101561020a600554610679565b60405160200161021a91906118ec565b6040516020818303038152906040529061026a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102619190611982565b60405180910390fd5b506004548111156102b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a790611a84565b60405180910390fd5b34600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546102fb9190611b11565b600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661044b576001600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506007339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b7f4d154d4aae216bed6d0926db77c00df2b57c6b5ba4eee05775de20facede3a7b333460405161047c92919061193e565b60405180910390a150005b600080fd5b34801561049857600080fd5b506104b360048036038101906104ae9190611682565b61084e565b6040516104c09190611967565b60405180910390f35b3480156104d557600080fd5b506104f060048036038101906104eb91906116ab565b61086e565b6040516104fd9190611923565b60405180910390f35b34801561051257600080fd5b5061051b6108ad565b005b34801561052957600080fd5b50610532610cf8565b005b34801561054057600080fd5b50610549610d80565b6040516105569190611ac4565b60405180910390f35b34801561056b57600080fd5b50610586600480360381019061058191906116ab565b610d86565b005b34801561059457600080fd5b506105af60048036038101906105aa9190611682565b610ea1565b6040516105bc9190611ac4565b60405180910390f35b3480156105d157600080fd5b506105da610eb9565b6040516105e79190611923565b60405180910390f35b3480156105fc57600080fd5b50610605610ee2565b6040516106129190611ac4565b60405180910390f35b34801561062757600080fd5b50610630610ee8565b60405161063d9190611ac4565b60405180910390f35b34801561065257600080fd5b5061066d60048036038101906106689190611682565b610eee565b005b610677610fe6565b005b606060008214156106c1576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050610849565b600082905060005b600082146106f35780806106dc90611ce5565b915050600a826106ec9190611b9e565b91506106c9565b60008167ffffffffffffffff811115610735577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156107675781602001600182028036833780820191505090505b50905060008290505b60008614610841576001816107859190611c29565b90506000600a80886107979190611b9e565b6107a19190611bcf565b876107ac9190611c29565b60306107b89190611b67565b905060008160f81b9050808484815181106107fc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a886108389190611b9e565b97505050610770565b819450505050505b919050565b60086020528060005260406000206000915054906101000a900460ff1681565b6007818154811061087e57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108b5611415565b73ffffffffffffffffffffffffffffffffffffffff166108d3610eb9565b73ffffffffffffffffffffffffffffffffffffffff1614610929576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610920906119e4565b60405180910390fd5b600260009054906101000a900460ff1615610979576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097090611a04565b60405180910390fd5b600260015414156109bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b690611aa4565b60405180910390fd5b60026001819055506001600260006101000a81548160ff02191690831515021790555060004790506000600780549050826109fa9190611b9e565b90505b60006007805490501115610cd2576000600960006007600081548110610a4c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600860006007600081548110610af6577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060006007600081548110610baf577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610be6600061141d565b60008173ffffffffffffffffffffffffffffffffffffffff1683604051610c0c9061190e565b60006040518083038185875af1925050503d8060008114610c49576040519150601f19603f3d011682016040523d82523d6000602084013e610c4e565b606091505b5050905080610c92576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8990611a44565b60405180910390fd5b7f33ad5d6b2a46b5457e0d36286a2686a0390b0821dedbbdf8dcdcda64f4782c688284604051610cc392919061193e565b60405180910390a150506109fd565b6000600260006101000a81548160ff021916908315150217905550505060018081905550565b610d00611415565b73ffffffffffffffffffffffffffffffffffffffff16610d1e610eb9565b73ffffffffffffffffffffffffffffffffffffffff1614610d74576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6b906119e4565b60405180910390fd5b610d7e6000611594565b565b60045481565b610d8e611415565b73ffffffffffffffffffffffffffffffffffffffff16610dac610eb9565b73ffffffffffffffffffffffffffffffffffffffff1614610e02576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610df9906119e4565b60405180910390fd5b600260009054906101000a900460ff1615610e52576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4990611a04565b60405180910390fd5b600354811115610e97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e8e906119c4565b60405180910390fd5b8060048190555050565b60096020528060005260406000206000915090505481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60055481565b60065481565b610ef6611415565b73ffffffffffffffffffffffffffffffffffffffff16610f14610eb9565b73ffffffffffffffffffffffffffffffffffffffff1614610f6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f61906119e4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610fda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd1906119a4565b60405180910390fd5b610fe381611594565b50565b600260009054906101000a900460ff1615611036576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102d90611a04565b60405180910390fd5b6000600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054116110b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110af90611a64565b60405180910390fd5b6000600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060005b60078054905081101561132b573373ffffffffffffffffffffffffffffffffffffffff166007828154811061115d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561131757600060096000600784815481106111e4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600860006007848154811061128d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506113128161141d565b61132b565b6001816113249190611b11565b90506110ff565b5060003373ffffffffffffffffffffffffffffffffffffffff16826040516113529061190e565b60006040518083038185875af1925050503d806000811461138f576040519150601f19603f3d011682016040523d82523d6000602084013e611394565b606091505b50509050806113d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113cf90611a44565b60405180910390fd5b7f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65338360405161140992919061193e565b60405180910390a15050565b600033905090565b60006007805490501115611591576007600160078054905061143f9190611c29565b81548110611476577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600782815481106114db577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600780548061155b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590555b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000813590506116678161201e565b92915050565b60008135905061167c81612035565b92915050565b60006020828403121561169457600080fd5b60006116a284828501611658565b91505092915050565b6000602082840312156116bd57600080fd5b60006116cb8482850161166d565b91505092915050565b6116dd81611c5d565b82525050565b6116ec81611c6f565b82525050565b60006116fd82611adf565b6117078185611af5565b9350611717818560208601611cb2565b61172081611d8c565b840191505092915050565b600061173682611adf565b6117408185611b06565b9350611750818560208601611cb2565b80840191505092915050565b6000611769602683611af5565b915061177482611d9d565b604082019050919050565b600061178c603583611af5565b915061179782611dec565b604082019050919050565b60006117af603183611b06565b91506117ba82611e3b565b603182019050919050565b60006117d2602083611af5565b91506117dd82611e8a565b602082019050919050565b60006117f5602083611af5565b915061180082611eb3565b602082019050919050565b6000611818602d83611af5565b915061182382611edc565b604082019050919050565b600061183b600083611aea565b915061184682611f2b565b600082019050919050565b600061185e601083611af5565b915061186982611f2e565b602082019050919050565b6000611881602583611af5565b915061188c82611f57565b604082019050919050565b60006118a4603783611af5565b91506118af82611fa6565b604082019050919050565b60006118c7601f83611af5565b91506118d282611ff5565b602082019050919050565b6118e681611c9b565b82525050565b60006118f7826117a2565b9150611903828461172b565b915081905092915050565b60006119198261182e565b9150819050919050565b600060208201905061193860008301846116d4565b92915050565b600060408201905061195360008301856116d4565b61196060208301846118dd565b9392505050565b600060208201905061197c60008301846116e3565b92915050565b6000602082019050818103600083015261199c81846116f2565b905092915050565b600060208201905081810360008301526119bd8161175c565b9050919050565b600060208201905081810360008301526119dd8161177f565b9050919050565b600060208201905081810360008301526119fd816117c5565b9050919050565b60006020820190508181036000830152611a1d816117e8565b9050919050565b60006020820190508181036000830152611a3d8161180b565b9050919050565b60006020820190508181036000830152611a5d81611851565b9050919050565b60006020820190508181036000830152611a7d81611874565b9050919050565b60006020820190508181036000830152611a9d81611897565b9050919050565b60006020820190508181036000830152611abd816118ba565b9050919050565b6000602082019050611ad960008301846118dd565b92915050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000611b1c82611c9b565b9150611b2783611c9b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611b5c57611b5b611d2e565b5b828201905092915050565b6000611b7282611ca5565b9150611b7d83611ca5565b92508260ff03821115611b9357611b92611d2e565b5b828201905092915050565b6000611ba982611c9b565b9150611bb483611c9b565b925082611bc457611bc3611d5d565b5b828204905092915050565b6000611bda82611c9b565b9150611be583611c9b565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611c1e57611c1d611d2e565b5b828202905092915050565b6000611c3482611c9b565b9150611c3f83611c9b565b925082821015611c5257611c51611d2e565b5b828203905092915050565b6000611c6882611c7b565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b83811015611cd0578082015181840152602081019050611cb5565b83811115611cdf576000848401525b50505050565b6000611cf082611c9b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611d2357611d22611d2e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f546865206e657720636f6e747269627574696f6e206c696d6974206d7573742060008201527f6265206c657373207468616e2031302065746865720000000000000000000000602082015250565b7f54686520616d6f756e742073656e74206d75737420626520677265617465722d60008201527f7468616e2d6f722d657175616c2d746f20000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f54686520636f6e74726163742069732063757272656e746c79206c6f636b6564600082015250565b7f4e6f206d6f72652070656f706c652063616e20636f6e7472696275746520746f60008201527f2074686520636f6e747261637400000000000000000000000000000000000000602082015250565b50565b7f5472616e73666572206661696c65642e00000000000000000000000000000000600082015250565b7f54686973206164647265737320686173206e6f20657468657220746f2077697460008201527f6864726177000000000000000000000000000000000000000000000000000000602082015250565b7f416d6f756e742073656e742067726561746572207468616e20746865206d617860008201527f696d756d20636f6e747269627574696f6e206c696d6974000000000000000000602082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b61202781611c5d565b811461203257600080fd5b50565b61203e81611c9b565b811461204957600080fd5b5056fea2646970667358221220d94ebd784454931e1c73bab010672bcd769753b27bd82d0c7aa5de2d8df7463f64736f6c63430008040033";

export class EthDistributor__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _contributionLimit: BigNumberish,
    _minimumContribution: BigNumberish,
    _maximumContributors: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EthDistributor> {
    return super.deploy(
      _contributionLimit,
      _minimumContribution,
      _maximumContributors,
      overrides || {}
    ) as Promise<EthDistributor>;
  }
  getDeployTransaction(
    _contributionLimit: BigNumberish,
    _minimumContribution: BigNumberish,
    _maximumContributors: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _contributionLimit,
      _minimumContribution,
      _maximumContributors,
      overrides || {}
    );
  }
  attach(address: string): EthDistributor {
    return super.attach(address) as EthDistributor;
  }
  connect(signer: Signer): EthDistributor__factory {
    return super.connect(signer) as EthDistributor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EthDistributorInterface {
    return new utils.Interface(_abi) as EthDistributorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EthDistributor {
    return new Contract(address, _abi, signerOrProvider) as EthDistributor;
  }
}