import { importShared } from './__federation_fn_import-2e9eec17.js';
import { j as jsx, b as Button, u as useBootstrapPrefix, c as classNames, d as useBootstrapBreakpoints, e as useBootstrapMinBreakpoint, a as jsxs, F as Fragment } from './Button-26d904b4.js';
import Login from './__federation_expose_Login-4e316fdf.js';
import Signup, { C as CardHeaderContext, a as Container, b as Card, c as authClient } from './__federation_expose_Signup-d4c711a8.js';
import Logout from './__federation_expose_Logout-8fa42c03.js';
import { u as useEventCallback, a as Anchor, b as useUncontrolled, C as Col } from './Form-c754de44.js';

var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
/**
 * Runs `querySelectorAll` on a given element.
 * 
 * @param element the element
 * @param selector the selector
 */

function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

const {useReducer} = await importShared('react');


/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */
function useForceUpdate() {
  // The toggling state value is designed to defeat React optimizations for skipping
  // updates when they are strictly equal to the last state value
  const [, dispatch] = useReducer(revision => revision + 1, 0);
  return dispatch;
}

const React$a = await importShared('react');

const SelectableContext = /*#__PURE__*/React$a.createContext(null);
const makeEventKey = (eventKey, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

const React$9 = await importShared('react');

const NavContext = /*#__PURE__*/React$9.createContext(null);
NavContext.displayName = 'NavContext';
const NavContext$1 = NavContext;

const ATTRIBUTE_PREFIX = `data-rr-ui-`;
const PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}

const React$8 = await importShared('react');


// TODO: check

const context = /*#__PURE__*/React$8.createContext(null);
context.displayName = 'NavbarContext';
const NavbarContext = context;

const {useMemo} = await importShared('react');

const toFnRef = ref => !ref || typeof ref === 'function' ? ref : value => {
  ref.current = value;
};
function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return value => {
    if (a) a(value);
    if (b) b(value);
  };
}

/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */
function useMergedRefs(refA, refB) {
  return useMemo(() => mergeRefs(refA, refB), [refA, refB]);
}

const React$7 = await importShared('react');

const TabContext = /*#__PURE__*/React$7.createContext(null);
const TabContext$1 = TabContext;

const _excluded$1 = ["as", "active", "eventKey"];
function _objectWithoutPropertiesLoose$1(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
const React$6 = await importShared('react');

const {useContext: useContext$2} = await importShared('react');
function useNavItem({
  key,
  onClick,
  active,
  id,
  role,
  disabled
}) {
  const parentOnSelect = useContext$2(SelectableContext);
  const navContext = useContext$2(NavContext$1);
  const tabContext = useContext$2(TabContext$1);
  let isActive = active;
  const props = {
    role
  };
  if (navContext) {
    if (!role && navContext.role === 'tablist') props.role = 'tab';
    const contextControllerId = navContext.getControllerId(key != null ? key : null);
    const contextControlledId = navContext.getControlledId(key != null ? key : null);

    // @ts-ignore
    props[dataAttr('event-key')] = key;
    props.id = contextControllerId || id;
    isActive = active == null && key != null ? navContext.activeKey === key : active;

    /**
     * Simplified scenario for `mountOnEnter`.
     *
     * While it would make sense to keep 'aria-controls' for tabs that have been mounted at least
     * once, it would also complicate the code quite a bit, for very little gain.
     * The following implementation is probably good enough.
     *
     * @see https://github.com/react-restart/ui/pull/40#issuecomment-1009971561
     */
    if (isActive || !(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter)) props['aria-controls'] = contextControlledId;
  }
  if (props.role === 'tab') {
    props['aria-selected'] = isActive;
    if (!isActive) {
      props.tabIndex = -1;
    }
    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
  }
  props.onClick = useEventCallback(e => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
    if (key == null) {
      return;
    }
    if (parentOnSelect && !e.isPropagationStopped()) {
      parentOnSelect(key, e);
    }
  });
  return [props, {
    isActive
  }];
}
const NavItem$2 = /*#__PURE__*/React$6.forwardRef((_ref, ref) => {
  let {
      as: Component = Button,
      active,
      eventKey
    } = _ref,
    options = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
  const [props, meta] = useNavItem(Object.assign({
    key: makeEventKey(eventKey, options.href),
    active
  }, options));

  // @ts-ignore
  props[dataAttr('active')] = meta.isActive;
  return /*#__PURE__*/jsx(Component, Object.assign({}, options, props, {
    ref: ref
  }));
});
NavItem$2.displayName = 'NavItem';
const NavItem$3 = NavItem$2;

