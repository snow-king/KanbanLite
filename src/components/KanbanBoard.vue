<template>
  <div
    class="flex-col justify-between items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
  >
    <nav class="flex w-full bg-stone-600 p-2 justify-between shadow-md">
      <h1 class="text-white font-bold italic text-2xl ml-5">KanbanLite</h1>
      <button
        class="bg-red-400 p-1 rounded-lg text-white justify-center shadow-md hover:bg-red-700 px-2  hidden lg:block"
        @click="exit"
      >
        EXIT
      </button>
      <div class="md:hidden flex items-center">
        <button class="outline-none mobile-menu-button">
          <svg
            class="w-6 h-6 text-gray-500"
            x-show="!showMenu"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
    <div class="flex justify-around flex-wrap">
      <div
        v-for="stage in stages"
        :key="stage.id"
        @drop="onDrop($event, stage.id)"
        class="droppable flex-col w-full max-w-xs bg-stone-600 shadow-md m-6 h-min"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          class="flex items-center justify-center drop-shadow-lg bg-orange-500 text-lg text-white"
          :class="[stage.color]"
        >
          {{ stage.name }} &lt; {{ sumCards[stage.id] }} >
        </div>
        <div>
          <div
            v-for="card in cards
              .filter((x) => x.row === stage.id)
              .sort((x) => x.seq_num)"
            :key="card.id"
            @dragstart="onDragStart($event, card)"
            class="draggable m-4 flex-col bg-stone-700 p-3 cursor-move active:cursor-move"
            draggable="true"
          >
            <div class="flex justify-end">
              <button @click="deleteCard(card.id)">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1L1 17M17 17L1 1L17 17Z"
                    stroke="#A3A3A3"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div class="flex justify-start">
              <p class="text-bold text-white">ID:</p>
              <p class="text-gray-400 pl-2">{{ card.id }}</p>
            </div>
            <p class="text-gray-400">{{ card.text }}</p>
          </div>
          <div
            class="flex justify-center w-full"
            v-show="onHoldBtn.toggle && onHoldBtn.id_stage == stage.id"
          >
            <textarea
              v-model="preText"
              class="m-4 flex-col w-full bg-stone-500 p-3 shadow-md focus:outline-none focus:shadow-outline text-white resize-none text-sm"
            />
          </div>

          <div class="flex justify-center pb-3">
            <button
              class="text-gray-400 text-xl hover:bg-stone-700 cursor-pointer hover:shadow-md mt-2 p-2"
              @click="addCard(stage.id)"
              :class="{ 'border-gray-400': onHoldBtn.toggle }"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 7V0H7V7H0V9H7V16H9V9H16V7H9Z" fill="#9CA3AF" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/useUserStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const cards = ref(userStore.cards);
const preText = ref("");
const onHoldBtn = ref({
  toggle: false,
  id_stage: "0",
});
const stages = ref([
  {
    id: "0",
    name: "ON HOLD",
    color: "bg-orange-500",
  },
  {
    id: "1",
    name: "IN PROGRESS",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "NEEDS REVIEW",
    color: "bg-yellow-500",
  },
  {
    id: "3",
    name: "APPROVED",
    color: "bg-green-500",
  },
]);
userStore.refreshCards();
userStore.$subscribe((mutation, state) => {
  cards.value = userStore.cards;
});
const sumCards = computed(() => {
  return {
    0: cards.value.filter((x) => x.row === "0").length,
    1: cards.value.filter((x) => x.row === "1").length,
    2: cards.value.filter((x) => x.row === "2").length,
    3: cards.value.filter((x) => x.row === "3").length,
  };
});
const addCard = (id: string) => {
  if (!onHoldBtn.value.toggle) {
    onHoldBtn.value.id_stage = id;
    onHoldBtn.value.toggle = !onHoldBtn.value.toggle;
  } else {
    userStore.addCard(id, preText.value);
    preText.value = "";
    onHoldBtn.value.toggle = !onHoldBtn.value.toggle;
  }
};
const deleteCard = (idCard: number) => {
  userStore.deleteCard(idCard);
};
const exit = () => {
  userStore.resetUser();
  router.push({
    name: "Login",
  });
};
function onDragStart(e: DragEvent, item: any) {
  if (e.dataTransfer != undefined) {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("itemId", item.id.toString());
  }
}
function onDrop(e: DragEvent, stageId: string) {
  if (e.dataTransfer != undefined) {
    const itemId = parseInt(e.dataTransfer.getData("itemId"));
    cards.value = cards.value.map((x) => {
      if (x.id == itemId) x.row = stageId;
      userStore.updateCard(x.id, x.text, x.seq_num, x.row);
      return x;
    });
  }
}
</script>

<style></style>
