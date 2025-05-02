import { importShared } from './__federation_fn_import-31769cd6.js';
import { u as useBootstrapPrefix, j as jsx, c as classNames } from './Button-c58886f3.js';
import { d as divWithClassName } from './Alert-f80b0b60.js';

const React$a = await importShared('react');
const CardBody = /*#__PURE__*/React$a.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-body');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = 'CardBody';
const CardBody$1 = CardBody;

const React$9 = await importShared('react');
const CardFooter = /*#__PURE__*/React$9.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-footer');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = 'CardFooter';
const CardFooter$1 = CardFooter;

const React$8 = await importShared('react');

const context = /*#__PURE__*/React$8.createContext(null);
context.displayName = 'CardHeaderContext';
const CardHeaderContext = context;

const React$7 = await importShared('react');

const {useMemo} = await importShared('react');
const CardHeader = /*#__PURE__*/React$7.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card-header');
  const contextValue = useMemo(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return /*#__PURE__*/jsx(CardHeaderContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/jsx(Component, {
      ref: ref,
      ...props,
      className: classNames(className, prefix)
    })
  });
});
CardHeader.displayName = 'CardHeader';
const CardHeader$1 = CardHeader;

const React$6 = await importShared('react');
const CardImg = /*#__PURE__*/React$6.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  bsPrefix,
  className,
  variant,
  as: Component = 'img',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card-img');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(variant ? `${prefix}-${variant}` : prefix, className),
    ...props
  });
});
CardImg.displayName = 'CardImg';
const CardImg$1 = CardImg;

const React$5 = await importShared('react');
const CardImgOverlay = /*#__PURE__*/React$5.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'div',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-img-overlay');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = 'CardImgOverlay';
const CardImgOverlay$1 = CardImgOverlay;

const React$4 = await importShared('react');
const CardLink = /*#__PURE__*/React$4.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'a',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = 'CardLink';
const CardLink$1 = CardLink;

const React$3 = await importShared('react');
const DivStyledAsH6 = divWithClassName('h6');
const CardSubtitle = /*#__PURE__*/React$3.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = 'CardSubtitle';
const CardSubtitle$1 = CardSubtitle;

const React$2 = await importShared('react');
const CardText = /*#__PURE__*/React$2.forwardRef(({
  className,
  bsPrefix,
  as: Component = 'p',
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardText.displayName = 'CardText';
const CardText$1 = CardText;

const React$1 = await importShared('react');
const DivStyledAsH5 = divWithClassName('h5');
const CardTitle = /*#__PURE__*/React$1.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'card-title');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    className: classNames(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = 'CardTitle';
const CardTitle$1 = CardTitle;

const React = await importShared('react');
const Card = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, 'card');
  return /*#__PURE__*/jsx(Component, {
    ref: ref,
    ...props,
    className: classNames(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? /*#__PURE__*/jsx(CardBody$1, {
      children: children
    }) : children
  });
});
Card.displayName = 'Card';
const Card$1 = Object.assign(Card, {
  Img: CardImg$1,
  Title: CardTitle$1,
  Subtitle: CardSubtitle$1,
  Body: CardBody$1,
  Link: CardLink$1,
  Text: CardText$1,
  Header: CardHeader$1,
  Footer: CardFooter$1,
  ImgOverlay: CardImgOverlay$1
});

export { Card$1 as C, CardHeaderContext as a };
