import { useState, useEffect, useMemo } from "react";
import { useIsConnected } from "./hooks/useIsConnected";
import { useFuel } from "./hooks/useFuel";
import { WalletLocked } from "fuels";
import { ContractAbi__factory } from "./contracts"
import AllItems from "./components/AllItems";
import ListItem from "./components/ListItem";
import { Button } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/Layout/Navbar";

const CONTRACT_ID = "0xf7cea6129391fb4b5b0fb9dda9814a248ea64723abbcdf43711684c95d3d950f"

function App() {
  const [wallet, setWallet] = useState<WalletLocked>();
  const [isConnected] = useIsConnected();
  const [fuel] = useFuel();
  const [active, setActive] = useState<'all-items' | 'list-item'>('all-items');

  useEffect(() => {
    async function getAccounts() {
      const currentAccount = await fuel.currentAccount();
      const tempWallet = await fuel.getWallet(currentAccount)
      setWallet(tempWallet)
    }
    if (fuel) getAccounts();
  }, [fuel]);

  const contract = useMemo(() => {
    if (fuel && wallet) {
      const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
      return contract;
    }
    return null;
  }, [fuel, wallet]);

  { isConnected && console.log("Connected to wallet: ", wallet?.address , wallet?.address.toHexString())}

  return (
    <div className="App">
      <NavBar />
      <nav className="p-4">
        <ul>
          <li className={active === 'all-items' ? "active-tab" : ""} onClick={() => setActive('all-items')}>See All Items</li>
          <li className={active === 'list-item' ? "active-tab" : ""} onClick={() => setActive('list-item')}>List an Item</li>
        </ul>
      </nav>

      {fuel ? (
        <div>
          {isConnected ? (
            <div>
              {active === 'all-items' && <AllItems contract={contract} />}
              {active === 'list-item' && <ListItem contract={contract} />}
            </div>
          ) : (
            <div>
              <Button onClick={() => fuel.connect()}>Connect Wallet</Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          Download the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wallet.fuel.network/"
          >
            Fuel Wallet
          </a>{" "}
          to use the app.
        </div>
      )}
    </div>
  );
}

export default App;