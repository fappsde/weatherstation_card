import '@testing-library/jest-dom';

// Mock customElements if not available
if (typeof customElements === 'undefined') {
  (global as any).customElements = {
    define: jest.fn(),
    get: jest.fn(),
  };
}

// Mock window.customCards
if (typeof window !== 'undefined') {
  (window as any).customCards = [];
}
