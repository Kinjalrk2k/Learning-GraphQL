const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the Hackernews API`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = prisma.link.create({
        data: { url: args.url, description: args.description },
      });

      return newLink;
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
  context: { prisma },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
