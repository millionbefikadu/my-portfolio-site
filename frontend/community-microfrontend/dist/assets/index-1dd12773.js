import { importShared } from './__federation_fn_import-31769cd6.js';
import { j as jsx } from './Button-c58886f3.js';
import { r as reactDomExports } from './index-ebe3b9e0.js';
import { A as ApolloLink, _ as __rest, O as Observable } from './ApolloLink-a037e20f.js';
import App from './__federation_expose_App-bb8dcc48.js';

var client$1 = {};

var m = reactDomExports;
{
  client$1.createRoot = m.createRoot;
  client$1.hydrateRoot = m.hydrateRoot;
}

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

await importShared('react');
const {ApolloClient,InMemoryCache,ApolloProvider,createHttpLink} = await importShared('@apollo/client');
const httpLink = createHttpLink({
  uri: "http://localhost:4001/graphql"
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const root = client$1.createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ jsx(ApolloProvider, { client, children: /* @__PURE__ */ jsx(App, { communityClient: client }) })
);
