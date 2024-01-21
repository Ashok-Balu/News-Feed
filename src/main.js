import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import router from "./router";
// import './style.css'

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const pinia = createPinia();
const myApp = createApp(App);
myApp.use(router);
myApp.use(pinia);
myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

//Passing an argument:
myApp.directive("highlight", {
  mounted(el, binding) {
    // When the directive is mounted to an element
    el.style.backgroundColor = binding.value || "yellow"; // Set background color to the value passed or default to yellow
  },
  updated(el, binding) {
    // When the component using this directive is updated
    el.style.backgroundColor = binding.value || "yellow"; // Update background color if the binding value changes
  },
});

myApp.directive("colorIt1", {
  mounted(el, binding) {
    if (binding.arg == "color") {
      el.style.color = binding.value;
      el.style.fontFamily = "verdana";
    } else {
      el.style.color = "blue";
    }
  },
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
