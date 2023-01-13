import Vuex from 'vuex';
import modal from './modules/modal';
import user from './modules/user';
import artwork from './modules/artwork';


const store = new Vuex.Store({
  modules: {
    modal,
    user,
    artwork,
  },
  strict: true,
});

export default store;