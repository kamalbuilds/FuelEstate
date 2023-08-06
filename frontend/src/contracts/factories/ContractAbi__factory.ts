/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.38.0
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import { Interface, Contract } from "fuels";
import type { Provider, Account, AbstractAddress } from "fuels";
import type { ContractAbi, ContractAbiInterface } from "../ContractAbi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "enum Identity",
      "components": [
        {
          "name": "Address",
          "type": 10,
          "typeArguments": null
        },
        {
          "name": "ContractId",
          "type": 11,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "enum InvalidError",
      "components": [
        {
          "name": "IncorrectAssetId",
          "type": 11,
          "typeArguments": null
        },
        {
          "name": "NotEnoughTokens",
          "type": 14,
          "typeArguments": null
        },
        {
          "name": "OnlyOwner",
          "type": 2,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "str[10]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 5,
      "type": "str[11]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 6,
      "type": "str[19]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 7,
      "type": "str[21]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 8,
      "type": "str[25]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 9,
      "type": "str[5]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 10,
      "type": "struct Address",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 11,
      "type": "struct ContractId",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 12,
      "type": "struct Property",
      "components": [
        {
          "name": "id",
          "type": 14,
          "typeArguments": null
        },
        {
          "name": "price",
          "type": 14,
          "typeArguments": null
        },
        {
          "name": "owner",
          "type": 2,
          "typeArguments": null
        },
        {
          "name": "metadata",
          "type": 13,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 13,
      "type": "struct PropertyMetadata",
      "components": [
        {
          "name": "name",
          "type": 4,
          "typeArguments": null
        },
        {
          "name": "location",
          "type": 5,
          "typeArguments": null
        },
        {
          "name": "area_sq_ft",
          "type": 9,
          "typeArguments": null
        },
        {
          "name": "bedrooms",
          "type": 15,
          "typeArguments": null
        },
        {
          "name": "bathrooms",
          "type": 15,
          "typeArguments": null
        },
        {
          "name": "description",
          "type": 4,
          "typeArguments": null
        },
        {
          "name": "images_url",
          "type": 6,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 14,
      "type": "u64",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 15,
      "type": "u8",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "property_id",
          "type": 14,
          "typeArguments": null
        }
      ],
      "name": "buy_property",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        },
        {
          "name": "payable",
          "arguments": []
        }
      ]
    },
    {
      "inputs": [],
      "name": "get_count",
      "output": {
        "name": "",
        "type": 14,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "item_id",
          "type": 14,
          "typeArguments": null
        }
      ],
      "name": "get_property",
      "output": {
        "name": "",
        "type": 12,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "initialize_owner",
      "output": {
        "name": "",
        "type": 2,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "price",
          "type": 14,
          "typeArguments": null
        },
        {
          "name": "metadata",
          "type": 13,
          "typeArguments": null
        }
      ],
      "name": "list_property",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "withdraw_funds",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": 0,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    },
    {
      "logId": 1,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    },
    {
      "logId": 2,
      "loggedType": {
        "name": "",
        "type": 8,
        "typeArguments": null
      }
    },
    {
      "logId": 3,
      "loggedType": {
        "name": "",
        "type": 7,
        "typeArguments": null
      }
    },
    {
      "logId": 4,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    },
    {
      "logId": 5,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    }
  ],
  "messagesTypes": [],
  "configurables": []
}

export class ContractAbi__factory {
  static readonly abi = _abi
  static createInterface(): ContractAbiInterface {
    return new Interface(_abi) as unknown as ContractAbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): ContractAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as ContractAbi
  }
}
