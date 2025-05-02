import { importShared } from './__federation_fn_import-2e9eec17.js';
import { a as jsxs, j as jsx, B as Button } from './Button-26d904b4.js';
import { A as ApolloLink, _ as __rest, O as Observable } from './ApolloLink-a037e20f.js';
import { F as Form, A as Alert } from './Form-c754de44.js';

function setContext(setter) {
    return new ApolloLink(function (operation, forward) {
        var request = __rest(operation, []);
        return new Observable(function (observer) {
            var handle;
            var closed = false;
            Promise.resolve(request)
                .then(function (req) { return setter(req, operation.getContext()); })
                .then(operation.setContext)
                .then(function () {
                // if the observer is already closed, no need to subscribe.
                if (closed)
                    return;
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
                .catch(observer.error.bind(observer));
            return function () {
                closed = true;
                if (handle)
                    handle.unsubscribe();
            };
        });
    });
}

const {ApolloClient,InMemoryCache,createHttpLink} = await importShared('@apollo/client');

// Auth client to connect to the auth microservice
const authHttpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Point to the auth microservice
});

// Set up the authorization header for the auth client
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log('Auth token:', token); // Log token for debugging
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Apollo Client for the auth service
const authClient = new ApolloClient({
  link: authLink.concat(authHttpLink),
  cache: new InMemoryCache(),
});

const Login$1 = '';

const React = await importShared('react');
const {useState} = React;

const {gql,useMutation} = await importShared('@apollo/client');
const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
      role
      createdAt
    }
  }
}
`;
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    client: authClient,
    // Use the imported authClient
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      setSuccess(true);
      setLoginError(null);
      if (onLogin)
        onLogin();
    },
    onError: (error) => {
      setLoginError(error.message);
      setSuccess(false);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }
    await login({ variables: { email, password } });
  };
  return /* @__PURE__ */ jsxs(Form, { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Form.Label, { children: "Email address" }),
      /* @__PURE__ */ jsx(
        Form.Control,
        {
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", children: [
      /* @__PURE__ */ jsx(Form.Label, { children: "Password" }),
      /* @__PURE__ */ jsx(
        Form.Control,
        {
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: loading, children: loading ? "Logging in..." : "Login" }),
    loginError && /* @__PURE__ */ jsxs(Alert, { variant: "danger", className: "mt-3", children: [
      "Error: ",
      loginError
    ] }),
    success && /* @__PURE__ */ jsx(Alert, { variant: "success", className: "mt-3", children: "Login successful!" })
  ] });
};

export { Login as default };
