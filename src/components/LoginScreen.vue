<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <div class="w-full max-w-sm">
      <div
        class="bg-purple-700 flex items-center justify-center drop-shadow-lg rounded-t-lg py-5"
      >
        <h1 class="text-white font-bold italic text-2xl">KanbanLite</h1>
      </div>
      <!-- Sign in -->
      <div v-show="modeToggle">
        <form class="bg-white shadow-lg-inner rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div
            class="flex justify-center text-fuchsia-500 animate-fade-in-up pb-3"
            v-show="beenCreated"
          >
            <p>Account has been created</p>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow-md appearance-none bg-gray rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="username"
              v-model="username"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow-md appearance-none bg-gray rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              required
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-fuchsia-500 hover:bg-California text-white font-bold py-2 px-7 rounded focus:outline-none hover:drop-shadow-inner-lg focus:border-black-1 drop-shadow-md"
              type="button"
              @click="singIn"
            >
              SIGN IN
            </button>
          </div>
          <div class="flex justify-center">
            <p>
              don't have an account?
              <a
                class="text-fuchsia-500 hover:underline cursor-pointer"
                @click="changeMode"
              >
                create!
              </a>
            </p>
          </div>
        </form>
      </div>
      <!-- Sign Up -->
      <div v-show="!modeToggle">
        <form class="bg-white shadow-lg-inner rounded-b-lg px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow-md appearance-none bg-gray rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Email
            </label>
            <input
              class="shadow-md appearance-none bg-gray rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="email@gmail.com"
              v-model="email"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow-md appearance-none bg-gray rounded-lg w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="******************"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-fuchsia-500 hover:bg-California text-white font-bold py-2 px-7 rounded focus:outline-none hover:drop-shadow-inner-lg focus:border-black-1 drop-shadow-md"
              type="button"
              @click="signUp"
            >
              SIGN UP
            </button>
          </div>
          <div class="flex justify-center">
            <p>
              have an account?
              <a
                class="text-fuchsia-500 hover:underline cursor-pointer"
                @click="changeMode"
              >
                signin
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createUser, UserLoggedIn } from "@/services/user";
import { useUserStore } from "@/store/useUserStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const modeToggle = ref(true);
const email = ref();
const username = ref();
const password = ref();
const router = useRouter();
const beenCreated = ref(false);
const userStore = useUserStore();

const changeMode = () => {
  modeToggle.value = !modeToggle.value;
};
const singIn = async () => {
  console.log(username.value != null && password.value != null);
  if (username.value && password.value) {
    const request = await UserLoggedIn(username.value, password.value);
    userStore.user = {
      username: username.value,
      password: password.value,
      token: request.token,
      email: "",
    };
    router.push({
      name: "Kanban",
    });
  }
};
const signUp = async () => {
  await createUser(username.value, email.value, password.value);
  changeMode();
  beenCreated.value = !beenCreated.value;
};
</script>

<style></style>
