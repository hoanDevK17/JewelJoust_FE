import { useEffect, useState } from "react";
import {
  LogoutOutlined,
  ArrowUpOutlined,
  ContainerOutlined,
  ContactsOutlined,
  SolutionOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";
import "./dashborad.scss";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (user?.role == "MEMBER") {
    navigate("/");
  }
  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const role = user.role;

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    if (role === "ADMIN") {
      setItems([
        getItem("Acount", "acount", <ContactsOutlined />),
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", <AreaChartOutlined />),
        getItem("Statistical", "statistical", <ContainerOutlined />, [
          getItem("Overview Statistics", "overviewStatistics"),
          getItem("Session Statistics", "sessionStatistics"),
        ]),
      ]);
    }
    if (role === "MANAGER") {
      setItems([
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", <AreaChartOutlined />),
      ]);
    }
    if (role === "STAFF") {
      setItems([
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", <AreaChartOutlined />),
        getItem("Approve Withdrawal", "withdrawal", <ArrowUpOutlined />),
      ]);
    }
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    console.log(currentURI);
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);
  const handleClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ backgroundColor: "#CDC9C9" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // style={{ backgroundColor: "yellow" }}
      >
        <Menu
          style={{ backgroundColor: "#CDC9C9" }}
          defaultSelectedKeys={["profile"]}
          mode="inline"
          selectedKeys={currentURI}
          openKeys={openKeys}
          onOpenChange={handleSubMenuOpen}
        >
          {items.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item
                    key={subItem.key}
                    onClick={(e) => handleSelectKey(e.keyPath[1])}
                  >
                    <Link to={`/dashboard/${subItem.key}`}>
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={`/dashboard/${item.key}`}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <header
            style={{
              textAlign: "center",
              fontSize: "32px",
              position: "relative",
            }}
          >
            {" "}
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "20px",
                  textAlign:"left",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 12px",
                  fontSize: "15px",
                  lineHeight: "23px",
              
                }}
              >
                <span> Hi👋:{"  "} {user?.fullname}</span>
                <p>Role: {user?.role}</p>
              </div>
              <img
                src="/Logo.svg"
                alt=""
                style={{ maxHeight: "45px", maxWidth: "200px" }}
                onClick={handleClick}
              />
            </div>
            <div>
              <LogoutOutlined
                type="primary"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "15px",
                  backgroundColor: "#1677ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  height: "35px",
                  lineHeight: "23px",
                }}
              />
            </div>
          </header>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          <Breadcrumb>
            {location.pathname.split("/").map((path, index, paths) => {
              const url = paths.slice(0, index + 1).join("/");
              console.log(url);
              return (
                <Breadcrumb.Item key={path}>
                  <span to={`/${url}`}>{path}</span>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet style={{ flexGrow: 1 }} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
