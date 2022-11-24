const BlogPost = require('../models')
const db = require('./db')

async function seed() {
  await db.sync({force:true})

  await BlogPost.bulkCreate([
    {
      author:'LysI',
      title: '4 exercises you shoud add to your  leg routine',
      content: 'Strong legs do more than look good. Even the simplest daily movements like walking require leg strength. This means that incorporating leg workouts into your routine is integral to your health.But you may wonder where to begin.',
      category: 'Fitness'
    },
    {
      author:'TeddyP',
      title: '10 Proven tips to mastering guitar',
      content: 'Learning guitar can be tough. It takes years to master and plenty of time to get good',
      category: 'Music'
    }
  ])
}

module.exports = seed