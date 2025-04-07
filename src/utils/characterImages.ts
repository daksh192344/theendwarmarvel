interface CharacterImage {
  name: string;
  imageUrl: string;
  altText: string;
}

export const characterImages: CharacterImage[] = [
  {
    name: "Thor",
    imageUrl: "https://www.picswallpaper.com/wallpaper-cool-thor",
    altText: "Thor wielding Mjolnir"
  },
  {
    name: "Iron Man",
    imageUrl: "https://topzoid.blogspot.com/2021/07/iron-man-wallpaper-for-laptop-iron-man.html",
    altText: "Iron Man in his signature armor"
  },
  {
    name: "Doctor Strange",
    imageUrl: "https://www.goodthingsguy.com/people/benedict-cumberbatch-hero/",
    altText: "Doctor Strange performing mystic arts"
  },
  {
    name: "Captain America",
    imageUrl: "https://hdqwalls.com/avengers-4-captain-america-4k-wallpaper",
    altText: "Captain America with his shield"
  },
  {
    name: "Hulk",
    imageUrl: "https://pngfre.com/hulk-png/",
    altText: "The incredible Hulk"
  },
  {
    name: "Loki",
    imageUrl: "https://marvel-movies.wikia.com/wiki/File%3ALoki_Wallpaper_3.jpg",
    altText: "Loki, God of Mischief"
  },
  {
    name: "Groot",
    imageUrl: "https://www.mordeo.org/wallpapers/groot-in-i-am-groot-movie/",
    altText: "Groot standing tall"
  },
  {
    name: "Rocket Raccoon",
    imageUrl: "https://ghostbusters2k2.github.io/rocketraccoon/",
    altText: "Rocket Raccoon with his weapons"
  },
  {
    name: "Spider-Man",
    imageUrl: "https://www.enjpg.com/spider-man-30/",
    altText: "Spider-Man in action"
  },
  {
    name: "Black Panther",
    imageUrl: "https://www.picsum.photos/200/300?image=1027",
    altText: "Black Panther in Wakandan suit"
  },
  {
    name: "Deadpool",
    imageUrl: "https://wallpapers.com/wallpapers/marvel",
    altText: "Deadpool with his katanas"
  },
  {
    name: "Black Widow",
    imageUrl: "/images/characters/black-widow.jpg",
    altText: "Black Widow ready for combat"
  },
  {
    name: "Hawkeye",
    imageUrl: "/images/characters/hawkeye.jpg",
    altText: "Hawkeye with his bow"
  },
  {
    name: "Winter Soldier",
    imageUrl: "/images/characters/winter-soldier.jpg",
    altText: "Winter Soldier with metal arm"
  },
  {
    name: "Star Lord",
    imageUrl: "/images/characters/star-lord.jpg",
    altText: "Star Lord with his element guns"
  },
  {
    name: "Captain Marvel",
    imageUrl: "/images/characters/captain-marvel.jpg",
    altText: "Captain Marvel in binary form"
  },
  {
    name: "Supreme Strange",
    imageUrl: "/images/characters/supreme-strange.jpg",
    altText: "Supreme Strange casting spells"
  },
  {
    name: "Wong",
    imageUrl: "/images/characters/wong.jpg",
    altText: "Wong performing mystic arts"
  },
  {
    name: "Makari",
    imageUrl: "/images/characters/makari.jpg",
    altText: "Makari using super speed"
  },
  {
    name: "Odin",
    imageUrl: "/images/characters/odin.jpg",
    altText: "Odin wielding Gungnir"
  },
  {
    name: "Mysterio",
    imageUrl: "/images/characters/mysterio.jpg",
    altText: "Mysterio creating illusions"
  },
  {
    name: "Asimx",
    imageUrl: "/images/characters/asimx.jpg",
    altText: "Asimx with power stealing ability"
  }
];

export const getCharacterImage = (characterName: string): CharacterImage | undefined => {
  return characterImages.find(char => char.name.toLowerCase() === characterName.toLowerCase());
}; 