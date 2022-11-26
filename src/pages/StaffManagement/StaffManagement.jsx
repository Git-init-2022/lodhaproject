import React, { useContext, useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import "./StaffManagement.css"
import { Form, Input, Popconfirm, Table } from "antd"
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
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log("Save failed:", errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}







/*******************************************Component************************************************ */







const StaffManagement = () => {

  const [dataSource, setDataSource] = useState([])
  const [searchVal, setSearchVal] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const refreshPage = () =>
  {
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
    const fetchData = async() => {
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
    const {data} = await axios.get("http://localhost:4000/api/v1/userdelete", {params: {FlatNo: key}});
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
      key: "FlatNo"
    },
    {
      title: "Owner Name",
      dataIndex: "OwnerName",
      key: "OwnerName"
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email"
    },
    {
      title: "Mobile Number",
      dataIndex: "Mobile",
      key: "Mobile"
    },
    {
        title: "Role",
        dataIndex: "Role",
        key: "Role",
        render: () =>(
         <select>
            <option>admin</option>
            <option>user</option>
            <option>facility manager</option>
         </select>
        ) 
        
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 0 ? (
          <Popconfirm
            title="Click 'ok' button to confirm delete operation"
            onConfirm={() => handleSave(record)}
          >
            <button className="btn btn-primary">Edit</button>
          </Popconfirm>
        ) : null
    }
  ]

  const updateUser = async(row)=> {
    const {data} = await axios.get("http://localhost:4000/api/v1/userupdate", {params: {user: row}});
    console.log(data.user);
    refreshPage();
  }

  const handleSave = row => {
    console.log("row",JSON.stringify(row));
    updateUser(row);
  }

  const components = {
    body: {
      row: EditableRow,
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
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  return (
    <>
      <LoginNavBar />
      <div className="KeyContactDiv">
        <div style={{ display: "flex", justifyContent:"center", marginTop: "90px"}}>
            <img src="/src/assests/staff.png" style={{ height: "50px", width: "50px", marginTop : "15px", marginBottom: "50px"}}></img>
            <p id="title">STAFF MANAGEMENT</p>
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

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          rowKey="name"
          dataSource={filteredData}
          columns={columns}
          loading={loading}
          pagination={false}
          style={{
            marginTop: "20px",
          }}
        />
      </div>
      <div style={{ height: "100px", color: "white" }}></div>
    </>
  )
}

export default StaffManagement;
