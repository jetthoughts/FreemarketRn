const rn = require('react-native');

jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  };
});

jest.mock('../app/api/firebase', () => {
  return {
    saveImageToStorage: jest.fn(),
  }
});

const time = require('../app/utils/time');
time.dateToTimeString = () => '10:20';

module.exports = rn;
