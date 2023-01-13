const baseUrl = process.env.VUE_APP_API_BASE_URL;
const sliceUrl = 'artworks';

const state = {
  artwork: {
    page: [],
    isLoading: false,
    error: null,
  }
};

const mutations = {
  FETCH_ARTWORK_LOADING: ({artwork}) => {
    artwork.isLoading = true;
    artwork.error = null;
  },
  FETCH_ARTWORK_SUCCESS: ({artwork}, artworkData) => {
    artwork.isLoading = false;
    artwork.page = artworkData;
  },
  FETCH_ARTWORK_ERROR: ({artwork}, error) => {
    artwork.isLoading = false;
    artwork.error = error;
  },
  ADD_ARTWORK_LOADING: ({artwork}) => {
    artwork.isLoading = true;
    artwork.error = null;
  },
  ADD_ARTWORK_SUCCESS: ({artwork}) => {
    artwork.isLoading = false;
  },
  ADD_ARTWORK_ERROR: ({artwork}, error) => {
    artwork.isLoading = false;
    artwork.error = error;
  },
  UPDATE_ARTWORK_LOADING: ({artwork}) => {
    artwork.isLoading = true;
    artwork.error = null;
  },
  UPDATE_ARTWORK_SUCCESS: ({artwork}, updatedArtwork) => {
    artwork.isLoading = false;
    const index = artwork.page.data.findIndex((item) => item.id === updatedArtwork.id);

    if (index > -1) {
      artwork.page.data[index] = updatedArtwork;
    }
  },
  UPDATE_ARTWORK_ERROR: ({artwork}, error) => {
    artwork.isLoading = false;
    artwork.error = error;
  },
  DELETE_ARTWORK_LOADING: ({artwork}) => {
    artwork.isLoading = true;
    artwork.error = null;
  },
  DELETE_ARTWORK_SUCCESS: ({artwork}) => {
    artwork.isLoading = false;
  },
  DELETE_ARTWORK_ERROR: ({artwork}, error) => {
    artwork.isLoading = false;
    artwork.error = error;
  },
  FETCH_ARTWORK_PDF_LOADING: ({artwork}) => {
    artwork.isLoading = true;
    artwork.error = null;
  },
  FETCH_ARTWORK_PDF_SUCCESS: ({artwork}) => {
    artwork.isLoading = false;
  },
  FETCH_ARTWORK_PDF_ERROR: ({artwork}, error) => {
    artwork.isLoading = false;
    artwork.error = error;
  },
};

const actions = {
  fetchArtworkList: ({commit}, { page = 1, perPage = 15 }) => {
    const options = {
      method: 'GET',
    };

    commit('FETCH_ARTWORK_LOADING');

    fetch(`${baseUrl}/${sliceUrl}?page=${page}&perPage=${perPage}`, options)
      .then((response) => response.json())
      .then((data) => commit('FETCH_ARTWORK_SUCCESS', data))
      .catch((error) => commit('FETCH_ARTWORK_ERROR', error));
  },
  addArtwork: ({commit, dispatch, state}, data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('width', data.width);
    formData.append('height', data.height);
    formData.append('signature', data.signature);
    formData.append('technique', data.technique);
    formData.append('date_creation', new Date(data.dateCreation).toISOString().split('.')[0]);
    formData.append('image', data.image);

    const options = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    commit('ADD_ARTWORK_LOADING');

    fetch(`${baseUrl}/${sliceUrl}`, options)
      .then((response) => response.json())
      .then((data) => {
        commit('ADD_ARTWORK_SUCCESS', data);
        dispatch('fetchArtworkList', { page: state.artwork.page.current_page, perPage: state.artwork.page.per_page});
      })
      .catch((error) => commit('ADD_ARTWORK_ERROR', error));

  },
  updateArtwork: ({commit}, data) => {
    const parsedData = { 
      ...data, 
      date_creation: new Date(data.dateCreation).toISOString().split('.')[0]
    };
    delete parsedData.dateCreation;

    const options = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData),
    };

    commit('UPDATE_ARTWORK_LOADING');

    fetch(`${baseUrl}/${sliceUrl}/${data.id}`, options)
      .then((response) => response.json())
      .then((data) => {
        commit('UPDATE_ARTWORK_SUCCESS', data);
      })
      .catch((error) => commit('UPDATE_ARTWORK_ERROR', error));
  },
  deleteArtwork: ({commit, dispatch, state}, artworkId) => {
    const options = {
      method: 'DELETE',
    };

    commit('DELETE_ARTWORK_LOADING');

    fetch(`${baseUrl}/${sliceUrl}/${artworkId}`, options)
    .then((response) => response.json())
    .then(() => {
      dispatch('fetchArtworkList', { page: state.artwork.page.current_page, perPage: state.artwork.page.per_page });
      commit('DELETE_ARTWORK_SUCCESS');
    })
    .catch((error) => commit('DELETE_ARTWORK_ERROR', error));
  },
  getPdf: ({commit}, artworkId) => {
    const options = {
      method: 'GET',
    };

    commit('FETCH_ARTWORK_PDF_LOADING');

    fetch(`${baseUrl}/${sliceUrl}/${artworkId}/pdf`, options)
    .then((response) => response.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(blob);
      a.download = 'FILENAME';
      a.click();
      commit('FETCH_ARTWORK_PDF_SUCCESS');
    })
    .catch((error) => commit('FETCH_ARTWORK_PDF_ERROR', error));
  },
};

const getters = {
  artworkList: ({artwork}) => artwork.page.data,
  artworkListLastPage: ({artwork}) => artwork.page.last_page,
  artworkIsLoading: ({artwork}) => artwork.isLoading,
  artworkError: ({artwork}) => artwork.error,
  artworkListCurrentPage: ({artwork}) => artwork.page.current_page,
};

const moduleArtwork = {
  state,
  mutations,
  actions,
  getters,
};

export default moduleArtwork;