import { clearAuthToken, setAuthToken, logoutUser } from '@/helpers/auth';
import router from '@/router';

const baseUrl = process.env.VUE_APP_API_BASE_URL;
const sliceUrl = 'users';

const state = {
  user: {
    me: null,
    token: null,
    isLoading: false,
    error: null,
  }
};

const mutations = {
  LOGIN_LOADING: ({user}) => {
    user.isLoading = true;
    user.error = null;
  },
  LOGIN_SUCCESS: ({user}, data) => {
    user.me = data.user;
    user.token = data.access_token;
    user.isLoading = false;
  },
  LOGIN_ERROR: ({user}, error) => {
    user.isLoading = false;
    user.error = error;
  },
  LOGOUT_SUCCESS: ({user}) => {
    user.me = null;
    user.token = null;
    user.isLoading = false;
    clearAuthToken();
  },
};

const actions = {
  login: ({commit}, { email, password }) => {
    const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    commit('LOGIN_LOADING');

    fetch(`${baseUrl}/${sliceUrl}/login`, options)
      .then((response) => response.json())
      .then((data) => {
        setAuthToken(data.access_token);
        commit('LOGIN_SUCCESS', data);
        router.push({ name: 'home' });
      })
      .catch((error) => commit('LOGIN_ERROR', error));
  },
  logout: ({commit}) => {

    commit('LOGOUT_SUCCESS');
    logoutUser();
    router.push({ name: 'logIn' });
  }
};

const getters = {
  me: ({user}) => user.me,
  token: ({user}) => user.token,
  refresh: ({user}) => user.refresh,
  userIsLoading: ({user}) => user.isLoading,
  userError: ({user}) => user.error,
};

const moduleUser = {
  state,
  mutations,
  actions,
  getters,
};

export default moduleUser;