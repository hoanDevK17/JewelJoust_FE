import "./index.scss";
import { Form, Input } from "antd";
import React from 'react';
import { Button, Divider, Flex, Radio, Space, Tooltip } from 'antd';
import { SearchOutlined, LogoutOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { APIgetlistacount } from "../../api/api";


export default function ManageAcount() {
    const [listAcount, setListAcount] = useState();

    useEffect( () => {
        APIgetlistacount().then((rs) => {
            console.log(rs.data.data);
            setListAcount((listAcount) => rs.data.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .finally(function() {
        });
    },
    []
    )

  return (
    <div className="manageAcount">
        <div className="header">
            <p>mời bạn nhập từ khoá muốn tìm kiếm</p>
        </div>
        <div className="searchCreatLogout">         
            <Form className="searchInput" labelCol={{
                span: 24
            }}>
                <Form.Item className="input" name="Username">
                    <Input className="search-mess"
                        type="text"
                        placeholder="Search" />              
                    <Tooltip title="search">
                        <Button shape="circle" icon={<SearchOutlined />} />
                    </Tooltip>
                </Form.Item>
                <Form.Item className="create" name="logout">
                    <Button className="create-button" type="primary" icon={<PlusSquareOutlined />}>                 
                        Create
                    </Button>
                </Form.Item>
                <Form.Item className="logout" name="logout">
                    <Tooltip title="logout">
                        <Button shape="circle" icon={<LogoutOutlined />} />
                    </Tooltip>
                </Form.Item>
            </Form>
        </div>
        <div className="title">
            <div className="title-">
                <p>Username</p>
            </div>
            <div className="title-">
                <p>Role</p>
            </div>
            <div className="title-">
                <p>Full Name</p>
            </div>
            <div className="title-">
                <p>State</p>
            </div>
            <div className="title-">
                <p>Email</p>
            </div>
            <div className="title-">
                <p>Edit</p>
            </div>
            <div className="title-">
                <p>Delete</p>
            </div>   
        </div>
        <div className="data">
            <div className="data-conten">
            {listAcount &&
        listAcount.map((user) => {
          return (
            <>
              <p>{user.email}</p>
              <p>{user.phone} </p>
            </>
          );
        })}
            </div>
        </div>
    </div>
  );
}