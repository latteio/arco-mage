import {App} from "vue";
import DialogBox from "@/components/dialog/dialog-box";

export default {
  install(app: App, config: any) {
    app.component('DialogBox', DialogBox);
  }
};