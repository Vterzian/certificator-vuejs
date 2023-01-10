const state = {
  modal: {
    isOpen: false,
    component: null,
    props: null,
  }
};

const mutations = {
  OPEN_MODAL: ({modal}, { componentName, props }) => {
    modal.isOpen = true;
    modal.component = componentName;
    modal.props = props;
  },
  CLOSE_MODAL: ({modal}) => {
    modal.isOpen = false;
    modal.component = null;
    modal.props = null;
  },
};

const actions = {
  openModal: ({commit}, data) => commit('OPEN_MODAL', data),
  closeModal: ({commit}) => commit('CLOSE_MODAL'),
};

const getters = {
  isModalOpen: (state) => state.modal.isOpen,
  modalProps: (state) => state.modal.props,
  modalComponent: (state) => state.modal.component,
};

const moduleModal = {
  state,
  mutations,
  actions,
  getters,
};

export default moduleModal;