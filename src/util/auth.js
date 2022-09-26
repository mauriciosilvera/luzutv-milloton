export const KEY_TOKEN = 'token';
export const auth = {
  isAuthenticated: !!localStorage.getItem(KEY_TOKEN),
  signin(data) {
    auth.isAuthenticated = true;
    localStorage.setItem(KEY_TOKEN, data);
  },
  getData() {
    if (!auth.isAuthenticated) return null;
    return localStorage.getItem(KEY_TOKEN);
  },
  signout() {
    auth.isAuthenticated = false;
    localStorage.clear();
  }
};
