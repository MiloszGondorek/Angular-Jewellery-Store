import axios, { AxiosResponse } from 'axios';

export class http {
  static apiUrl = 'http://192.168.0.164:1337';
  static async getData(question: string): Promise<any[]> {
    try {
      const response: AxiosResponse = await axios.get(
        this.apiUrl + '/api/' + question
      );
      const data = response.data;
      return data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // lub możesz rzucić wyjątek, zależnie od wymagań aplikacji
    }
  }
  static getURL() {
    return this.apiUrl;
  }
}

export class ServerItem {
  id!: number;
  name!: string;
  price!: number;
  MainImage!: string;
  desc!: string;
  collectionId!: number;
  metalId!: number;
  categoryId!: number;
}

export class ServerCategory {
  id!: number;
  name!: string;
  desc!: string;
  sizes!: any[];

  static allIds = 0;
  constructor(name: string, desc: string, size: any[]) {
    this.id = ServerCategory.allIds;
    ServerCategory.allIds++;
    this.name = name;
    this.desc = desc;
    this.sizes = size;
  }
}

export class ServerCollection {
  id!: number;
  name!: string;
  desc!: string;
  src!: string;

  static allIds = 0;
  constructor(name: string, desc: string, src: string) {
    this.id = ServerCollection.allIds;
    ServerCollection.allIds++;
    this.name = name;
    this.desc = desc;
    this.src = src;
  }
}

export class ServerMetal {
  id!: number;
  name!: string;
}

export class ServerData {
  static catergories: ServerCategory[] = [
    new ServerCategory(
      'bracelets',
      'Bracelets are beautiful adornments for the wrist, adding flair and personality to any ensemble. From sleek bangles that effortlessly elevate a professional look to charm bracelets that tell a unique story with each dangling trinket, bracelets come in a myriad of styles and materials to suit every taste and occasion. Whether worn alone as a subtle accent or stacked for a bold statement, bracelets are versatile accessories that allow individuals to showcase their personal style and creativity.',
      [6, 7, 8, 9]
    ),
    new ServerCategory(
      'earrings',
      'Earrings are versatile accessories that frame the face and add a touch of sparkle and personality to any outfit. From classic studs that exude timeless elegance to glamorous chandelier earrings that command attention, the world of earrings is as diverse as it is enchanting. With options ranging from minimalist designs perfect for everyday wear to elaborate creations suited for special occasions, earrings offer endless possibilities for self-expression and style.',
      []
    ),
    new ServerCategory(
      'necklaces',
      'Necklaces are exquisite pieces of jewelry that beautifully frame the neckline and add a touch of sophistication to any ensemble. From delicate chains adorned with dainty pendants to statement pieces featuring intricate designs and vibrant gemstones, necklaces come in an endless variety of styles, lengths, and materials. Whether worn as a subtle accent or a bold statement piece, necklaces have the power to elevate any look and express individuality with elegance and flair.',
      [14, 18, 22, 28]
    ),
    new ServerCategory(
      'rings',
      'Rings are timeless symbols of love, commitment, and style. Whether adorned with dazzling gemstones or crafted from precious metals, rings hold a special place in our hearts and adorn our fingers with elegance and grace. From engagement rings symbolizing lifelong partnerships to fashion rings adding a touch of glamour to everyday attire, this category encompasses a wide array of designs, ranging from classic to contemporary, to suit every taste and occasion.',
      [5, 6, 7, 8, 9, 10]
    ),
  ];

  static collections: ServerCollection[] = [
    new ServerCollection(
      'Ethereal Enchantment',
      'Ethereal Enchantment captures the essence of celestial beauty, intertwining delicate motifs inspired by the cosmos with the brilliance of gemstones. Each piece in this collection exudes an otherworldly charm, as if plucked from the stars themselves. Adorn yourself with these celestial treasures and become a beacon of ethereal allure wherever you go.',
      '/uploads/collection_1_fb356bf450.png'
    ),
    new ServerCollection(
      'Oasis',
      'Oasis invites you to immerse yourself in the opulence of desert landscapes, where shimmering sands meet radiant sunsets. This collection celebrates the warmth and splendor of gold, accented by intricate designs reminiscent of ancient civilizations. With each piece, experience the timeless allure of luxury and embark on a journey to your own personal oasis of elegance.',
      '/uploads/collection_1_fb356bf450.png'
    ),
    new ServerCollection(
      'Oceanic Serenade',
      `Dive into the depths of beauty with Oceanic Serenade, a collection that echoes the mesmerizing allure of the sea. Inspired by the rhythmic dance of waves and the enchanting hues of marine life, each piece is crafted to evoke a sense of tranquility and grace. Let the ocean's melody serenade you as you adorn yourself with these exquisite treasures, reminiscent of the mysteries that lie beneath the surface.`,
      '/uploads/collection_1_fb356bf450.png'
    ),
    new ServerCollection(
      'Whispering Woods',
      'Step into an enchanted realm with Whispering Woods, where the magic of nature intertwines with the elegance of jewelry. Inspired by the lush foliage and timeless mystique of ancient forests, this collection features intricate leafy motifs and earthy tones. Embrace the whispers of the woods as you wear these pieces, connecting with the serenity and natural beauty that surrounds us.   ',
      '/uploads/collection_1_fb356bf450.png'
    ),
  ];

  static getCollections() {
    return this.collections;
  }
  static getData() {
    const json = JSON.stringify(this.collections);
    console.log(json);
  }
}
