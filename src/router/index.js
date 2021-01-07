import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import NotFound from "../views/NotFound";
import NetworkIssue from "../views/NetworkIssue";
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
      }).catch( error => {
        if (error.response && error.response.status === 404) {
          next({ name: '404', params: { resource : 'event' } })
        } else {
          next('/network-issue')
        }
      });
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*', // this will catch all navigation that doesn't match any of the routes listed above it
    redirect: { name: '404', params: { resource : 'page' } }
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
