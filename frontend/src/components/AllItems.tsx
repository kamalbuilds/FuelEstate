import { useState, useEffect } from "react";
import { ContractAbi } from "../contracts";
import { PropertyOutput } from "../contracts/ContractAbi";
import ItemCard from "./ItemCard";

interface AllItemsProps {
  contract: ContractAbi | null;
}

export default function AllItems({ contract }: AllItemsProps) {
  const [items, setItems] = useState<PropertyOutput[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>('loading');

  useEffect(() => {
    async function getAllItems() {
      if (contract !== null) {
        try {
          let { value } = await contract.functions.get_count().get();
          console.log(value, "value");
          const getfirst = await contract.functions.get_property(1).get();
          console.log(getfirst, "getfirst")
          let formattedValue = parseFloat(value.format()) * 1_000_000_000;
          setItemCount(formattedValue);
          let max = formattedValue + 1;
          let tempItems = [];
          for(let i=1; i < max; i++){
            let resp = await contract.functions.get_property(i).get();
            tempItems.push(resp.value)
          }
          console.log(value, tempItems, "tempItems")
          setItems(tempItems)
          setStatus('success')
        } catch (e) {
          setStatus('error')
          console.log("ERROR:", e);
        }
      }
    }
    getAllItems();
  }, [contract]);

  return (
    <div>
      <h2>All Items</h2>
      {status === 'success' &&
        <div>
          {itemCount === 0 ? (
            <div>Uh oh! No items have been listed yet</div>
          ) : (
            <div>
              <div>Total items: {itemCount}</div>
              <div className="items-container">
                  {items.map((item) => (
                  <ItemCard key={item.id.format()} contract={contract} item={item}/>
              ))}
              </div>
          </div>
          )}
        </div>
      }
      {status === 'error' && <div>Something went wrong, try reloading the page.</div>}
      {status === 'loading' && <div>Loading...</div>}
    </div>
  );
}
