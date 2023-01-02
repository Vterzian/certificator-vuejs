import Vuex from 'vuex';
import modal from './modules/modal';


const store = new Vuex.Store({
  modules: {
    modal,
  },
  strict: true,
});

export default store;