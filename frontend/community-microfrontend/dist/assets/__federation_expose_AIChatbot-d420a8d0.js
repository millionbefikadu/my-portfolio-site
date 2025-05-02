import { importShared } from './__federation_fn_import-31769cd6.js';
import { a as jsxs, j as jsx, F as Fragment } from './Button-c58886f3.js';
import { C as Container, L as ListGroup } from './ListGroup-4b0377db.js';
import { F as Form, B as Button } from './Form-aa05c965.js';

const React = await importShared('react');
const {useState} = React;

const {gql,useLazyQuery} = await importShared('@apollo/client');
const COMMUNITY_AI_QUERY = gql`
  query CommunityAIQuery($input: String!) {
    communityAIQuery(input: $input) {
      text
      suggestedQuestions
      retrievedPosts {
        id
        content
      }
    }
  }
`;
const AIChatbot = () => {
  const [input, setInput] = useState("");
  const [getResponse, { data, loading, error }] = useLazyQuery(COMMUNITY_AI_QUERY);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      getResponse({ variables: { input } });
    }
  };
  return /* @__PURE__ */ jsxs(Container, { className: "mt-4", children: [
    /* @__PURE__ */ jsx("h3", { children: "Community AI Assistant 🤖" }),
    /* @__PURE__ */ jsxs(Form, { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        Form.Control,
        {
          type: "text",
          placeholder: "Ask the AI about community discussions...",
          value: input,
          onChange: (e) => setInput(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(Button, { variant: "primary", type: "submit", className: "mt-2", children: "Ask" })
    ] }),
    loading && /* @__PURE__ */ jsx("p", { children: "Loading AI response..." }),
    error && /* @__PURE__ */ jsxs("p", { children: [
      "Error: ",
      error.message
    ] }),
    data && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsx("h5", { children: "💬 AI Response:" }),
      /* @__PURE__ */ jsx("p", { children: data.communityAIQuery.text }),
      /* @__PURE__ */ jsx("h6", { children: "🤔 Suggested Questions:" }),
      /* @__PURE__ */ jsx(ListGroup, { className: "mb-3", children: data.communityAIQuery.suggestedQuestions.map((q, i) => /* @__PURE__ */ jsx(ListGroup.Item, { children: q }, i)) }),
      /* @__PURE__ */ jsx("h6", { children: "📚 Related Community Posts:" }),
      /* @__PURE__ */ jsx(ListGroup, { children: data.communityAIQuery.retrievedPosts.map((post) => /* @__PURE__ */ jsx(ListGroup.Item, { children: post.content }, post.id)) })
    ] }) })
  ] });
};

export { AIChatbot as default };
