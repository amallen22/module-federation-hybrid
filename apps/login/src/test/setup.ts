import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

import '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock window.CV if needed
if (typeof window !== 'undefined') {
    window.CV = window.CV || {};
}

