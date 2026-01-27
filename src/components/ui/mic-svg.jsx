export const MicSVG = ({ width = 80, height = 80 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-bounce"
  >
    {/* Outer circle background */}
    <circle cx="40" cy="40" r="38" fill="#FEF3C7" opacity="0.3" />
    
    {/* Microphone body */}
    <rect
      x="32"
      y="24"
      width="16"
      height="28"
      rx="8"
      fill="#F59E0B"
      style={{
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
    
    {/* Microphone top */}
    <circle
      cx="40"
      cy="20"
      r="6"
      fill="#F59E0B"
      style={{
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
    
    {/* Microphone bottom stand */}
    <path
      d="M 32 52 Q 32 60 40 62 Q 48 60 48 52"
      fill="#F59E0B"
      style={{
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
    
    {/* Sound waves */}
    <circle
      cx="40"
      cy="40"
      r="20"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="1.5"
      opacity="0.6"
      style={{
        animation: "scaleUp 1.5s ease-out infinite",
      }}
    />
    <circle
      cx="40"
      cy="40"
      r="20"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="1.5"
      opacity="0.3"
      style={{
        animation: "scaleUp 1.5s ease-out 0.5s infinite",
      }}
    />
    
    <style>{`
      @keyframes scaleUp {
        0% {
          r: 15;
          opacity: 0.8;
        }
        100% {
          r: 28;
          opacity: 0;
        }
      }
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
    `}</style>
  </svg>
);
