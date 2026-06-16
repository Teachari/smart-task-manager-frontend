import '@testing-library/jest-dom';

// 📡 Mocking the Global Window Browser CDN variables for Jest
window.SockJS = jest.fn().mockImplementation(() => ({
  close: jest.fn(),
}));

window.StompJs = {
  Client: jest.fn().mockImplementation(() => {
    return {
      activate: jest.fn(),
      deactivate: jest.fn(),
      subscribe: jest.fn(),
      onConnect: null,
    };
  }),
};

// 🌐 Global Mock for the JavaScript Fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: 'Learn Spring Boot IoC',
          description: 'Complete Day 31 fundamentals setup',
          status: 'PENDING',
        },
        {
          id: 2,
          title: 'Build REST API Endpoints',
          description: 'Configure Task and Auth controllers',
          status: 'COMPLETED',
        },
      ]),
  })
);

// Clean up all mock trackers after every single test run
afterEach(() => {
  jest.clearAllMocks();
});