import {create} from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => {
    set({ isAuthenticated: true, user });
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
     set({isAuthenticated: false, user: null});
     localStorage.removeItem('user')
  },
  initializeAuth: () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ isAuthenticated: true, user: JSON.parse(storedUser) });
    }
  }
}));

export default useAuthStore;