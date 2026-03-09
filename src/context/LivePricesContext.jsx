import { createContext, useContext, useEffect, useState } from 'react';
import { cryptoData as staticData } from '../data/cryptoData';

const LivePricesContext = createContext(null);

// Stablecoins stay pegged to $1
const STABLE = new Set(['tether', 'usdc']);

function fmt(p) {
  if (p >= 10000) return parseFloat(p.toFixed(2));
  if (p >= 100)   return parseFloat(p.toFixed(2));
  if (p >= 10)    return parseFloat(p.toFixed(3));
  if (p >= 1)     return parseFloat(p.toFixed(4));
  return parseFloat(p.toFixed(5));
}

export function LivePricesProvider({ children }) {
  const [coins, setCoins] = useState(() =>
    staticData.map(c => ({ ...c, _dir: 0, _tick: 0 }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCoins(prev =>
        prev.map(coin => {
          if (STABLE.has(coin.id)) return coin;

          // Random tick: ±0.05% – 0.4%, with a tiny upward drift
          const magnitude = 0.0005 + Math.random() * 0.0035;
          const dir = Math.random() > 0.46 ? 1 : -1;
          const newPrice = fmt(coin.price * (1 + dir * magnitude));

          // Keep 24h change relative to the original static base price
          const base = staticData.find(s => s.id === coin.id).price;
          const newChange24h = parseFloat(((newPrice - base) / base * 100).toFixed(2));

          return {
            ...coin,
            price: newPrice,
            change24h: newChange24h,
            _dir: dir,
            _tick: coin._tick + 1,
          };
        })
      );
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <LivePricesContext.Provider value={coins}>
      {children}
    </LivePricesContext.Provider>
  );
}

export const useLivePrices = () => useContext(LivePricesContext);
