import httpServise from "./http.services";

const userEndpoint = "user/";

const userServisece = {
  get: async () => {
    const { data } = await httpServise.get(userEndpoint);
    return data;
  }
};

export default userServisece;
