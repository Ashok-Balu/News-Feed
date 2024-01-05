<template>
  <div>
    <q-layout>
      <div class="q-pa-lg" align="center">
        <div class="q-gutter-md" style="width: 700px; max-width: 500px">
          <q-input
            ref="inputRef"
            v-model="searchQuery"
            placeholder="Search"
            filled
            outlined
            standout
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn @click="searchNews" color="primary" label="Search"></q-btn>
        </div>
      </div>
      <q-page padding>
        <div v-for="item in searchedNewsItem" :key="item.id">
          <div
            class="news-item"
            @click="openNewsTab(item.webUrl)"
            @mouseenter="hovered = true"
            @mouseleave="hovered = false"
          >
            <div class="news-item-image col-6">
              <q-img :src="item.fields.thumbnail" :ratio="1" />
            </div>
            <div class="news-item-details">
              <h2>{{ item.webTitle }}</h2>
              <p class="date">
                <span> {{ formattedDate(item.webPublicationDate) }} . </span>
                <span>News . </span>
                <span>{{ item.sectionName }}</span>
              </p>
            </div>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>
   
    
  <script setup>
import { ref, onMounted } from "vue";
import dateFormatter from "../utility/date-formatter";
import newsService from "../services/news-services.js";

const searchQuery = ref(null);
const searchedNewsItem = ref(null);
const inputRef = ref(null);

const searchNews = async () => {
  const getNewsResponse = await newsService.getSearchedNews(searchQuery.value);
  getNewsResponse.error
    ? handlegetNewsFailure(getNewsResponse?.error)
    : handlegetNewsSuccess(getNewsResponse?.data);
};

const handlegetNewsFailure = (error) => {
  //Response failure
  console.log("Error:", error);
};

const handlegetNewsSuccess = (getNewsResponse) => {
  //Response success
  searchedNewsItem.value = getNewsResponse?.data?.response?.results;
};

const formattedDate = (date) => {
  return dateFormatter.dateFormatter(date);
};


const openNewsTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

onMounted(() => {
  inputRef.value.focus();
});
</script>
    
<style scoped>
.news-item {
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 0;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s; 
}

.news-item-image {
  flex: 0 0 120px;
  margin-right: 20px;
}

.news-item-image img {
  width: 100%;
  height: auto;
}

.news-item-details {
  flex: 1;
}

h2 {
  margin-top: 0;
  font-size: 1.5rem;
  line-height: 1.2;
}

.description {
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.date {
  color: #888;
  font-size: 0.9rem;
}

.news-item:hover {
  background-color: #f5f5f5; /* Change background color on hover */
}
</style>