import React, { useContext, useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import "./KeyContactsAndMails.css"
import { Form, Input, Popconfirm, Table, Typography, InputNumber } from "antd"
import axios from "axios"
import LoginNavBar from "/src/components/LoginNavBar/LoginNavBar"
import "antd/dist/antd.css"
const { Search } = Input

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  editing,
  title,
  editable,
  children,
  inputType,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />

  // const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  // const form = useContext(EditableContext)




  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}







/*******************************************Component************************************************ */







const KeyContactsAndMails = () => {

  const [dataSource, setDataSource] = useState([])
  const [searchVal, setSearchVal] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm()

  const [editingKey, setEditingKey] = useState("")

  const isEditing = record => record.FlatNo === editingKey

  const edit = record => {
    form.setFieldsValue({ FlatNo: "", OwnerName: "", RegisteredName: "", Email: "", Mobile: "", ParkingSlot: "", Dues: "", ...record })
    setEditingKey(record.FlatNo)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async record => {
    try {
      const row = await form.validateFields()
      setEditingKey("")
      handleSave({...record, ...row})
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }

  const refreshPage = () => {
    window.location.reload();
  }
  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = async () => {
      const users = await fetchUsers();
      setOrigData(users);
      setFilteredData(users);
      const searchInd = users.map(user => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (users) setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((user, index) => {
        if (user.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
          return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter(user => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/users")
    const users = data.users
    return users
  }
  
  const deleteUser = async(key)=> {
    console.log(`${localStorage.getItem("User")}`);
    const {data} = await axios.get("http://localhost:4000/api/v1/userdelete", {params: {FlatNo: key, Admin: JSON.parse(localStorage.getItem("User")).FlatNo }});
    console.log(data.message);
    refreshPage();
  }

  const handleDelete = key => {
    console.log("key", key)
    deleteUser(key);
    const newData = dataSource.filter(item => item.FlatNo !== key)
    setDataSource(newData)
  }

  const defaultColumns = [
    {
      title: "Flat Number",
      dataIndex: "FlatNo",
      key: "FlatNo",
      className: "TableColumns",

      editable: true
    },
    {
      title: "Owner Name",
      dataIndex: "OwnerName",
      key: "OwnerName",
      className: "TableColumns",
      editable: true
    },
    {
      title: "Property Registered Name",
      dataIndex: "RegisteredName",
      key: "RegisteredName",
      className: "TableColumns",
      editable: true
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      className: "TableColumns",
      editable: true
    },
    {
      title: "Mobile Number",
      dataIndex: "Mobile",
      key: "Mobile",
      className: "TableColumns",
      editable: true,
    },
    {
      title: "Block",
      dataIndex: "Block",
      key: "Block",
      className: "TableColumns",
      editable: true
    },
    {
      title: "Parking Slot",
      dataIndex: "ParkingSlot",
      key: "ParkingSlot",
      className: "TableColumns",
      editable: true
    },
    {
      title: "Society Dues",
      dataIndex: "Dues",
      key: "Dues",
      className: "TableColumns",
      editable: false
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="click ok to save your changes" onConfirm={() => save(record)}>
            <Typography.Link
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            </Popconfirm>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <Typography.Link>
              Cancel
            </Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },

    },
    {
      title: "Delete",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 0 ? (
          <Popconfirm
            title="Click 'ok' button to confirm delete operation"
            onConfirm={() => handleDelete(record.FlatNo)}
          >
            <button className="btn btn-danger">Delete</button>
          </Popconfirm>
        ) : null
    }
  ]

  const updateUser = async(row)=> {
    const {data} = await axios.get("http://localhost:4000/api/v1/userupdate", {params: {user: row, Admin: JSON.parse(localStorage.getItem("User")).FlatNo}});
    console.log(data.user);
    refreshPage();
  }

  const handleSave = row => {
    console.log("row", JSON.stringify(row));
    updateUser(row);
  }

  const components = {
    body: {
      // row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === "Dues" ? "number" : "text",

        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  return (
    // <div>
    //   <Table
    //     components={components}
    //     rowClassName={() => 'editable-row'}
    //     bordered
    //     dataSource={dataSource}
    //     columns={columns as ColumnTypes}
    //   />
    // </div>
    <>
      <LoginNavBar />
      <div className="KeyContactDiv">
        <div style={{ display: "flex", justifyContent: "center", }}>
          <img src="/src/assests/contact.png" style={{ height: "50px", width: "50px", marginTop: "20px", marginBottom: "30px", marginRight: "-10px" }}></img>
          <p id="title">KEY CONTACTS AND MAILS</p>
        </div>

        <div className="Note">
          <p className="NoteTitle">NOTE</p>
          <ul>
            <li className="NoteList">
              Please Enter the value to be Edited in the Input and press enter button to be edited.
            </li>
            <li className="NoteList">
              Please Press Delete button to delete the user details
            </li>
          </ul>
        </div>

        <Search
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Enter Flat No"
          enterButton
          size="large"
          style={{
            width: "90%",
            marginTop: "20px",
            border: "1px solid black",
            borderRadius: "5px"
          }}
        />
        <Form form={form} component={false}>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            rowKey="name"
            dataSource={filteredData}
            columns={columns}
            loading={loading}
            pagination={{
              onChange: cancel
            }}
            style={{

              marginTop: "20px",
              marginRight: "20px",
              overflowX: "auto",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}

          />
        </Form>
      </div>
      <div style={{ height: "100px", color: "white" }}></div>
    </>
  )
}

export default KeyContactsAndMails;
