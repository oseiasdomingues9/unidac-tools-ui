import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoFilter, BiTools,FcCheckmark,BiXLg,HiRefresh,BiEye} from "oh-vue-icons/icons";
addIcons(BiTools,CoFilter,FcCheckmark,BiXLg,HiRefresh,BiEye);

export const icons = {
    install(app : any) {
        app.component("v-icon", OhVueIcon);
    }
  }