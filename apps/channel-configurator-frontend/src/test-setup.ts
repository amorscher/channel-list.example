// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
    },
};
import { SyncAction } from '@channels/domain-entities';
import 'jest-preset-angular/setup-jest';

/**
 * Mocks the client sockets: just keeps track of all registered listeners
 */
class ClientSocketMock {
    public listeners: ((payload: SyncAction<unknown, unknown>) => void)[] = [];

    on(_type: string, listener: () => void) {
        this.listeners.push(listener);
    }
}

const mSocket = new ClientSocketMock();

// mock socket io client
jest.mock('socket.io-client', () => {
    return { io: jest.fn(() => mSocket) };
});

// mock socket io client
jest.mock('socket.io-client', () => {
    return { io: jest.fn(() => mSocket) };
});
