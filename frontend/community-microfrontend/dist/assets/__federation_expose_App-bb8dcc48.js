import { importShared } from './__federation_fn_import-31769cd6.js';
import { b as useEventCallback, u as useBootstrapPrefix, j as jsx, c as classNames, e as useUncontrolled, f as useBootstrapBreakpoints, g as useBootstrapMinBreakpoint, P as PropTypes, a as jsxs } from './Button-c58886f3.js';
import CommunityPosts from './__federation_expose_CommunityPosts-17bbce30.js';
import CreatePost from './__federation_expose_CreatePost-565b3141.js';
import HelpRequests from './__federation_expose_HelpRequests-bf74a9a0.js';
import CreatePost$1 from './__federation_expose_CreateHelpRequest-00dba3f2.js';
import AIChatbot from './__federation_expose_AIChatbot-d420a8d0.js';
import { u as useMergedRefs, a as useNavItem, m as makeEventKey, B as BaseNav, T as TabContext, S as SelectableContext, C as Container } from './ListGroup-4b0377db.js';
import { m as map, f as forEach, C as Col } from './Form-aa05c965.js';
import { a as CardHeaderContext, C as Card } from './Card-0e59e74f.js';
import { g as getChildRef, a as Anchor, F as Fade } from './Alert-f80b0b60.js';

const {useCallback,useRef: useRef$1,useState: useState$1} = await importShared('react');
function useUncontrolledProp(propValue, defaultValue, handler) {
  const wasPropRef = useRef$1(propValue !== undefined);
  const [stateValue, setState] = useState$1(defaultValue);
  const isProp = propValue !== undefined;
  const wasProp = wasPropRef.current;
  wasPropRef.current = isProp;

  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */
  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }
  return [isProp ? propValue : stateValue, useCallback((...args) => {
    const [value, ...rest] = args;
    let returnValue = handler == null ? void 0 : handler(value, ...rest);
    setState(value);
    return returnValue;
  }, [handler])];
}

const $670gB$react = await importShared('react');
const {useContext:$670gB$useContext,useState:$670gB$useState,useMemo:$670gB$useMemo,useLayoutEffect:$670gB$useLayoutEffect,useRef:$670gB$useRef} = $670gB$react;


