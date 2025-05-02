import { importShared } from './__federation_fn_import-31769cd6.js';
import { a as jsxs, j as jsx } from './Button-c58886f3.js';
import { F as Form, B as Button } from './Form-aa05c965.js';
import { A as Alert } from './Alert-f80b0b60.js';

const React = await importShared('react');
const {useState} = React;

const {gql,useMutation,useApolloClient} = await importShared('@apollo/client');
const CREATE_POST_MUTATION = gql`
  mutation CreateCommunityPost($title: String!, $content: String!, $category: String!) {
    createCommunityPost(title: $title, content: $content, category: $category) {
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
const CreatePost = ({ client }) => {
  const defaultClient = useApolloClient();
  const clientToUse = client || defaultClient;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("news");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    client: clientToUse,
    onCompleted: () => {
      setSuccess(true);
      setTitle("");
      setContent("");
      setError(null);
    },
    onError: (err) => setError(err.message)
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    createPost({ variables: { title, content, category } });
  };
  return /* @__PURE__ */ jsxs(Form, { onSubmit: handleSubmit, className: "mb-4", children: [
    /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Form.Label, { children: "Title" }),
      /* @__PURE__ */ jsx(Form.Control, { type: "text", value: title, onChange: (e) => setTitle(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Form.Label, { children: "Content" }),
      /* @__PURE__ */ jsx(Form.Control, { as: "textarea", rows: 3, value: content, onChange: (e) => setContent(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Form.Label, { children: "Category" }),
      /* @__PURE__ */ jsxs(Form.Select, { value: category, onChange: (e) => setCategory(e.target.value), children: [
        /* @__PURE__ */ jsx("option", { value: "news", children: "News" }),
        /* @__PURE__ */ jsx("option", { value: "discussion", children: "Discussion" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: loading, children: loading ? "Creating..." : "Create Post" }),
    error && /* @__PURE__ */ jsx(Alert, { variant: "danger", className: "mt-3", children: error }),
    success && /* @__PURE__ */ jsx(Alert, { variant: "success", className: "mt-3", children: "Post created successfully!" })
  ] });
};

export { CreatePost as default };
