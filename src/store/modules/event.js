import EventService from "@/services/EventService";

export const namespaced = true;

export const state = {
    events: [],
    event: null,
    eventsTotal: 0
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event);
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    SET_EVENT(state, event) {
        state.event = event;
    },
    SET_EVENTS_TOTAL(state, total) {
        state.eventsTotal = total;
    }
}

export const actions = {
    createEvent({ commit, dispatch }, event) {
        return EventService.postEvent(event).then(function () {
            commit('ADD_EVENT', event);
            let notification = {
                type: 'success',
                message: 'Your event has been created'
            }
            dispatch('notification/add', notification, { root: true})
        }).catch(function (error) {
            let notification = {
                type: 'error',
                message: 'There was a problem saving event: ' + error.message
            }
            dispatch('notification/add', notification, { root: true})
            throw error;
        });
    },
    fetchEvents({ commit, dispatch }, { limit, page }) {
        EventService.getEvents(limit, page)
            .then(response => {
                commit('SET_EVENTS', response.data)
                commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
            })
            .catch(error => {
                let notification = {
                    type: 'error',
                    message: 'There was a problem fetching events: ' + error.message
                }
                dispatch('notification/add', notification, { root: true})
            });
    },
    fetchEvent({ commit, getters, dispatch }, id) {
        let event = getters.getEventById(id);

        if (event) {
            commit('SET_EVENT', event);
            return;
        }

        EventService.getEvent(id)
            .then(response => {
                commit('SET_EVENT', response.data);
            })
            .catch(error => {
                let notification = {
                    type: 'error',
                    message: 'There was a problem fetching event: ' + error.message
                }
                dispatch('notification/add', notification, { root: true})
            });
    }
}

export const getters = {
    mainEvents: state => state.events.filter(event => event.organizer === 'John'),
        subEventsCount: (state, getters) => state.events.length - getters.mainEvents.length,
        getEventById: state => id => state.events.find(event => event.id === id)
}
