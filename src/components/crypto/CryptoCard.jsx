import { Link } from 'react-router-dom';

/**
 * CryptoCard – displays a single cryptocurrency's key stats.
 * Used on the Home page crypto grid and Explore page movers panel.
 *
 * Props:
 *   coin  – { id, name, symbol, price, change24h, marketCap }
 *   rank  – optional rank number to display
 */
function CryptoCard({ coin, rank }) {
  const isUp = coin.change24h >= 0;

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const fmtMarketCap = (n) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
    return `$${(n / 1e6).toFixed(2)}M`;
  };

  return (
    <Link
      to={`/asset/${coin.id}`}
      className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200 no-underline"
    >
      <div className="flex items-center gap-3">
        {rank && (
          <span className="text-xs font-bold text-gray-400 w-5 shrink-0">{rank}</span>
        )}
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <span className="text-xs font-extrabold text-blue-600">
            {coin.symbol.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {/* Name */}
        <div>
          <p className="text-sm font-700 font-bold text-gray-900 leading-tight">{coin.name}</p>
          <p className="text-xs text-gray-400">{coin.symbol}</p>
        </div>
      </div>

      {/* Price + change */}
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900 tabular-nums">{fmt(coin.price)}</p>
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${
            isUp
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-600'
          }`}
        >
          {isUp ? '+' : ''}{coin.change24h.toFixed(2)}%
        </span>
      </div>
    </Link>
  );
}

export default CryptoCard;
