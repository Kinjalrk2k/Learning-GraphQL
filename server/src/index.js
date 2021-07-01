const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// dummy data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the Hackernews API`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const { id, url, description } = args;
      let updatedLink;

      links = links.map((link) => {
        if (link.id === id) {
          updatedLink = {
            id,
            url: url || link.url,
            description: description || link.description,
          };
          return updatedLink;
        }
        return link;
      });

      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const { id } = args;
      let deletedLink;

      links = links.filter((link) => {
        if (link.id === id) {
          deletedLink = link;
          return false;
        }
        return true;
      });

      return deletedLink;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
