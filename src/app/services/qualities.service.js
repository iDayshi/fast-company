import httpServise from "./http.services";

const qualitiesEndpoint = "quality/";

const qualitiesService = {
  get: async () => {
    const { data } = await httpServise.get(qualitiesEndpoint);
    return data;
  }
};
export default qualitiesService;
