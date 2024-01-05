import axios from "axios";

class SearchNewsService {
    async getSearchedNews(searchField) {
        let getNewsResponse = {
            error: null,
            data: null,
        };
        try {
            const response = await axios.get(
                `http://content.guardianapis.com/search?api-key=test&q=${searchField}&show-fields=thumbnail,headline&page=1&page-size=10`
            );
            if (response.status == 200) {
                getNewsResponse.data = response;
            }
            else {
                getNewsResponse.error = "UNABLE_TO_GET_DATA";
            }
        }
        catch (error) {
            getNewsResponse.error = "UNABLE_TO_GET_DATA";
        }
        return getNewsResponse;
    }

    async getFeedNews() {
        let getNewsResponse = {
            error: null,
            data: null,
        };
        try {
            const response = await axios.get(
                `https://content.guardianapis.com/search?show-fields=thumbnail%2Cheadline&page=1&page-size=200&api-key=test`
            );
            if (response.status == 200) {
                getNewsResponse.data = response;
            }
            else {
                getNewsResponse.error = "UNABLE_TO_GET_DATA";
            }
        }
        catch (error) {
            getNewsResponse.error = "UNABLE_TO_GET_DATA";
        }
        return getNewsResponse;
    }
}

export default new SearchNewsService();