import httpServise from "./http.services";

const professionEndpoint = "profession/";

const professionService = {
  get: async () => {
    const { data } = await httpServise.get(professionEndpoint);
    return data;
  }
};
export default professionService;
