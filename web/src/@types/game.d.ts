export interface Game {
  id: number;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  };
}

export interface SelectGame {
  id: number;
  title: string;
}
