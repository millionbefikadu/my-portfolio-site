import { importShared } from './__federation_fn_import-31769cd6.js';
import { j as jsx, a as jsxs } from './Button-c58886f3.js';
import { A as Alert } from './Alert-f80b0b60.js';
import { C as Container, L as ListGroup } from './ListGroup-4b0377db.js';
import { C as Card } from './Card-0e59e74f.js';

await importShared('react');

const {gql,useQuery} = await importShared('@apollo/client');
const GET_COMMUNITY_POSTS = gql`
  query CommunityPosts {
    communityPosts {
      id
      title
      content
      category
      author {
        username
      }
      createdAt
    }
  }
`;
const formatDate = (timestamp) => {
  if (!timestamp)
    return "No date provided";
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
};
const CommunityPosts = () => {
  const { loading, error, data } = useQuery(GET_COMMUNITY_POSTS);
  if (loading)
    return /* @__PURE__ */ jsx(Alert, { variant: "info", children: "Loading community posts..." });
  if (error)
    return /* @__PURE__ */ jsxs(Alert, { variant: "danger", children: [
      "Error: ",
      error.message
    ] });
  return /* @__PURE__ */ jsxs(Container, { className: "mt-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-center mb-4", children: "Community Posts" }),
    data.communityPosts.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "text-center text-muted p-3", children: /* @__PURE__ */ jsx(Card.Body, { children: "No posts available. Be the first to create one!" }) }) : data.communityPosts.map((post) => /* @__PURE__ */ jsx(Card, { className: "mb-3 shadow-sm", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
      /* @__PURE__ */ jsx(Card.Title, { children: post.title }),
      /* @__PURE__ */ jsx(Card.Text, { children: post.content }),
      /* @__PURE__ */ jsxs(ListGroup, { variant: "flush", children: [
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Category:" }),
          " ",
          post.category
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Author:" }),
          " ",
          post.author.username
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Date:" }),
          " ",
          formatDate(post.createdAt)
        ] })
      ] })
    ] }) }, post.id))
  ] });
};

export { CommunityPosts as default };
