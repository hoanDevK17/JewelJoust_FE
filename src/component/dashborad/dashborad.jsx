import { useEffect, useState } from "react";
import {

  LogoutOutlined,
  ArrowUpOutlined,
  ContainerOutlined,
  ContactsOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";

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
    // if (role === "Manage") {
    //   setItems([
    //     getItem("Category", "category", <ProductOutlined />),
    //     getItem("Quản lý Clubs", "club", <HeartOutlined />, [
    //       getItem("Club 1", "club1"),
    //       getItem("Club 2", "club2"),
    //       getItem("Club 3", "club3"),
    //       getItem("All Promotion", "all-promotion"),
    //     ]),
    //     getItem("Quản lý Staffs", "staffs", <UserOutlined />, [
    //       getItem("Club 1", "staff-club-1"),
    //       getItem("Club 2", "staff-club-2"),
    //       getItem("Club 3", "staff-club-3"),
    //       getItem("All Staffs", "all-staffs"),
    //     ]),
    //     getItem("Thống kê", "statistics", <BarChartOutlined />, [
    //       getItem("Club 1", "stats-club-1"),
    //       getItem("Club 2", "stats-club-2"),
    //       getItem("Club 3", "stats-club-3"),
    //       getItem("All Clubs", "all-clubs"),
    //     ]),
    //   ]);
    // }
    // if (role === "Staff") {
    //   setItems([
    //     getItem("Category", "category"),
    //     getItem("Hồ sơ", "profile", <ProfileOutlined />),
        // getItem("Club", "clubs", <HeartOutlined />, [
        //   getItem("Time Slot", "time-slot"),
        //   getItem("Promotion", "promotion"),
        // ]),
    //     getItem("Booking", "booking", <CheckCircleOutlined />, [
    //       getItem("Court ID 1", "court-1"),
    //       getItem("Court ID 2", "court-2"),
    //     ]),
    //   ]);
    // }

    if (role === "ADMIN") {
      setItems([
        getItem("Acount", "acount", <ContactsOutlined />),
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", "🔨"),
        getItem("Statistical", "statistical", <ContainerOutlined />, [
          getItem("Revenue", "revenue"),
          getItem("Session Statistics", "sessionstatistics"),
          getItem("Request Statistics", "requeststatistics"),
          getItem("Acount Statistics", "acountstatistics"),       
        ]),
      ]);
    }
    if (role === "MANAGER") {
      setItems([
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", "🔨"),
      ]);
    }
    if (role === "STAFF") {
      setItems([
        getItem("Request", "request", <SolutionOutlined />),
        getItem("Session", "session", "🔨"),
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
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
              fontWeight: "bold",
            }}
          >
            System of Auction Jewelry
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
                lineHeight: "23px", // Adjusted to fit the new height
              }}
            />
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
