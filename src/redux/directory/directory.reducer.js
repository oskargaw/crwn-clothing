const INITIAL_STATE = {
  sections: [
    {
      title: "fantastyka",
      imageUrl: "https://ecsmedia.pl/c/rytmatysta-w-iext54304271.jpg",
      id: 1,
      linkUrl: "shop/fantastyka"
    },
    {
      title: "biografie",
      imageUrl:
        "https://ecsmedia.pl/c/becoming-moja-historia-w-iext54006035.jpg",
      id: 2,
      linkUrl: "shop/biografie"
    },
    {
      title: "kryminały",
      imageUrl:
        "https://ecsmedia.pl/c/15446880561130188-jpg-gallery.big-iext53765994.jpg",
      id: 3,
      linkUrl: "shop/kryminały"
    },
    {
      title: "komiksy",
      imageUrl:
        "https://ecsmedia.pl/c/kajko-i-kokosz-szkola-latania-p-iext35256612.jpg",
      size: "large",
      id: 4,
      linkUrl: "shop/komiksy"
    },
    {
      title: "sport",
      imageUrl: "https://ecsmedia.pl/c/ronaldo-p-iext53911037.jpg",
      size: "large",
      id: 5,
      linkUrl: "shop/sport"
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
