import { useState } from "react";
import { PropertyOutput } from "../contracts/ContractAbi";
import { ContractAbi } from "../contracts";
import { Button } from "@chakra-ui/react";

interface ItemCardProps {
  contract: ContractAbi | null;
  item: PropertyOutput;
}

const assetId = "0x0000000000000000000000000000000000000000000000000000000000000000"

export default function ItemCard({ item, contract }: ItemCardProps) {
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');

  async function handleBuyItem() {
    if (contract !== null) {
      setStatus('loading')
      try {
        await contract.functions.buy_property(item.id)
        .txParams({ variableOutputs: 1 })
        .callParams({
            forward: [item.price, assetId],
          })
        .call()
        setStatus("success");
      } catch (e) {
        console.log("ERROR:", e);
      }
    }
  }
  console.log("Item: ", item)

  return (
    <div className="item-card">
      <div>Id: {parseFloat(item.id.format()) * 1_000_000_000}</div>
      {/* <div>Metadata: {item.id}</div> */}
      {/* <div>Owner: {item.owner.Address?.value}</div>
      <div>Price: {parseFloat(item.price.format())} ETH</div>
      <div>Total Bought: {parseFloat(item.total_bought.format()) * 1_000_000_000}</div> */}
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <Button onClick={handleBuyItem}>Buy Item</Button>}
      {status === 'loading' && <div>Buying item..</div>}
    
    </div>
  );
}
