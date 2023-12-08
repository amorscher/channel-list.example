import { SyncAction } from '@channels/domain-entities';
import 'jest-preset-angular/setup-jest';

// if not done in test setup we get some erros as setImmediate is not available in jsdom library

/**
 * Mocks the client sockets: just keeps track of all registered listeners
 */
class ClientSocketMock {
    public listeners: ((payload: SyncAction<unknown, unknown>) => void)[] = [];

    on(_type: string, listener: () => void) {
        this.listeners.push(listener);
    }
}

export const mSocket = new ClientSocketMock();

/**
 * Mocks a server emit by calling all listernes on the client socket
 * @param type
 * @param payload
 */
export const fakeServerEmit = (
    _type: string,
    payload: SyncAction<unknown, unknown>
) => {
    mSocket.listeners.forEach((listener) => listener(payload));
};
// mock socket io client
jest.mock('socket.io-client', () => {
    return { io: jest.fn(() => mSocket) };
});
