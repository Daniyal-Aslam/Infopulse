import axios, { AxiosResponse } from 'axios';
const API_BASE_URL = 'https://newsapi.org/v2/everything';
const API_KEY = 'efb0fc353b984f4192157054133f6131';  

const Api = {
  fetchData: async (category: string, language: string): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse = await axios.get(API_BASE_URL, {
        params: {
          apiKey: API_KEY,
          q: category,
          language: language,  
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data from API');
    }
  },
};

export default Api;
