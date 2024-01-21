import { useNewsStore } from "../../stores/news";

function restrictPageIfDirectlyAccessed(to) {
  const newsStore = useNewsStore();
  const restrictDirectAccessFlag = newsStore?.getRestrictDirectAccessFlag;

  if (restrictDirectAccessFlag && to?.meta?.restrictDirectAccess) {
    return { name: "sign-in" };
  }
}

export default restrictPageIfDirectlyAccessed;
