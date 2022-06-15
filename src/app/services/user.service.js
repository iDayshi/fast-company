import httpServise from "./http.services";

const userEndpoint = "user/";

const userServisece = {
  get: async () => {
    const { data } = await httpServise.get(userEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpServise.put(userEndpoint + payload._id, payload);
    return data;
  }
};

export default userServisece;
