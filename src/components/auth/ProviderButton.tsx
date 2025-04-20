import React from "react";
import { Provider } from "../../services/authService";

interface ProviderButtonProps {
  provider: Provider;
  onClick: (providerId: string) => void;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({
  provider,
  onClick,
}) => {
  const getProviderStyles = (name: string): string => {
    switch (name.toLowerCase()) {
      case "github":
        return "bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90";
      case "google":
        return "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200";
      case "facebook":
        return "bg-[#1877F2] text-white hover:bg-[#1877F2]/90";
      case "linkedin":
        return "bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90";
      case "microsoft":
        return "bg-[#2b2b2b] text-white hover:bg-[#2b2b2b]/90";
      default:
        return "bg-gray-800 text-white hover:bg-gray-700";
    }
  };

  const getProviderIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "google":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        );
      case "github":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        );
      case "microsoft":
        return (
          <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
            <path d="M0 0h11v11H0z" fill="#F25022" />
            <path d="M12 0h11v11H12z" fill="#7FBA00" />
            <path d="M0 12h11v11H0z" fill="#00A4EF" />
            <path d="M12 12h11v11H12z" fill="#FFB900" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={() => onClick(provider.id)}
      className={`relative flex items-center justify-center w-full px-6 py-3.5 rounded-md mb-3 font-medium text-sm transition-all ${getProviderStyles(
        provider.name
      )}`}
    >
      <span className="absolute left-6">{getProviderIcon(provider.name)}</span>
      <span>Continue with {provider.displayName}</span>
    </button>
  );
};

export default ProviderButton;
