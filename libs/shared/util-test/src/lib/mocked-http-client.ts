import { Observable, of } from 'rxjs';

/**
 * A mock used for testing
 */
export class MockedHttpClient {
    get<T>(): Observable<T> {
        return of(undefined);
    }
    patch<T>(): Observable<T> {
        return of(undefined);
    }
    post<T>(): Observable<T> {
        return of(undefined);
    }
    delete<T>(): Observable<T> {
        return of(undefined);
    }
}
