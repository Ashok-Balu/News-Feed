import { defineStore } from "pinia";

export const useNewsStore = defineStore({
  id: "news",
  state: () => ({
    userName: "",
    country: "India",
    restrictDirectAccessFlag: true,
  }),
  getters: {
    getUserName: (state) => state.userName,
    getCountry: (state) => state.country,
    getRestrictDirectAccessFlag: (state) => state.restrictDirectAccessFlag,
  },
  actions: {
    setUserName(userName) {
      this.userName = userName;
    },
    setRestrictDirectAccessFlag(restrictDirectAccessFlag) {
      this.restrictDirectAccessFlag = restrictDirectAccessFlag;
    },
  },
});
