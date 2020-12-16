import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 1013, username: 'microsoft' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [
      { id: 1, title: 'Read Book', organizer: 'John' },
      { id: 2, title: 'Write Journal', organizer: 'John' },
      { id: 3, title: 'Listen Podcast', organizer: 'Adam' },
      { id: 4, title: 'Speak English', organizer: 'Gregg' },
      { id: 4, title: 'Meditation', organizer: 'Daniel' }
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    mainEvents: state => state.events.filter(event => event.organizer === 'John'),
    subEventsCount: (state, getters) => state.events.length - getters.mainEvents.length,
    getEventById: state => id => state.events.find(event => event.id === id)
  }
});
