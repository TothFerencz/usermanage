import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    addUser(state, newUser) {
      state.users.push(newUser);
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
  actions: {
    // Az adatok lekérdezése a DummyJSON API-ról
    async fetchUsers({ commit }) {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        commit('setUsers', data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    // Egy felhasználó frissítése
    async updateUser({ commit }, { userId, updatedUser }) {
      try {
        await fetch(`https://dummyjson.com/users/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
        commit('updateUser', updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    // Egy új felhasználó hozzáadása
    async addUser({ commit }, newUser) {
      try {
        const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        const data = await response.json();
        commit('addUser', data);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    // Egy felhasználó törlése
    async deleteUser({ commit }, userId) {
      try {
        await fetch(`https://dummyjson.com/users/${userId}`, {
          method: 'DELETE',
        });
        commit('deleteUser', userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
  getters: {
    // Getter a felhasználók számára
    getUsers: state => state.users,
  },
});