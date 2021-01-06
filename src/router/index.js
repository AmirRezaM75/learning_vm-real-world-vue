import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import NProgress from "nprogress";
import store from '@/store/index';

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
    component: EventList,
    props: true
  },
  {
    path: '/events/:id/',
    name: 'events.show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then( (event) => {
        routeTo.params.event = event;
        next();
      });
    }
  }
];

const vueRouter = new VueRouter({
  mode: 'history',
  routes
});

vueRouter.beforeEach( (routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

vueRouter.afterEach( () => {
  NProgress.done();
});

export default vueRouter;
