/* eslint-env jest */
const mockStorage = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn((key, value) => {
    mockStorage[key] = value;
    return Promise.resolve(null);
  }),
  getItem: jest.fn(key => {
    return Promise.resolve(mockStorage[key] || null);
  }),
  removeItem: jest.fn(key => {
    delete mockStorage[key];
    return Promise.resolve(null);
  }),
  clear: jest.fn(() => {
    for (const key in mockStorage) {
      delete mockStorage[key];
    }
    return Promise.resolve(null);
  }),
}));

jest.mock('react-native-video', () => 'Video');
