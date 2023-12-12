<template>
    <div>
      <div class="navbar">
        <div class="header">
          <h2 class="headerh2">Felhasználók listája</h2>
          <div class="search-container">
            <input v-model="search" id="search" placeholder="Felhasználó keresése" />
            <button @click="goToUserForm" class="new-user-button">Új felhasználó</button>
          </div>
        </div>
      </div>
      <div class="user-list-container">
        <table>
          <thead>
            <tr>
              <th>Vezetéknév</th>
              <th>Keresztnév</th>
              <th>Email</th>
              <th>Telefonszám</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" @mouseover="hoverUser(user.id)" @mouseout="unhoverUser">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>
                <button @click="editUser(user)" class="action-button edit-button">Szerkesztés</button>
                <button @click="deleteUser(user.id)" class="action-button delete-button">Törlés</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="showEditorPanel" class="editor-panel">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        search: '',
        showEditorPanel: false,
        hoveredUserId: null,
      };
    },
    computed: {
      ...mapGetters(['getUsers']),
      filteredUsers() {
        return this.getUsers.filter((user) =>
          user.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      ...mapActions(['fetchUsers', 'deleteUser']),
      editUser(user) {
        this.$router.push({ name: 'user-form', params: { userId: user.id } });
        this.showEditorPanel = true;
      },
      goToUserForm() {
        this.$router.push('/user-form');
      },
      hoverUser(userId) {
        this.hoveredUserId = userId;
      },
      unhoverUser() {
        this.hoveredUserId = null;
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  body {
    margin: 0;
  }
  
  .navbar {
    position: sticky;
    top: 0;
    background-color: white;
    color: black;
    z-index: 1000;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px; 
  }
  
  .headerh2 {
    margin: 0;
    padding-left: 40px;
  }
  
  .search-container {
    display: flex;
    align-items: center;
  }
  
  #search {
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    flex-grow: 1; 
  }
  
  .new-user-button {
    padding: 10px;
    margin-right: 130px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .action-button {
    padding: 8px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .new-user-button {
    background-color: #007bff;
    color: white;
  }
  
  .action-button.edit-button {
    background-color: #4caf50;
    color: white;
  }
  
  .action-button.delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .user-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 50px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px; 
  }
  
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .editor-panel {
    margin-top: 20px; 
  }
  
  
  @media only screen and (max-width: 600px) {
    .header {
      display: block;
      align-items: center;
    }
    .user-list-container {
      align-items: flex-start;
    }
    .headerh2 {
      margin-bottom: 10px;
    }
  
    #search {
      margin-right: 0;
      margin-bottom: 10px;
    }
  
    .new-user-button {
      margin-right: 0;
      margin-top: -10px;
      margin-left: 5px;
    }
  
    table {
      margin-left: 0;
    }
  
    .editor-panel {
      margin-left: 0;
    }
  }
  </style>