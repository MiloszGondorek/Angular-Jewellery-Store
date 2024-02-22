import axios, { AxiosResponse } from 'axios';
export class http {
  static apiUrl = 'http://localhost:4200';
  static async getData(question: string): Promise<any[]> {
    return [];
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
  allImages!: string[];

  static allIds = 0;
  constructor(
    name: string,
    price: number,
    src: string,
    categoryId: number,
    metalId: number,
    collId?: string,
    allImages?: string[]
  ) {
    this.id = ServerItem.allIds;
    ServerItem.allIds++;

    this.name = name;
    this.desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis interdum magna, nec elementum sem pulvinar et. Donec nec tempus magna. Donec orci nisi, pretium eu laoreet at, aliquam ut odio. Duis eu metus vitae ligula pulvinar sollicitudin. Nunc hendrerit lacus in purus dictum, ut consectetur felis iaculis. Aenean tincidunt purus mollis lacus maximus, in fringilla odio mattis. Duis interdum orci id velit lacinia, nec blandit nunc euismod. Nullam dolor neque, semper sit amet odio ac, imperdiet accumsan nibh. Duis eu quam ut tellus feugiat porttitor. Maecenas ac nisl nec augue tempus feugiat id ut velit. Etiam risus massa, dictum a tempus ac, dictum vitae lectus. 
    Mauris in enim purus. Curabitur ut tellus a odio iaculis facilisis. Donec et mi nisi. Morbi id libero nunc. Curabitur magna ligula, varius vel nulla tempor, fringilla mattis ex. Proin sit amet vulputate sapien. Proin magna nibh, rhoncus ut consectetur pharetra, molestie ac sapien. Maecenas egestas, urna eu elementum congue, lacus massa hendrerit ipsum, vel suscipit ex nulla vitae libero. Suspendisse sed sapien at turpis mollis pellentesque in et purus. Aliquam molestie tempor lacus, et pellentesque est tincidunt sed. Nulla facilisis lacus facilisis justo efficitur, eget varius metus consequat. Proin ut dui ut eros rhoncus rhoncus bibendum id erat. Sed eget suscipit purus. Sed at aliquam metus. Nunc at vestibulum urna, non dapibus mi.`;

    this.price = price;
    this.MainImage = src;
    this.metalId = metalId;
    this.categoryId = categoryId;
    if (collId) {
      this.collectionId = Number.parseInt(collId);
    }
    if (allImages) {
      this.allImages = allImages;
    }
  }
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

  static allIds = 0;
  constructor(name: string) {
    this.id = ServerMetal.allIds;
    ServerMetal.allIds++;
    this.name = name;
  }
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

  static metals: ServerMetal[] = [
    new ServerMetal('Gold'),
    new ServerMetal('Silver'),
    new ServerMetal('Platinum'),
  ];

  static items: ServerItem[] = [
    new ServerItem(
      'Moonlit Serenade',
      550,
      '/assets/uploads/necklaces/necklace 1.png',
      2,
      0,
      '0',
      ['/assets/uploads/all/necklaces/necklace 1.jpg']
    ),
    new ServerItem(
      'Enchanted Garden',
      480,
      '/assets/uploads/necklaces/necklace 2.png',
      2,
      2,
      '1',
      ['/assets/uploads/all/necklaces/necklace 2.jpg']
    ),
    new ServerItem(
      'Celestial Harmony',
      620,
      '/assets/uploads/necklaces/necklace 3.png',
      2,
      1,
      '2',
      ['/assets/uploads/all/necklaces/necklace 3.jpg']
    ),
    new ServerItem(
      'Ocean Whisper',
      420,
      '/assets/uploads/necklaces/necklace 4.png',
      2,
      0,
      '3',
      ['/assets/uploads/all/necklaces/necklace 4.jpg']
    ),
    new ServerItem(
      'Golden Radiance',
      720,
      '/assets/uploads/necklaces/necklace 5.png',
      2,
      2,
      '',
      ['/assets/uploads/all/necklaces/necklace 5.jpg']
    ),
    new ServerItem(
      'Whispering Winds',
      390,
      '/assets/uploads/necklaces/necklace 6.png',
      2,
      0,
      '0',
      ['/assets/uploads/all/necklaces/necklace 6.jpg']
    ),
    new ServerItem(
      'Vintage Lace',
      250,
      '/assets/uploads/necklaces/necklace 7.png',
      2,
      1,
      '1',
      ['/assets/uploads/all/necklaces/necklace 7.jpg']
    ),
    new ServerItem(
      'Aurora Borealis',
      580,
      '/assets/uploads/necklaces/necklace 8.png',
      2,
      2,
      '2',
      ['/assets/uploads/all/necklaces/necklace 8.jpg']
    ),
    new ServerItem(
      'Twilight Teardrop',
      180,
      '/assets/uploads/earrings/earring 1.png',
      1,
      0,
      '0',
      ['/assets/uploads/all/earrings/earring 1.jpg']
    ),
    new ServerItem(
      'Serene Sunburst',
      220,
      '/assets/uploads/earrings/earring 2.png',
      1,
      1,
      '1',
      ['/assets/uploads/all/earrings/earring 2.jpg']
    ),
    new ServerItem(
      'Enchanted Forest',
      250,
      '/assets/uploads/earrings/earring 3.png',
      1,
      0,
      '2',
      ['/assets/uploads/all/earrings/earring 3.jpg']
    ),
    new ServerItem(
      'Oceanic Opulence',
      290,
      '/assets/uploads/earrings/earring 4.png',
      1,
      2,
      '3',
      ['/assets/uploads/all/earrings/earring 4.jpg']
    ),
    new ServerItem(
      'Golden Gleam',
      200,
      '/assets/uploads/earrings/earring 5.png',
      1,
      0,
      '',
      ['/assets/uploads/all/earrings/earring 5.jpg']
    ),
    new ServerItem(
      'Starlight Sparkle',
      280,
      '/assets/uploads/bracelets/bracelet 1.png',
      0,
      2,
      '0',
      ['/assets/uploads/all/bracelets/bracelet 1.jpg']
    ),
    new ServerItem(
      'Tranquil Waves',
      360,
      '/assets/uploads/bracelets/bracelet 2.png',
      0,
      2,
      '1',
      ['/assets/uploads/all/bracelets/bracelet 2.jpg']
    ),
    new ServerItem(
      'Gilded Garden',
      420,
      '/assets/uploads/bracelets/bracelet 3.png',
      0,
      2,
      '2',
      ['/assets/uploads/all/bracelets/bracelet 3.jpg']
    ),
    new ServerItem(
      'Enchanting Charm',
      250,
      '/assets/uploads/bracelets/bracelet 5.png',
      0,
      0,
      '',
      ['/assets/uploads/all/bracelets/bracelet 5.jpg']
    ),
    new ServerItem(
      'Silver Elegance',
      480,
      '/assets/uploads/bracelets/bracelet 6.png',
      0,
      2,
      '1',
      ['/assets/uploads/all/bracelets/bracelet 6.jpg']
    ),
    new ServerItem(
      'Celestial Sparkle',
      350,
      '/assets/uploads/rings/ring 1 main.png',
      3,
      1,
      '0',
      ['/assets/uploads/all/rings/ring 1.jpg']
    ),
    new ServerItem(
      'Serenity Solitaire',
      450,
      '/assets/uploads/rings/ring 2 main.png',
      3,
      0,
      '1',
      ['/assets/uploads/all/rings/ring 2.jpg']
    ),
    new ServerItem(
      'Midnight Moonstone',
      280,
      '/assets/uploads/rings/ring 3 main.png',
      3,
      0,
      '2',
      ['/assets/uploads/all/rings/ring 3.jpg']
    ),
    new ServerItem(
      'Enchanted Forest Band',
      600,
      '/assets/uploads/rings/ring 4 main.png',
      3,
      2,
      '3',
      ['/assets/uploads/all/rings/ring 4.jpg']
    ),
    new ServerItem(
      'Oceanic Elegance',
      380,
      '/assets/uploads/rings/ring 5 main.png',
      3,
      2,
      '',
      ['/assets/uploads/all/rings/ring 5.jpg']
    ),
    new ServerItem(
      'Whispers of Romance',
      320,
      '/assets/uploads/rings/ring 6 main.png',
      3,
      0,
      '0',
      ['/assets/uploads/all/rings/ring 6.jpg']
    ),
    new ServerItem(
      'Golden Sunburst',
      550,
      '/assets/uploads/rings/ring 7 main.png',
      3,
      2,
      '1',
      ['/assets/uploads/all/rings/ring 7.jpg']
    ),
    new ServerItem(
      'Ethereal Halo',
      420,
      '/assets/uploads/rings/ring 8 main.png',
      3,
      1,
      '2',
      ['/assets/uploads/all/rings/ring 8.jpg']
    ),
    new ServerItem(
      'Vintage Blossom',
      370,
      '/assets/uploads/rings/ring 9 main.png',
      3,
      1,
      '3',
      ['/assets/uploads/all/rings/ring 9.jpg']
    ),
  ];

  static BestsellersIds: number[] = [0, 1, 11, 5, 8, 23, 13, 9, 20, 16];

  static getCollections() {
    return this.collections;
  }

  static getMetal() {
    return this.metals;
  }
  static getCategories() {
    return this.catergories;
  }

  static getItems(id?: string) {
    if (id) {
      return this.items.filter((a) => a.id.toString() == id);
    }
    return this.items;
  }

  static getBestsellers() {
    return this.BestsellersIds;
  }
}
