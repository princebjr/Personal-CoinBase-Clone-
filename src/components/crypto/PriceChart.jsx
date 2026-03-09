/**
 * PriceChart – renders a responsive SVG sparkline / area chart for a coin.
 *
 * Props:
 *   positive  {boolean}  – true = upward trend (green), false = downward (red)
 *   height    {number}   – SVG height in px (default 64)
 *   className {string}   – extra Tailwind classes on the wrapper div
 */
function PriceChart({ positive = true, height = 64, className = '' }) {
  const upPath   = 'M0,60 C20,55 35,42 55,35 C75,28 85,32 105,22 C125,12 135,8 160,5 C175,3 185,10 200,8';
  const downPath = 'M0,8  C20,12 35,20 55,28 C75,36 85,30 105,38 C125,46 135,52 160,56 C175,58 185,54 200,58';
  const path  = positive ? upPath : downPath;
  const color = positive ? '#16A34A' : '#DC2626';
  const fillId = positive ? 'chartFillUp' : 'chartFillDown';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 200 64"
        width="100%"
        height={height}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0"    />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={`${path} L200,64 L0,64 Z`}
          fill={`url(#${fillId})`}
        />

        {/* Line */}
        <path
          d={path}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default PriceChart;
