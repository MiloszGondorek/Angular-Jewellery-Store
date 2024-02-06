import axios, { AxiosResponse } from 'axios';

export class http {
  static apiUrl = 'http://localhost:1337/api/';
  static test() {
    console.log(123);
  }
  static async getData(question: string): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(this.apiUrl + question);
      const data = response.data;
      const x: any[] = data.data;
      return x;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // lub możesz rzucić wyjątek, zależnie od wymagań aplikacji
    }
  }
}
