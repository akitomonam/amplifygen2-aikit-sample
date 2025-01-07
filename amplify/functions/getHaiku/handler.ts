import { Schema } from '../../data/resource';

export const handler: Schema['getHaiku']['functionHandler'] =
  async () => {
    const haikuList = [
      '能面にあるかなき笑み暮の秋',
      '玄関へ歪まぬやうに雪を掻く',
      'たはぶれて抱きあげられてひよいと春',
    ];

    const randomIndex = Math.floor(
      Math.random() * haikuList.length
    );
    const haiku = haikuList[randomIndex];

    return haiku;
  };
