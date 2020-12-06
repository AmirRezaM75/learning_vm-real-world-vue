import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/events/create.vue";
import EventIndex from "../views/events/index.vue";
import EventShow from "../views/events/show.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/events/create',
    name: 'events.create',
    component: EventCreate
  },
  {
    path: '/events',
    name: 'events.index',
    component: EventIndex
  },
  {
    path: '/events/1/',
    name: 'events.show',
    component: EventShow
  }
];

export default new VueRouter({
  routes
});
