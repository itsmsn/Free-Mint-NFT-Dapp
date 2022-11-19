import { useState, useEffect } from "react";

import { MinusIcon, PlusIcon } from "../../icons";

import { useMoralis } from "react-moralis";

import { Moralis } from "moralis";

import Image from "../../images/monkeyNft.gif";

import React from "react";

export const Main = () => {
  const [numb, setNumb] = useState(0);

  const ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "ApprovalCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "ApprovalQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "BalanceQueryForZeroAddress", type: "error" },
    { inputs: [], name: "InvalidQueryRange", type: "error" },
    { inputs: [], name: "MintERC2309QuantityExceedsLimit", type: "error" },
    { inputs: [], name: "MintToZeroAddress", type: "error" },
    { inputs: [], name: "MintZeroQuantity", type: "error" },
    { inputs: [], name: "OwnerQueryForNonexistentToken", type: "error" },
    { inputs: [], name: "OwnershipNotInitializedForExtraData", type: "error" },
    { inputs: [], name: "TransferCallerNotOwnerNorApproved", type: "error" },
    { inputs: [], name: "TransferFromIncorrectOwner", type: "error" },
    {
      inputs: [],
      name: "TransferToNonERC721ReceiverImplementer",
      type: "error",
    },
    { inputs: [], name: "TransferToZeroAddress", type: "error" },
    { inputs: [], name: "URIQueryForNonexistentToken", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "fromTokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "toTokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
      ],
      name: "ConsecutiveTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnerUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_reserve", type: "uint256" }],
      name: "collectReserves",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "emint",
      outputs: [{ internalType: "bool", name: "iseligible", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "explicitOwnershipOf",
      outputs: [
        {
          components: [
            { internalType: "address", name: "addr", type: "address" },
            { internalType: "uint64", name: "startTimestamp", type: "uint64" },
            { internalType: "bool", name: "burned", type: "bool" },
            { internalType: "uint24", name: "extraData", type: "uint24" },
          ],
          internalType: "struct IERC721A.TokenOwnership",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
      ],
      name: "explicitOwnershipsOf",
      outputs: [
        {
          components: [
            { internalType: "address", name: "addr", type: "address" },
            { internalType: "uint64", name: "startTimestamp", type: "uint64" },
            { internalType: "bool", name: "burned", type: "bool" },
            { internalType: "uint24", name: "extraData", type: "uint24" },
          ],
          internalType: "struct IERC721A.TokenOwnership[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "flipSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "freeMintedCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_quantity", type: "uint256" }],
      name: "freemint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_quantity", type: "uint256" }],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_newBaseUri", type: "string" }],
      name: "setBaseURI",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "setOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "tokensOfOwner",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "start", type: "uint256" },
        { internalType: "uint256", name: "stop", type: "uint256" },
      ],
      name: "tokensOfOwnerIn",
      outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const { user } = useMoralis();

  async function MintNow() {
    const web3 = await Moralis.enableWeb3();

    let costoptions = {
      contractAddress: "0x15406E5BcBe97bB1675D1c0ADf1565E84cb6D0eF",

      functionName: "emint",

      abi: ABI,

      params: {
        "": user.attributes.ethAddress,
      },
    };

    let balance = await Moralis.executeFunction(costoptions);
    console.log("balance is "+ balance);
    if (balance == false) {
      let depositoptions = {
        contractAddress: "0x15406E5BcBe97bB1675D1c0ADf1565E84cb6D0eF",

        functionName: "freemint",

        abi: ABI,

        msgValue: Moralis.Units.ETH(0.001*(numb-1)),
        
        params: {
          _quantity: numb,
        },
      };
    
      Moralis.executeFunction(depositoptions);
    }
    if (balance != false) {
      let depositoptions = {
        contractAddress: "0x15406E5BcBe97bB1675D1c0ADf1565E84cb6D0eF",

        functionName: "mint",

        abi: ABI,
        
        msgValue: Moralis.Units.ETH(0.001*numb),
        
        params: {
          _quantity: numb,
        },
      };
      Moralis.executeFunction(depositoptions);
    }
  }


  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background bg-b">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-10">
          <div className="relative z-1 md:max-w-3xl w-full bg-gray-900/90 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
            <div className="flex  md:flex-row md:space-x-14 w-full mt-10 md:mt-14 db">
              <div className="relative w-full">
                <img
                  src={Image}
                  className="object-cover w-full sm:h-[280px] md:w-[250px] rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4  md:mt-0">
                <div className="font-coiny flex items-center justify-between pmb">
                  <button
                    className="minus-icon cursor-pointer minu-bg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNumb(numb - 1);
                    }}
                    disabled={numb === 0}
                  >
                    <MinusIcon />
                  </button>
                  <input
                    type="text"
                    className="txt cleanbtn  input-bg items-center justify-center text-center"
                    value={numb}
                    disabled={true}
                    placeholder="0"
                  />
                  <button
                    className="plus-icon cursor-pointer plus-bg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setNumb(numb + 1);
                    }}
                  >
                    <PlusIcon />
                  </button>
                </div>

                <p className="text-sm text-pink-200 tracking-widest mt-3">
                  Max Mint Amount: 11
                </p>

                <div className="border-t border-b py-4 mt-16 ">
                  <div className="w-full text-xl font-coiny flex items-center justify-between text-brand-yellow yellow">
                    <p>Total</p>

                    <div className="flex items-center space-x-3 m-value yellow">
                      <p>{Number.parseFloat(0.003 * numb).toFixed(2)} ETH</p>{" "}
                      <span className="text-gray-400">+ GAS</span>
                    </div>
                  </div>
                </div>
                <button
                  className="menu-item btn button mint-btn"
                  onClick={MintNow}
                >
                  Mint
                </button>
              </div>
            </div>

            <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
              <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6 ca">
                Contract Address
              </h3>
              <a
                href="https://mumbai.polygonscan.com/address/0x7ffede0e953dfc6667a224d8d47f7e789a5ac7ff#code"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 mt-4"
              >
                <span className="break-all ...">
                  0x7ffEDE0E953dFc6667A224D8D47f7E789a5AC7Ff
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
