import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";

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
    component: EventList
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
