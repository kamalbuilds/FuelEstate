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

const CONTRACT_ID = "0x0f5f659c2e3517863f155b56287f09b84bee98adeea59e9f2439d04775bcf9be";

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

  return (
    <div className="App">
      <NavBar wallet={wallet} />
      <nav className="p-4">
        <ul>
          <li className={active === 'all-items' ? "active-tab" : ""} onClick={() => setActive('all-items')}>Buy Properties</li>
          <li className={active === 'list-item' ? "active-tab" : ""} onClick={() => setActive('list-item')}>List on FuelEstate</li>
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
