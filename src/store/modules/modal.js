const state = {
  modal: {
    isOpen: false,
    component: null,
  }
};

const mutations = {
  OPEN_MODAL: ({modal}, componentName) => {
    modal.isOpen = true;
    modal.component = componentName;
  },
  CLOSE_MODAL: ({modal}) => {
    modal.isOpen = false;
    modal.component = null;
  },
};

const actions = {
  openModal: ({commit}, componentName) => commit('OPEN_MODAL', componentName),
  closeModal: ({commit}) => commit('CLOSE_MODAL'),
};

const getters = {
  isModalOpen: (state) => state.modal.isOpen,
  modalComponent: (state) => state.modal.component,
};

const moduleTodoList = {
  state,
  mutations,
  actions,
  getters,
};

export default moduleTodoList;