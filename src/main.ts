import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import locale from "element-plus/lib/locale/lang/fr";
import Element from "element-plus";
import "./assets/sass/customization.scss";
import "./assets/sass/element-variables.scss";
import "./assets/sass/customization.scss";
import "./assets/sass/paper-dashboard.scss";

//test
createApp(App).use(Element, { locale }).mount("#app");
