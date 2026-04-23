import {App} from "vue";
import MagConfirmButton from "@/components/form/MagConfirmButton";
import MagDialogBox from "@/components/dialog/MagDialogBox";
import MagTableCard from "@/components/table/MagTableCard";
import MagTableFilter from "@/components/table/MagTableFilter.vue";

export default {
  install(app: App, config: any) {
    console.log('ArcoMage components install: ', config)
    app.component('MagConfirmButton', MagConfirmButton);
    app.component('MagDialogBox', MagDialogBox);
    app.component('MagTableCard', MagTableCard);
    app.component('MagTableFilter', MagTableFilter);
  }
};
