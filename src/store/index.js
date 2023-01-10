import Vuex from 'vuex';
import modal from './modules/modal';
import artwork from './modules/artwork';


const store = new Vuex.Store({
  modules: {
    modal,
    artwork,
  },
  strict: true,
});

export default store;