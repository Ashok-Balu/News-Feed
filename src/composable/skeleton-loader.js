import { ref } from "vue";

export const useSkeletonLoader = () => {
  const componentIsReadyToBeDisplayed = ref(false);

  const showSkeleton = () => {
    componentIsReadyToBeDisplayed.value = false;
  };

  const hideSkeleton = () => {
    componentIsReadyToBeDisplayed.value = true;
  };

  return {
    componentIsReadyToBeDisplayed,
    showSkeleton,
    hideSkeleton,
  };
};
