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
    path: '/events/:id/',
    name: 'events.show',
    component: EventShow,
    props: true
  }
];

export default new VueRouter({
  mode: 'history',
  routes
});
