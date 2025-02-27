<template>
  <div>
    <ul class="nav nav-underline">
      <li class="nav-item">
        <router-link class="nav-link" to="/" active-class="active"
          >Todo List</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/group" active-class="active"
          >Group by Department</router-link
        >
      </li>
    </ul>

    <router-view />
  </div>
</template>

<style scoped>
.nav-link {
  color: gray;
  text-decoration: none;
}
.nav-link.active {
  color: rgb(0, 0, 0) !important;
  font-weight: bold;
  text-decoration: underline;
}
</style>
