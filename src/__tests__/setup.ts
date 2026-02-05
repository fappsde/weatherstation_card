import '@testing-library/jest-dom';

interface MockCustomElementRegistry {
  define: jest.Mock;
  get: jest.Mock;
}

interface CustomCardInfo {
  type: string;
  name: string;
  description: string;
}

interface WindowWithCustomCards extends Window {
  customCards?: CustomCardInfo[];
}

// Mock customElements if not available
if (typeof customElements === 'undefined') {
  (global as unknown as { customElements: MockCustomElementRegistry }).customElements = {
    define: jest.fn(),
    get: jest.fn(),
  };
}

// Mock window.customCards
if (typeof window !== 'undefined') {
  (window as WindowWithCustomCards).customCards = [];
}
