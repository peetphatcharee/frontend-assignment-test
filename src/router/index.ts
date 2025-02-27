import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../views/TodoList.vue";
import GroupbyDepartment from "../views/GroupbyDepartment.vue";

const routes = [
  { path: "/", component: TodoList },
  { path: "/group", component: GroupbyDepartment },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
