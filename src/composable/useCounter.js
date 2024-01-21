import { ref } from "vue";

function useCounter(initialSize = 0, stepsize = 1) {
  const count = ref(initialSize);
  function incrementCount() {
    count.value += stepsize;
  }

  return {
    count,
    incrementCount,
  };
}
export default useCounter;
