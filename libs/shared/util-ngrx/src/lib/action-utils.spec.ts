import { props } from '@ngrx/store';
import { createSyncedAction, findSyncedAction } from './action-utils';
describe('action-utils', () => {
    it('should capture a synced action', () => {
        //GIVEN a simple synced action
        const anyAction = createSyncedAction(
            'Whatever',
            props<{ test: string }>()
        );
        //WHEN retieved
        const retrieved = findSyncedAction('Whatever');

        //THEN should be found
        expect(anyAction).toBe(retrieved);
    });
});
