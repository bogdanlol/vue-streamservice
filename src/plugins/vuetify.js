import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);
import ro from 'vuetify/lib/locale/ro'

export default new Vuetify({
  // theme: { dark: true },
  iconfont: 'mdi',
  lang: {
    locales: { ro },
    current: 'ro',
  },
});