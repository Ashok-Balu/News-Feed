<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 1200px"
      class="shadow-2 rounded-borders"
    >
      <!-- Header -->
      <q-header reveal elevated class="bg-black text-white">
        <q-toolbar>
          <q-btn flat round dense icon="newspaper" class="q-mx-md" />
          <q-toolbar-title>News Buzz</q-toolbar-title>
          <q-btn
            flat
            round
            dense
            icon="home"
            @click="togglenewsCardSection"
            class="q-mx-md"
          />
          <q-input
            type="text"
            bg-color="white"
            filled
            outlined
            standout
            dense
            placeholder="Search News"
            @click="toggleSearchCardSection"
            class="q-mr-lg q-pg-lg"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <div class="q-pr-lg">{{ country }}</div>
        </q-toolbar>
      </q-header>
      <!-- Footer -->
      <q-footer reveal elevated class="bg-black text-white">
        <q-toolbar>
          <q-toolbar>
            <q-toolbar-title>
              <span class="text-weight-bold">&copy; {{ year }} </span>
              <span> News Buzz</span>
            </q-toolbar-title>
          </q-toolbar>
        </q-toolbar>
      </q-footer>
      <!-- Content -->
      <q-page-container v-if="showNewsSection">
        <q-page class="q-pa-md">
          <div class="row">
            <span class="text-h5 text-weight-bold q-ml-lg"
              >Welcome to News Buzz, {{ userName }}</span
            >
            <span class="text-h5 text-weight-bold q-ml-auto q-mr-lg">{{
              formattedDate
            }}</span>
          </div>
          <NewsHeadlines />
        </q-page>
      </q-page-container>
      <q-page-container v-if="showSearchSection">
        <q-page class="q-pa-md">
          <SearchNews />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNewsStore } from "../stores/news";
import { useRouter } from "vue-router";
import SearchNews from "../components/SearchNews.vue";
import NewsHeadlines from "../components/NewsHeadlines.vue";
import dateFormatter from "../utility/date-formatter";

const newsStore = useNewsStore();
const router = useRouter();

const showSearchSection = ref(false);
const showNewsSection = ref(true);

const year = computed(() => {
  return new Date().getFullYear();
});

const formattedDate = computed(() => {
  return dateFormatter.dateFormatter(new Date());
});

const userName = computed(() => {
  return newsStore.getUserName;
});

const country = computed(() => {
  return newsStore.getCountry;
});

const toggleSearchCardSection = () => {
  showNewsSection.value = !showNewsSection.value;
  showSearchSection.value = !showSearchSection.value;
  newsStore.setRestrictDirectAccessFlag(false);
  router.push({
    name: "search",
  });
};

const togglenewsCardSection = () => {
  showNewsSection.value = !showNewsSection.value;
  showSearchSection.value = !showSearchSection.value;
  newsStore.setRestrictDirectAccessFlag(false);
  router.push({
    name: "news-feed",
  });
};
</script>