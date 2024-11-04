export const data = [
  {
    id: 1,
    author: "Kevin",
    date: new Date("5.09.2024").toLocaleDateString(),
    text: "With Election Day rapidly approaching, anything that can stop you from staring at the latest polls and crying out from dread is a good thing—and for some residents of Hatboro, Pennsylvania (not to mention thousands of out-of-town visitors), the pleasant diversion du jour is following the viral “cookie election” that Lochel’s Bakery has been holding since 2008. As in prior years, Lochel’s frosted, sprinkle-covered cookies have been iced with the names of this year’s candidates—and while the “Trump 2024” cookies are outselling the “Harris 2024” ones so far, owner Kathleen Romano Lochel urges one and all to remember that her cookie election is hardly The New York Times needle.</br></br> “I always like to remind people that this is not scientific and it’s just a cookie,” she tells Vogue. (Nevertheless, it’s worth noting that Lochel’s cookie election reflected the real-life results in 2008, 2012, and 2016. Plus, the bakery’s location, in one of the United States’ most politically significant swing states, adds a little extra heft to the count’s import.)",
    comments: [
      {
        id: 2,
        author: "Michael",
        date: new Date("5.12.2024").toLocaleDateString(),
        text: "Nice, I like it",
        replies: [],
      },
      {
        id: 3,
        author: "Chao",
        date: new Date("5.13.2024").toLocaleDateString(),
        text: "I love cookies",
        replies: [
          {
            id: 4,
            author: "Kevin",
            date: new Date("5.18.2024").toLocaleDateString(),
            text: "I agree",
          },
        ],
      },
    ],
  },
];
