export const SYNC_EVENT = 'sync';

/**
 * Generic types and functions for sync actions
 */

export interface SyncAction<T, P> {
    type: T;
    args: P;
}

/**
 * Creates a SynAction
 * @param type the type of the action
 * @param args required arguments
 * @returns the created action
 */
export function createSyncAction<T extends string, P>(
    type: T,
    args: P
): SyncAction<T, P> {
    return { type, args };
}
