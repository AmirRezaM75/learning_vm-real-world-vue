export const namespaced = true;

export const state = {
    notifications: [],
}

let nextId = 1;

export const mutations = {
    PUSH(state, notification) {
        state.notifications.push({
            ...notification,
            id: nextId++
        })
    },
    DELETE(state , targetNotification) {
        state.notifications = state.notifications.filter(function(notification) {
            return notification.id !== targetNotification.id;
        });
    }
}

export const actions = {
    add({ commit }, notification) {
        commit('PUSH', notification);
    },
    remove({ commit }, notification) {
        commit('DELETE', notification);
    }
}
