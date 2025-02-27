<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hair: { color?: string };
  address: { postalCode: string };
  company: { department: string };
}

type GroupedData = Record<
  string,
  {
    male: number;
    female: number;
    ageRange: string;
    minAge: number;
    maxAge: number;
    hair: Record<string, number>;
    addressUser: Record<string, string>;
  }
>;

const users = ref<User[]>([]);
const groupedUsers = computed<GroupedData>(() => {
  return users.value.reduce((acc: GroupedData, user: User) => {
    const dept = user.company.department;

    // ถ้า department ยังไม่มีข้อมูลให้สร้างโครงสร้างขึ้นมาก่อน
    if (!acc[dept]) {
      acc[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        minAge: user.age,
        maxAge: user.age,
        hair: {},
        addressUser: {},
      };
    }

    // 👉 เพิ่มจำนวนตามเพศ
    acc[dept][user.gender]++;

    // 👉 อัปเดตช่วงอายุ
    acc[dept].minAge = Math.min(acc[dept].minAge, user.age);
    acc[dept].maxAge = Math.max(acc[dept].maxAge, user.age);
    acc[dept].ageRange = `${acc[dept].minAge}-${acc[dept].maxAge}`;

    // 👉 รวมจำนวนสีผม
    if (user.hair && user.hair.color) {
      const color = user.hair.color.trim(); // กันช่องว่างที่อาจเกิดขึ้น
      acc[dept].hair[color] = (acc[dept].hair[color] || 0) + 1;
    }

    // 👉 เก็บรหัสไปรษณีย์ของผู้ใช้ โดยใช้ firstName + lastName เป็น key
    const userKey = `${user.firstName}${user.lastName}`;
    acc[dept].addressUser[userKey] = user.address.postalCode;

    return acc;
  }, {} as GroupedData);
});

const fetchUsers = async () => {
  try {
    const response = await axios.get<{ users: User[] }>(
      "https://dummyjson.com/users"
    );
    users.value = response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div>
    <h3>User Groups by Department</h3>
    <div
      v-for="(data, department) in groupedUsers"
      :key="department"
      class="department-wrpapper"
    >
      <details open>
        <summary>{{ department }}</summary>
        <pre>{{ data }}</pre>
      </details>
    </div>
  </div>
</template>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 20px;
}
h4 {
  margin-top: 10px;
  color: #2c3e50;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
}

.department-wrpapper {
  margin: 20px;
}
</style>
