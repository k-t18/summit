import { clientSocketInstance } from './socket-init';

let getUsername = '';
let getUserMailID = '';

if (typeof window !== 'undefined') {
  getUsername = localStorage.getItem('party_name') || '';
  getUserMailID = localStorage.getItem('user') || '';
}
type UserData = {
  name: string;
  phone: string;
};
export function registerUser() {
  // Register user to the server.
  clientSocketInstance.emit('new-user-visit', { userName: getUsername, userEmail: getUserMailID });
}
export function catalogPageVisit(catalogName: string, userContactDetails: UserData) {
  // Track catalog page visit.
  clientSocketInstance.emit('catalog-page-visit', {
    userName: userContactDetails.name,
    phone: userContactDetails.phone,
    catalogName,
  });
}

export function handleSiteOccupied(username: string) {
  clientSocketInstance.emit('site-occupied', {
    user: username,
  });
}

export function handleSiteInSleepMode(username: string) {
  clientSocketInstance.emit('site-in-sleep-mode', {
    user: username,
  });
}
