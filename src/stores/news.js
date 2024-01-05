import { defineStore } from "pinia";

export const useNewsStore = defineStore({
    id: "news",
    state: () => ({
        userName: "",
        country: "India",
    }),
    getters: {
        getUserName: (state) => state.userName,
        getCountry: (state) => state.country,
    },
    actions: {
        setUserName(userName) {
            this.userName = userName;
        },
    },
});