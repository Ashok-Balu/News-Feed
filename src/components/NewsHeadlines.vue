<template>
  <div v-if="componentIsReadyToBeDisplayed">
    <q-layout>
      <q-page-container class="q-pt-sm">
        <div class="q-pa-xs example-col-gutter-mixed">
          <div class="row q-col-gutter-x-xs q-col-gutter-y-xs">
            <q-card
              class="my-card q-ma-md news-item"
              v-for="item in displayedItems"
              :key="item.id"
              @click="openNewsTab(item.webUrl)"
              @mouseenter="hovered = true"
              @mouseleave="hovered = false"
              style="width: 445px; height: 450px"
            >
              <img :src="item.fields.thumbnail" />
              <q-card-section>
                <div class="q-pb-lg text-h6">{{ item.webTitle }}</div>
              </q-card-section>
              <q-card-section v-highlight="'cyan'" class="absolute-bottom-left">
                <span v-colorIt1:color="'Red'">|</span>
                {{ item.sectionName.toUpperCase() }}
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- Pagination -->
        <div>
          <q-pagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :max="20"
            :max-pages="6"
            @input="changePage"
            direction-links
            flat
            color="grey"
            active-color="primary"
            class="flex-center"
          />
        </div>
      </q-page-container>
    </q-layout>
  </div>
  <NewsFeedSkeleton v-if="!componentIsReadyToBeDisplayed" />
</template>
     
      
<script setup>
import { ref, computed } from "vue";
import NewsFeedSkeleton from "./NewsFeedSkeleton.vue";
import { useSkeletonLoader } from "../composable/skeleton-loader";
import newsService from "../services/news-services.js";

const items = ref([]);
const pageSize = ref(12);
const currentPage = ref(1);

const { componentIsReadyToBeDisplayed, showSkeleton, hideSkeleton } =
  useSkeletonLoader();

const totalPages = computed(() => {
  return Math.ceil(items.value.length / pageSize.value);
});

const displayedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return items.value.slice(startIndex, endIndex);
});

const searchFeedNews = async () => {
  showSkeleton();
  const getNewsResponse = await newsService.getFeedNews();
  getNewsResponse.error
    ? handlegetFeedNewsFailure(getNewsResponse?.error)
    : handlegetFeedNewsSuccess(getNewsResponse?.data);
};

const handlegetFeedNewsFailure = (error) => {
  //Response failure
  console.log("Error:", error);
};

const handlegetFeedNewsSuccess = (getNewsResponse) => {
  //Response success
  items.value = getNewsResponse?.data?.response?.results;
  hideSkeleton();
};
const changePage = (page) => {
  currentPage.value = page;
};

const openNewsTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

searchFeedNews();
</script>
      
<style>
.news-item:hover {
  background-color: #f5f5f5;
  /* Change background color on hover */
}
</style>