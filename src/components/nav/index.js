import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const { SubMenu } = Menu;

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({ type: "LOG_OUT", payload: null });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!user && (
        <>
          <Menu.Item
            key="login"
            icon={<UserOutlined />}
            className="float-right"
          >
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Menu.Item key="setting:1">
              <Link to="/user/history">Dashboard</Link>
            </Menu.Item>
          )}
          {user && user.role === "admin" && (
            <Menu.Item key="setting:1">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
          )}
          <Menu.Item icon={<LogoutOutlined />} onClick={logout} key="setting:3">
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};
