import client from "../../client";

export default {
  Query: {
    seeHashtag: (_: null, { hashtag }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
