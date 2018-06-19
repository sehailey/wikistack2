// const Sequelize = require("sequelize");
// const db = new Sequelize("postgres://localhost:5432/wikistack", {
//   logging: false
// });

const config = require('./config');
const Sequelize = require('sequelize');
const db = new Sequelize(config.database, config.username, config.password, config.options);


const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    //since we are searching, editing, deleting by slug, these need to be unique
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
});

Page.beforeCreate(page => {
    let str = page.tags;
    page.tags = str.split(", ");
    console.log("\n\n", "index.js typeof str.split: ", typeof str.split(", "), "\n\n");
    console.log("\n\n", "index.js typeof str.split: ", typeof page.tags, "\n\n");
    console.log("\n\nIt should work beforeCreate? but if beforeValidate, it should be if/else.\n\n");

    //console.log("index.js page.tags: ", page.tags, " ", typeof page.tags);
})
//

Page.beforeValidate(page => {
  /*
   * Generate slug
   */
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
  }

});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  }
});

//This adds methods to 'Page', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, {as: 'author'});

module.exports = {
  db,
  Page,
  User
};
