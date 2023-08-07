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
  console.log("Item: ", item);
  const sanitizedDescription = item.metadata.description.replace(/\u0000/g, '');
  const sanitizedLocation = item.metadata.location.replace(/\u0000/g, '');
  const sanitizedName = item.metadata.name.replace(/\u0000/g, '');
  const urls = ["https://rb.gy/ufpa5","https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:30/f_auto,q_auto/v1658900028/Website/CMS-Uploads/vvhyjkvpi2cz0tpvelog.jpg","https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:30/f_auto,q_auto/v1660823747/Website/CMS-Uploads/xb2kvh7vxnnevcelvw1m.jpg","https://cdn.onekindesign.com/wp-content/uploads/2021/05/Shingle-Style-Cottage-Renovation-Smiros-Smiros-01-1-Kindesign.jpg"]
let id = parseFloat(item.id.format()) * 1_000_000_000;
console.log(urls[id -1], "urls",id)
  return (
    <div className="item-card">
      <div>Id: {parseFloat(item.id.format()) * 1_000_000_000}</div>
      <div> Description : {sanitizedDescription}</div>
      <div> OwnerAddress: {item.owner.Address?.value}</div>
      <div> Location : {sanitizedLocation}</div>
      <img src={urls[id -1]} alt="property" />
      <div>Name: {sanitizedName}</div>
      <div> Area {item.metadata.area_sq_ft}</div>
      <div> Bedrooms {item.metadata.bedrooms}</div>
      <div> Price: {item.price.format()}</div>
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <Button onClick={handleBuyItem}>Buy Item</Button>}
      {status === 'loading' && <div>Buying item..</div>}
    
    </div>
  );
}