/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $b5e257d569688ac6$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 10000000000)),
    current: 0
};
const $b5e257d569688ac6$var$SSRContext = /*#__PURE__*/ ($670gB$react).createContext($b5e257d569688ac6$var$defaultContext);
const $b5e257d569688ac6$var$IsSSRContext = /*#__PURE__*/ ($670gB$react).createContext(false);
let $b5e257d569688ac6$var$canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
let $b5e257d569688ac6$var$componentIds = new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
    let ctx = ($670gB$useContext)($b5e257d569688ac6$var$SSRContext);
    let ref = ($670gB$useRef)(null);
    // eslint-disable-next-line rulesdir/pure-render
    if (ref.current === null && !isDisabled) {
        var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner, _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        // In strict mode, React renders components twice, and the ref will be reset to null on the second render.
        // This means our id counter will be incremented twice instead of once. This is a problem because on the
        // server, components are only rendered once and so ids generated on the server won't match the client.
        // In React 18, useId was introduced to solve this, but it is not available in older versions. So to solve this
        // we need to use some React internals to access the underlying Fiber instance, which is stable between renders.
        // This is exposed as ReactCurrentOwner in development, which is all we need since StrictMode only runs in development.
        // To ensure that we only increment the global counter once, we store the starting id for this component in
        // a weak map associated with the Fiber. On the second render, we reset the global counter to this value.
        // Since React runs the second render immediately after the first, this is safe.
        // @ts-ignore
        let currentOwner = (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ($670gB$react).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0 ? void 0 : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner = _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null || _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0 ? void 0 : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
        if (currentOwner) {
            let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
            if (prevComponentValue == null) // On the first render, and first call to useId, store the id and state in our weak map.
            $b5e257d569688ac6$var$componentIds.set(currentOwner, {
                id: ctx.current,
                state: currentOwner.memoizedState
            });
            else if (currentOwner.memoizedState !== prevComponentValue.state) {
                // On the second render, the memoizedState gets reset by React.
                // Reset the counter, and remove from the weak map so we don't
                // do this for subsequent useId calls.
                ctx.current = prevComponentValue.id;
                $b5e257d569688ac6$var$componentIds.delete(currentOwner);
            }
        }
        // eslint-disable-next-line rulesdir/pure-render
        ref.current = ++ctx.current;
    }
    // eslint-disable-next-line rulesdir/pure-render
    return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
    let ctx = ($670gB$useContext)($b5e257d569688ac6$var$SSRContext);
    // If we are rendering in a non-DOM environment, and there's no SSRProvider,
    // provide a warning to hint to the developer to add one.
    if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM) console.warn('When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.');
    let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
    let prefix = ctx === $b5e257d569688ac6$var$defaultContext && "production" === 'test' ? 'react-aria' : `react-aria${ctx.prefix}`;
    return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
    let id = ($670gB$react).useId();
    let [didSSR] = ($670gB$useState)($b5e257d569688ac6$export$535bd6ca7f90a273());
    let prefix = didSSR || "production" === 'test' ? 'react-aria' : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
    return defaultId || `${prefix}-${id}`;
}
const $b5e257d569688ac6$export$619500959fc48b26 = typeof ($670gB$react)['useId'] === 'function' ? $b5e257d569688ac6$var$useModernSSRSafeId : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
    return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
    return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
    // noop
    return ()=>{};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
    // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
    if (typeof ($670gB$react)['useSyncExternalStore'] === 'function') return ($670gB$react)['useSyncExternalStore']($b5e257d569688ac6$var$subscribe, $b5e257d569688ac6$var$getSnapshot, $b5e257d569688ac6$var$getServerSnapshot);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return ($670gB$useContext)($b5e257d569688ac6$var$IsSSRContext);
}

const React$8 = await importShared('react');


// TODO: check

const context = /*#__PURE__*/React$8.createContext(null);
context.displayName = 'NavbarContext';
const NavbarContext = context;

const {cloneElement,useEffect,useRef} = await importShared('react');
function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit
}) {
  const ref = useRef(null);
  const hasEnteredRef = useRef(inProp);
  const handleExited = useEventCallback(onExited);
  useEffect(() => {
    if (inProp) hasEnteredRef.current = true;else {
      handleExited(ref.current);
    }
  }, [inProp, handleExited]);
  const combinedRef = useMergedRefs(ref, getChildRef(children));
  const child = /*#__PURE__*/cloneElement(children, {
    ref: combinedRef
  });
  if (inProp) return child;
  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }
  return child;
}

