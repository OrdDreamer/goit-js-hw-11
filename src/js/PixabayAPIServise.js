import axios from 'axios';

const API_KEY = "11787817-40db1f003b43fc092494dffec";
const QUERY_SETTINGS = `image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

axios.defaults.baseURL = "https://pixabay.com/api";

export default class PixabayAPIServise {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  async getImages(query, page = 1) {
    this.page = page;
    this.searchQuery = query;
    try {
      const response = await axios.get(
        `/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${QUERY_SETTINGS}`
      );
      return await response.data;
    } catch (error) {
      console.warn(error.message);
      return [];
    }
  }

  async getNextImages() {
    this.page += 1;
    return await this.getImages(this.searchQuery, this.page);
  }
}