import Vue from "vue";
import Vuex from "vuex";
import * as user from '@/store/modules/user';
import * as event from '@/store/modules/event';
import * as notification from '@/store/modules/notification';
// what * is doing is importing all public items into user namespace

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  modules: {
    user,
    event,
    notification
  }
});
