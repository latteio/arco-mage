import '@arco-design/web-vue/dist/arco.less';
import './components/index.less';
import './components/component.less';
import {createApp} from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import ArcoMage from '@/components';
import router from '@/router';
import App from '@/App.vue';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);

/* 加载组件 */
app.use(ArcoMage, {});

/* 加载路由 */
app.use(router);

/* 挂载app */
app.mount('#app');
