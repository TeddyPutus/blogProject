const BlogPost = require("../models");
const db = require("./db");

async function seed() {
  await db.sync({ force: false });

  // await BlogPost.bulkCreate([
  //   {
  //     author: "LysI",
  //     title: "4 exercises you shoud add to your  leg routine",
  //     content:
  //       "Strong legs do more than look good. Even the simplest daily movements like walking require leg strength. This means that incorporating leg workouts into your routine is integral to your health.But you may wonder where to begin.",
  //     category: "Fitness",
  //   },
  //   {
  //     author: "TeddyP",
  //     title: "10 Proven tips to mastering guitar",
  //     content:
  //       "Learning guitar can be tough. It takes years to master and plenty of time to get good",
  //     category: "Music",
  //   },
  //   {
  //     author: "Hannah",
  //     title: "Best restaurants in London!",
  //     content: "Its expensive but fun",
  //     category: "Food",
  //   },
  //   {
  //     author: "Felicity",
  //     title: "Best books of 2022",
  //     content:
  //       "Reading is good for your brain, but people dont read as much as they should!",
  //     category: "Book",
  //   },
  //   {
  //     author: "LysI",
  //     title: "Crypto this season",
  //     content:
  //       "Getting started was hard but as I learnt more, it has become an important hobby!",
  //     category: "Lifestyle",
  //   },
  //   {
  //     author: "TeddyP",
  //     title: "Gym moves you should integrate into your workout!",
  //     content:
  //       "I only recently became a gym lad but im going to tell you all how its possible! These simple moves have become a staple in my workouts. ",
  //     category: "Gym",
  //   },
  //   {
  //     author: "Felicity",
  //     title: "Is Madonna still a star still 35 years later?",
  //     content:
  //       "She definitely is! Why would anyone think othewise #materialgorl",
  //     category: "Music",
  //   },
  //   {
  //     author: "Hannah",
  //     title: "Best yoga moves for a healthy mind",
  //     content:
  //       "Meditation and staying at peace with your mind is tricky, but with these simple starter moves, you can become a yogi too.",
  //     category: "Lifstyle",
  //   },
  // ]);
}

module.exports = seed;
