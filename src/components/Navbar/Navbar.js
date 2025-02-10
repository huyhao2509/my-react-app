import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (_jsx("div", { className: "pt-4", children: _jsxs("div", { className: "container p-4 flex items-center justify-between", children: [_jsx("div", { className: "text-white text-2xl font-bold", children: _jsxs(Link, { to: "/", children: [_jsx("span", { children: "MOVIE" }), _jsx("span", { className: "text-orange-500", children: "VENNIE" })] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center px-[10px] py-[8px] rounded-full", children: _jsx(Input, { placeholder: "Search Movie", className: "w-full h-8 bg-gray-600 text-gray-50 rounded-lg border-none", suffix: _jsx(SearchOutlined, { className: "text-gray-400" }) }) }), _jsx("div", { className: "w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center", children: _jsx(UserOutlined, { className: "text-gray-900" }) })] })] }) }));
};
export default Navbar;
