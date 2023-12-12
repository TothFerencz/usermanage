<template>
    <div class="user-form-container">
      <h2>{{ editingUser ? 'Felhasználó szerkesztése' : 'Új felhasználó létrehozása' }}</h2>
      <form @submit.prevent="saveUser">
        <div class="form-group">
          <input v-model="user.firstName" id="firstName" required placeholder="Vezetéknév" />
        </div>
        <div class="form-group">
          <input v-model="user.lastName" id="lastName" required placeholder="Keresztnév" />
        </div>
        <div class="form-group">
          <input v-model="user.email" id="email" type="email" required placeholder="Email" />
        </div>
        <div class="form-group">
          <input v-model="user.phone" id="phone" type="tel" placeholder="Telefonszám" />
        </div>
        <div class="form-group">
          <button type="submit" class="action-button">{{ editingUser ? 'Mentés' : 'Létrehozás' }}</button>
          <button @click="cancelEdit" class="action-button cancel-button">Mégsem</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        user: {
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        editingUser: null,
      };
    },
    computed: {
      ...mapGetters(['getUsers']),
    },
    methods: {
      ...mapActions(['addUser', 'updateUser']),
      saveUser() {
        if (this.editingUser) {
          this.updateUser({ userId: this.editingUser.id, updatedUser: this.user });
        } else {
          this.addUser(this.user);
        }
        this.$router.push({ name: 'user-list' });
      },
      cancelEdit() {
        this.$router.push({ name: 'user-list' });
      },
    },
    created() {
      const userId = this.$route.params.userId;
      if (userId) {
        this.editingUser = this.getUsers.find((user) => user.id === parseInt(userId));
        if (this.editingUser) {
          this.user = { ...this.editingUser };
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .user-form-container {
    width: 80%; 
    max-width: 400px; 
    margin: 50px auto;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  .action-button,
  .cancel-button {
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    width: 45%; 
  }
  
  .action-button {
    background-color: #007bff;
    margin-right: 5%;
  }
  
  .cancel-button {
    background-color: #f44336;
  }
  </style>