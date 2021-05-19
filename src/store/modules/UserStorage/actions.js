import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const localStorageService = {
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
}

//remove user from local storage to log user out
async function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "/auth";
    currentUserSubject.next(null);

}
