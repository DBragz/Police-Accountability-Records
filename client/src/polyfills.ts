import { Buffer } from 'buffer';

// Add polyfills for Node.js APIs used by Pinata SDK
window.global = window;
window.Buffer = Buffer;
