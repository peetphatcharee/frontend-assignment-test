<script lang="ts" setup>
import { reactive, ref } from "vue";

interface Item {
  type: "Fruit" | "Vegetable";
  name: string;
}

const dataList = reactive<Item[]>([
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
]);

const fruitColumn = reactive<Item[]>([]);
const vegetableColumn = reactive<Item[]>([]);

function moveToColumn(item: Item) {
  const targetColumn = item.type === "Fruit" ? fruitColumn : vegetableColumn;
  targetColumn.push(item);

  const index = dataList.indexOf(item);
  if (index > -1) {
    dataList.splice(index, 1);
  }

  setTimeout(() => moveBackToMain(item), 5000);
}

function moveBackToMain(item: Item) {
  dataList.push(item);
  const targetColumn = item.type === "Fruit" ? fruitColumn : vegetableColumn;
  const index = targetColumn.indexOf(item);
  if (index > -1) {
    targetColumn.splice(index, 1);
  }
}
</script>

<template>
  <div class="container">
    <div>
      <h3>Main List</h3>
      <div
        class="button-wrapper"
        v-for="item in dataList"
        :key="item.name"
        @click="moveToColumn(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- Fruit Column -->
    <div class="column-wrapper ms-5">
      <div class="column-header">Fruit Column</div>
      <div class="column-body">
        <div
          class="button-wrapper mt-1"
          v-for="fruit in fruitColumn"
          :key="fruit.name"
          @click="moveBackToMain(fruit)"
        >
          {{ fruit.name }}
        </div>
      </div>
    </div>

    <!-- Vegetable Column -->
    <div class="column-wrapper">
      <div class="column-header">Vegetable Column</div>
      <div class="column-body">
        <div
          class="button-wrapper mt-1"
          v-for="veg in vegetableColumn"
          :key="veg.name"
          @click="moveBackToMain(veg)"
        >
          {{ veg.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  display: flex;
  gap: 2rem;
  margin: 2rem;
}

.button-wrapper {
  background-color: #fff;
  width: 200px;
  height: 50px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
}

.button-wrapper:hover {
  background-color: #f0f0f0;
}

.column-wrapper {
  width: 250px;
  min-width: 250px;
  height: 500px;
}

.column-header {
  border: 1px solid;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}

.column-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  height: 100%;
}
</style>
