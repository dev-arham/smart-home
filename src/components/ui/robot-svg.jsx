export const RobotSVG = ({ width = 80, height = 80 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-bounce"
  >
    {/* Outer circle background */}
    <circle cx="40" cy="40" r="38" fill="#FCD34D" opacity="0.4" />
    
    {/* Robot head */}
    <rect
      x="28"
      y="20"
      width="24"
      height="24"
      rx="3"
      fill="#FBBF24"
      style={{
        animation: "float 3s ease-in-out infinite",
      }}
    />
    
    {/* Left eye background */}
    <circle
      cx="33"
      cy="28"
      r="4"
      fill="#1F2937"
    />
    
    {/* Left eye shine */}
    <circle
      cx="33"
      cy="28"
      r="2.5"
      fill="#60A5FA"
      style={{
        animation: "blink 3s ease-in-out infinite",
      }}
    />
    
    {/* Right eye background */}
    <circle
      cx="47"
      cy="28"
      r="4"
      fill="#1F2937"
    />
    
    {/* Right eye shine */}
    <circle
      cx="47"
      cy="28"
      r="2.5"
      fill="#60A5FA"
      style={{
        animation: "blink 3s ease-in-out infinite",
      }}
    />
    
    {/* Mouth */}
    <path
      d="M 34 36 Q 40 38 46 36"
      stroke="#1F2937"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Robot body */}
    <rect
      x="26"
      y="46"
      width="28"
      height="20"
      rx="2"
      fill="#FBBF24"
      style={{
        animation: "float 3s ease-in-out infinite 0.1s",
      }}
    />
    
    {/* Left arm */}
    <g
      style={{
        animation: "armWave 2s ease-in-out infinite",
        transformOrigin: "26px 50px",
      }}
    >
      <rect x="16" y="48" width="12" height="6" rx="3" fill="#FBBF24" />
    </g>
    
    {/* Right arm */}
    <g
      style={{
        animation: "armWave 2s ease-in-out infinite 0.2s",
        transformOrigin: "54px 50px",
      }}
    >
      <rect x="52" y="48" width="12" height="6" rx="3" fill="#FBBF24" />
    </g>
    
    {/* Left leg */}
    <rect x="32" y="68" width="5" height="8" rx="2" fill="#FBBF24" />
    
    {/* Right leg */}
    <rect x="43" y="68" width="5" height="8" rx="2" fill="#FBBF24" />
    
    {/* Antenna */}
    <line
      x1="40"
      y1="20"
      x2="40"
      y2="10"
      stroke="#FBBF24"
      strokeWidth="2"
      strokeLinecap="round"
      style={{
        animation: "sway 2.5s ease-in-out infinite",
      }}
    />
    <circle
      cx="40"
      cy="8"
      r="2.5"
      fill="#FBBF24"
    />
    
    <style>{`
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-4px);
        }
      }
      @keyframes blink {
        0%, 10%, 20%, 100% {
          opacity: 1;
        }
        15% {
          opacity: 0;
        }
      }
      @keyframes armWave {
        0%, 100% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(-25deg);
        }
      }
      @keyframes sway {
        0%, 100% {
          transform: rotate(-5deg);
          transform-origin: 40px 20px;
        }
        50% {
          transform: rotate(5deg);
          transform-origin: 40px 20px;
        }
      }
    `}</style>
  </svg>
);
