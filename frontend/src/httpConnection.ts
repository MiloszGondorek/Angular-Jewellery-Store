import axios, { AxiosResponse } from 'axios';

export class http {
  static apiUrl = 'http://YOUR_IP:1337';
  static async getData(question: string): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(
        this.apiUrl + '/api/' + question
      );
      const data = response.data;
      return data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  static getURL() {
    return this.apiUrl;
  }
}
