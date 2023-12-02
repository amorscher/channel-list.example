import {
    createAction,
    ActionCreator,
    Action,
    ActionCreatorProps,
    NotAllowedCheck,
} from '@ngrx/store';

/**
 * Keeps track of all synced actions
 */
export const syncedActions: Map<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ActionCreator<string, (props: any) => any & Action>
> = new Map();

/**
 * Creates an action which is synced btw. different clients.
 * The created action will be put to the syncedActions map.
 */
export function createSyncedAction<T extends string, P extends object>(
    type: T,
    config: ActionCreatorProps<P> & NotAllowedCheck<P>
) {
    const action = createAction(type, config);
    syncedActions.set(action.type, action);
    return action;
}

/**
 * Finds synced action specified by the type
 * @param actionType
 * @returns
 */
export function findSyncedAction(actionType: string) {
    return syncedActions.get(actionType);
}

/*
    This action does nothing and should not have
    a reducer function assigned
*/
export const ngrxNoopAction = createAction('[General] No Operation');