const _excluded = ["as", "onSelect", "activeKey", "role", "onKeyDown"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
const React$5 = await importShared('react');

const {useContext: useContext$1,useEffect,useRef} = await importShared('react');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const EVENT_KEY_ATTR = dataAttr('event-key');
const Nav$2 = /*#__PURE__*/React$5.forwardRef((_ref, ref) => {
  let {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      onSelect,
      activeKey,
      role,
      onKeyDown
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  const forceUpdate = useForceUpdate();
  const needsRefocusRef = useRef(false);
  const parentOnSelect = useContext$1(SelectableContext);
  const tabContext = useContext$1(TabContext$1);
  let getControlledId, getControllerId;
  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    // TODO: do we need to duplicate these?
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }
  const listNode = useRef(null);
  const getNextActiveTab = offset => {
    const currentListNode = listNode.current;
    if (!currentListNode) return null;
    const items = qsa(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
    const activeChild = currentListNode.querySelector('[aria-selected=true]');
    if (!activeChild || activeChild !== document.activeElement) return null;
    const index = items.indexOf(activeChild);
    if (index === -1) return null;
    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };
  const handleSelect = (key, event) => {
    if (key == null) return;
    onSelect == null ? void 0 : onSelect(key, event);
    parentOnSelect == null ? void 0 : parentOnSelect(key, event);
  };
  const handleKeyDown = event => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (!tabContext) {
      return;
    }
    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveTab(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset[dataProp('EventKey')] || null, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };
  useEffect(() => {
    if (listNode.current && needsRefocusRef.current) {
      const activeChild = listNode.current.querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
      activeChild == null ? void 0 : activeChild.focus();
    }
    needsRefocusRef.current = false;
  });
  const mergedRef = useMergedRefs(ref, listNode);
  return /*#__PURE__*/jsx(SelectableContext.Provider, {
    value: handleSelect,
    children: /*#__PURE__*/jsx(NavContext$1.Provider, {
      value: {
        role,
        // used by NavLink to determine it's role
        activeKey: makeEventKey(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      },
      children: /*#__PURE__*/jsx(Component, Object.assign({}, props, {
        onKeyDown: handleKeyDown,
        ref: mergedRef,
        role: role
      }))
    })
  });
});
Nav$2.displayName = 'Nav';
const BaseNav = Object.assign(Nav$2, {
  Item: NavItem$3
});

const React$4 = await importShared('react');
const NavItem = /*#__PURE__*/React$4.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-item');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
NavItem.displayName = 'NavItem';
const NavItem$1 = NavItem;

const React$3 = await importShared('react');
const NavLink = /*#__PURE__*/React$3.forwardRef(({
  bsPrefix,
  className,
  as: Component = Anchor,
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'nav-link');
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return /*#__PURE__*/jsx(Component, {
    ...props,
    ...navItemProps,
    ref: ref,
    disabled: disabled,
    className: classNames(className, bsPrefix, disabled && 'disabled', meta.isActive && 'active')
  });
});
NavLink.displayName = 'NavLink';
const NavLink$1 = NavLink;

const React$2 = await importShared('react');

const {useContext} = await importShared('react');
const Nav = /*#__PURE__*/React$2.forwardRef((uncontrolledProps, ref) => {
  const {
    as = 'div',
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    activeKey: 'onSelect'
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = useContext(NavbarContext);
  const cardHeaderContext = useContext(CardHeaderContext);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return /*#__PURE__*/jsx(BaseNav, {
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classNames(className, {
      [bsPrefix]: !isNavbar,
      [`${navbarBsPrefix}-nav`]: isNavbar,
      [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
      [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justify
    }),
    ...props
  });
});
Nav.displayName = 'Nav';
const Nav$1 = Object.assign(Nav, {
  Item: NavItem$1,
  Link: NavLink$1
});

const React$1 = await importShared('react');
const Row = /*#__PURE__*/React$1.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach(brkPoint => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === 'object') {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : '';
    if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    ...props,
    className: classNames(className, decoratedBsPrefix, ...classes)
  });
});
Row.displayName = 'Row';
const Row$1 = Row;

const bootstrap_min = '';

const React = await importShared('react');
const {useState} = React;
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  return /* @__PURE__ */ jsx(Container, { className: "mt-5", children: /* @__PURE__ */ jsx(Row$1, { className: "justify-content-md-center", children: /* @__PURE__ */ jsx(Col, { md: 6, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(Card.Header, { children: /* @__PURE__ */ jsxs(Nav$1, { variant: "tabs", defaultActiveKey: "login", children: [
      !isLoggedIn && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Nav$1.Item, { children: /* @__PURE__ */ jsx(
          Nav$1.Link,
          {
            eventKey: "login",
            onClick: () => setActiveTab("login"),
            children: "Login"
          }
        ) }),
        /* @__PURE__ */ jsx(Nav$1.Item, { children: /* @__PURE__ */ jsx(
          Nav$1.Link,
          {
            eventKey: "signup",
            onClick: () => setActiveTab("signup"),
            children: "Signup"
          }
        ) })
      ] }),
      isLoggedIn && /* @__PURE__ */ jsx(Nav$1.Item, { children: /* @__PURE__ */ jsx(Nav$1.Link, { eventKey: "logout", children: "Logout" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Card.Body, { children: !isLoggedIn ? /* @__PURE__ */ jsxs(Fragment, { children: [
      activeTab === "login" && /* @__PURE__ */ jsx(Login, { onLogin: handleLogin }),
      activeTab === "signup" && /* @__PURE__ */ jsx(Signup, { onSignup: handleLogin })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("p", { className: "text-center", children: "Welcome! You are logged in." }),
      /* @__PURE__ */ jsx(Logout, { onLogout: handleLogout })
    ] }) })
  ] }) }) }) });
};

await importShared('react');

const ReactDOM = await importShared('react-dom');

const {ApolloClient,InMemoryCache,ApolloProvider} = await importShared('@apollo/client');
ReactDOM.render(
  /* @__PURE__ */ jsxs(ApolloProvider, { client: authClient, children: [
    " ",
    /* @__PURE__ */ jsx(App, {})
  ] }),
  document.getElementById("root")
);
