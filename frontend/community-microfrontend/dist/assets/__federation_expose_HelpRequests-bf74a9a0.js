import { importShared } from './__federation_fn_import-31769cd6.js';
import { j as jsx, a as jsxs } from './Button-c58886f3.js';
import { A as Alert } from './Alert-f80b0b60.js';
import { C as Container, L as ListGroup } from './ListGroup-4b0377db.js';
import { C as Card } from './Card-0e59e74f.js';

await importShared('react');

const {gql,useQuery} = await importShared('@apollo/client');
const GET_HELP_REQUESTS = gql`
  query HelpRequests {
    helpRequests {
      id
      description
      location
      isResolved
      author {
        username
      }
      volunteers {
        username
      }
      createdAt
    }
  }
`;
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
};
const HelpRequests = ({ client }) => {
  const { loading, error, data } = useQuery(GET_HELP_REQUESTS, { client });
  if (loading)
    return /* @__PURE__ */ jsx(Alert, { variant: "info", children: "Loading help requests..." });
  if (error)
    return /* @__PURE__ */ jsxs(Alert, { variant: "danger", children: [
      "Error: ",
      error.message
    ] });
  return /* @__PURE__ */ jsxs(Container, { className: "mt-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-center mb-4", children: "Help Requests" }),
    data.helpRequests.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "text-center text-muted p-3", children: /* @__PURE__ */ jsx(Card.Body, { children: "No help requests available. Be the first to create one!" }) }) : data.helpRequests.map((request) => /* @__PURE__ */ jsx(Card, { className: "mb-3 shadow-sm", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
      /* @__PURE__ */ jsx(Card.Title, { children: request.description }),
      /* @__PURE__ */ jsxs(ListGroup, { variant: "flush", children: [
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Location:" }),
          " ",
          request.location || "Not specified"
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Status:" }),
          " ",
          request.isResolved ? "Resolved" : "Not Resolved"
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Author:" }),
          " ",
          request.author?.username || "Unknown"
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Volunteers:" }),
          " ",
          request.volunteers.length ? request.volunteers.map((v) => v.username).join(", ") : "No volunteers yet"
        ] }),
        /* @__PURE__ */ jsxs(ListGroup.Item, { children: [
          /* @__PURE__ */ jsx("strong", { children: "Date:" }),
          " ",
          formatDate(request.createdAt)
        ] })
      ] })
    ] }) }, request.id))
  ] });
};

export { HelpRequests as default };
