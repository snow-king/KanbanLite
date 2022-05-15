import { addCard, deleteCard, editCard, getCards } from "@/services/cards";
import { refreshUserToken } from "@/services/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      username: "",
      email: "",
      password: "",
      token: "",
    },
    cards: [{ id: 1, row: "2", seq_num: 1, text: "start working" }],
  }),
  persist: true,
  getters: {},
  actions: {
    async refreshToken() {
      this.user.token = (await refreshUserToken(this.user.token)).token;
    },
    async refreshCards() {
      this.cards = await getCards(this.user.token);
    },
    async addCard(row: string, text: string) {
      await addCard(this.user.token, `${row}`, text);
      this.refreshCards();
    },
    async updateCard(id: number, text: string, seq_num: number, row: string) {
      await editCard(this.user.token, id, row, text, seq_num);
      this.refreshCards();
    },
    async deleteCard(id: number){
      await deleteCard(this.user.token, id);
      this.refreshCards();
    },

    resetUser() {
      this.user = {
        username: "",
        email: "",
        password: "",
        token: "",
      };
      this.cards = [];
    },
  },
});
