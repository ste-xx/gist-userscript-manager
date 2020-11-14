import devtools from "@vue/devtools"; // Must be imported before vue
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/index.css";
import { FontAwesomeIcon } from "@/components/FontAwesomeIcon/fontAwesome.ts";

devtools.connect();

const app = createApp(App)
  .component("fa", FontAwesomeIcon);

app.mount("#app");
