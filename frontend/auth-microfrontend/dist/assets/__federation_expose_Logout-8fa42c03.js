import { importShared } from './__federation_fn_import-2e9eec17.js';
import { j as jsx, B as Button } from './Button-26d904b4.js';

await importShared('react');
const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout)
      onLogout();
    window.location.reload();
  };
  return /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Button, { variant: "danger", onClick: handleLogout, children: "Logout" }) });
};

export { Logout as default };