const React$7 = await importShared('react');
const NavItem = /*#__PURE__*/React$7.forwardRef(({
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

const React$6 = await importShared('react');
const NavLink = /*#__PURE__*/React$6.forwardRef(({
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

const React$5 = await importShared('react');

const {useContext: useContext$1} = await importShared('react');
const Nav = /*#__PURE__*/React$5.forwardRef((uncontrolledProps, ref) => {
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
  const navbarContext = useContext$1(NavbarContext);
  const cardHeaderContext = useContext$1(CardHeaderContext);
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

const React$4 = await importShared('react');
const Row = /*#__PURE__*/React$4.forwardRef(({
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

const _excluded = ["active", "eventKey", "mountOnEnter", "transition", "unmountOnExit", "role", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"],
  _excluded2 = ["activeKey", "getControlledId", "getControllerId"],
  _excluded3 = ["as"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
const React$3 = await importShared('react');

const {useContext} = await importShared('react');
function useTabPanel(_ref) {
  let {
      active,
      eventKey,
      mountOnEnter,
      transition,
      unmountOnExit,
      role = 'tabpanel',
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const context = useContext(TabContext);
  if (!context) return [Object.assign({}, props, {
    role
  }), {
    eventKey,
    isActive: active,
    mountOnEnter,
    transition,
    unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
  const {
      activeKey,
      getControlledId,
      getControllerId
    } = context,
    rest = _objectWithoutPropertiesLoose(context, _excluded2);
  const key = makeEventKey(eventKey);
  return [Object.assign({}, props, {
    role,
    id: getControlledId(eventKey),
    'aria-labelledby': getControllerId(eventKey)
  }), {
    eventKey,
    isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
    transition: transition || rest.transition,
    mountOnEnter: mountOnEnter != null ? mountOnEnter : rest.mountOnEnter,
    unmountOnExit: unmountOnExit != null ? unmountOnExit : rest.unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
}
const TabPanel = /*#__PURE__*/React$3.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
(_ref2, ref) => {
  let {
      as: Component = 'div'
    } = _ref2,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded3);
  const [tabPanelProps, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = NoopTransition
  }] = useTabPanel(props);
  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/jsx(TabContext.Provider, {
    value: null,
    children: /*#__PURE__*/jsx(SelectableContext.Provider, {
      value: null,
      children: /*#__PURE__*/jsx(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/jsx(Component, Object.assign({}, tabPanelProps, {
          ref: ref,
          hidden: !isActive,
          "aria-hidden": !isActive
        }))
      })
    })
  });
});
TabPanel.displayName = 'TabPanel';

await importShared('react');

const {useMemo} = await importShared('react');
const Tabs$2 = props => {
  const {
    id: userId,
    generateChildId: generateCustomChildId,
    onSelect: propsOnSelect,
    activeKey: propsActiveKey,
    defaultActiveKey,
    transition,
    mountOnEnter,
    unmountOnExit,
    children
  } = props;
  const [activeKey, onSelect] = useUncontrolledProp(propsActiveKey, defaultActiveKey, propsOnSelect);
  const id = $b5e257d569688ac6$export$619500959fc48b26(userId);
  const generateChildId = useMemo(() => generateCustomChildId || ((key, type) => id ? `${id}-${type}-${key}` : null), [id, generateCustomChildId]);
  const tabContext = useMemo(() => ({
    onSelect,
    activeKey,
    transition,
    mountOnEnter: mountOnEnter || false,
    unmountOnExit: unmountOnExit || false,
    getControlledId: key => generateChildId(key, 'tabpane'),
    getControllerId: key => generateChildId(key, 'tab')
  }), [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return /*#__PURE__*/jsx(TabContext.Provider, {
    value: tabContext,
    children: /*#__PURE__*/jsx(SelectableContext.Provider, {
      value: onSelect || null,
      children: children
    })
  });
};
Tabs$2.Panel = TabPanel;
const BaseTabs = Tabs$2;

function getTabTransitionComponent(transition) {
  if (typeof transition === 'boolean') {
    return transition ? Fade : NoopTransition;
  }
  return transition;
}

await importShared('react');
const TabContainer = ({
  transition,
  ...props
}) => /*#__PURE__*/jsx(BaseTabs, {
  ...props,
  transition: getTabTransitionComponent(transition)
});
TabContainer.displayName = 'TabContainer';
const TabContainer$1 = TabContainer;

const React$2 = await importShared('react');
const TabContent = /*#__PURE__*/React$2.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
TabContent.displayName = 'TabContent';
const TabContent$1 = TabContent;

const React$1 = await importShared('react');
const TabPane = /*#__PURE__*/React$1.forwardRef(({
  bsPrefix,
  transition,
  ...props
}, ref) => {
  const [{
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    ...rest
  }, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = Fade
  }] = useTabPanel({
    ...props,
    transition: getTabTransitionComponent(transition)
  });
  const prefix = useBootstrapPrefix(bsPrefix, 'tab-pane');

  // We provide an empty the TabContext so `<Nav>`s in `<TabPanel>`s don't
  // conflict with the top level one.
  return /*#__PURE__*/jsx(TabContext.Provider, {
    value: null,
    children: /*#__PURE__*/jsx(SelectableContext.Provider, {
      value: null,
      children: /*#__PURE__*/jsx(Transition, {
        in: isActive,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        children: /*#__PURE__*/jsx(Component, {
          ...rest,
          ref: ref,
          className: classNames(className, prefix, isActive && 'active')
        })
      })
    })
  });
});
TabPane.displayName = 'TabPane';
const TabPane$1 = TabPane;

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Content for the tab title.
   */
  title: PropTypes.node.isRequired,
  /**
   * The disabled state of the tab.
   */
  disabled: PropTypes.bool,
  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName: PropTypes.string,
  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs: PropTypes.object
};
const Tab = () => {
  throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
};
Tab.propTypes = propTypes;
const Tab$1 = Object.assign(Tab, {
  Container: TabContainer$1,
  Content: TabContent$1,
  Pane: TabPane$1
});

await importShared('react');
function getDefaultActiveKey(children) {
  let defaultActiveKey;
  forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}
function renderTab(child) {
  const {
    title,
    eventKey,
    disabled,
    tabClassName,
    tabAttrs,
    id
  } = child.props;
  if (title == null) {
    return null;
  }
  return /*#__PURE__*/jsx(NavItem$1, {
    as: "li",
    role: "presentation",
    children: /*#__PURE__*/jsx(NavLink$1, {
      as: "button",
      type: "button",
      eventKey: eventKey,
      disabled: disabled,
      id: id,
      className: tabClassName,
      ...tabAttrs,
      children: title
    })
  });
}
const Tabs = props => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter = false,
    unmountOnExit = false,
    variant = 'tabs',
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect'
  });
  return /*#__PURE__*/jsxs(BaseTabs, {
    id: id,
    activeKey: activeKey,
    onSelect: onSelect,
    transition: getTabTransitionComponent(transition),
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    children: [/*#__PURE__*/jsx(Nav$1, {
      id: id,
      ...controlledProps,
      role: "tablist",
      as: "ul",
      variant: variant,
      children: map(children, renderTab)
    }), /*#__PURE__*/jsx(TabContent$1, {
      children: map(children, child => {
        const childProps = {
          ...child.props
        };
        delete childProps.title;
        delete childProps.disabled;
        delete childProps.tabClassName;
        delete childProps.tabAttrs;
        return /*#__PURE__*/jsx(TabPane$1, {
          ...childProps
        });
      })
    })]
  });
};
Tabs.displayName = 'Tabs';
const Tabs$1 = Tabs;

const bootstrap_min = '';

const React = await importShared('react');
const {useState} = React;
const App = ({ authClient, communityClient }) => {
  const [key, setKey] = useState("posts");
  return /* @__PURE__ */ jsx(Container, { className: "mt-5", children: /* @__PURE__ */ jsx(Row$1, { className: "justify-content-md-center", children: /* @__PURE__ */ jsx(Col, { md: 8, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(Card.Header, { children: /* @__PURE__ */ jsxs(Tabs$1, { activeKey: key, onSelect: (k) => setKey(k), id: "community-tabs", className: "mb-3", children: [
    /* @__PURE__ */ jsx(Tab$1, { eventKey: "posts", title: "Community Posts", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
      /* @__PURE__ */ jsx(CreatePost, { client: communityClient }),
      /* @__PURE__ */ jsx(CommunityPosts, {})
    ] }) }),
    /* @__PURE__ */ jsx(Tab$1, { eventKey: "help", title: "Help Requests", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
      /* @__PURE__ */ jsx(CreatePost$1, { client: communityClient }),
      /* @__PURE__ */ jsx(HelpRequests, {})
    ] }) }),
    /* @__PURE__ */ jsx(Tab$1, { eventKey: "chat", title: "AI Chatbot 🤖", children: /* @__PURE__ */ jsx(Card.Body, { children: /* @__PURE__ */ jsx(AIChatbot, {}) }) })
  ] }) }) }) }) }) });
};

export { App as default };
