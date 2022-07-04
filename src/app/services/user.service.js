import httpServise from "./http.services";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userServisece = {
  get: async () => {
    const { data } = await httpServise.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpServise.put(userEndpoint + payload._id, payload);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpServise.get(
      userEndpoint + localStorageService.getUserId()
    );
    return data;
  },
  update: async (payload) => {
    const { data } = await httpServise.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    );
    return data;
  }
};

export default userServisece;
