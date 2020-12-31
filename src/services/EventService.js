import axios from 'axios';
import NProgress from 'nprogress'

const apiClient = new axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
});

apiClient.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
});

export default {
    getEvents(limit, page) {
        return apiClient.get('events?_limit=' + limit + '&_page=' + page);
    },

    getEvent(id) {
        return apiClient.get('events/' + id)
    },

    postEvent(event) {
        return apiClient.post('events', event)
    }
}
