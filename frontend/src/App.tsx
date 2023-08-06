import { useState, useEffect, useMemo } from "react";
import { useIsConnected } from "./hooks/useIsConnected";
import { useFuel } from "./hooks/useFuel";
import { Contract, WalletLocked } from "fuels";
import { ContractAbi__factory } from "./contracts"
import AllItems from "./components/AllItems";
import ListItem from "./components/ListItem";
import { Button } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/Layout/Navbar";

const CONTRACT_ID = "0x078da2854c627e8a42ca6a882ba0215d2dc376c35773bb55a2803a071f42927c"
// const CONTRACT_ID = "0xf7cea6129391fb4b5b0fb9dda9814a248ea64723abbcdf43711684c95d3d950f"
// 0xb7b46092a8988602c03f72a13ab732146963d6fca62b19e0bafa7497d13cfcab
// 0x9cc68bdcdcef07cb7efef4395ad01d990fb0f31520df3e50cdb6f66d96559e5c
// 0x9d485bcdb5979123112ce44590f551294e2cd32eb187b31851ee8414bfd9c69a <true>
// 0x9c051b95bd287f532ae3754f28df42e297e2039b167b24279ffb8962cb33e47e
// 0x078da2854c627e8a42ca6a882ba0215d2dc376c35773bb55a2803a071f42927c

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
  { Contract && console.log("Contract: ", contract)}

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
