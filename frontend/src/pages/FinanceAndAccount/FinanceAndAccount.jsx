import React, { useContext, useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import "./FinanceAndAccount.css"
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







const FinanceAndAccount = () => {

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
  


  const defaultColumns = [
    {
      title: "Flat Number",
      dataIndex: "FlatNo",
      key: "FlatNo",
      editable: false
    },
    {
      title: "Owner Name",
      dataIndex: "OwnerName",
      key: "OwnerName",
      editable: false
    },
    {
      title: "Property Registered Name",
      dataIndex: "RegisteredName",
      key: "RegisteredName",
      editable: false
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      editable: false
    },
    {
      title: "Society Dues",
      dataIndex: "Dues",
      key: "Dues",
      editable: true
    },

  ]

  const updateUser = async(row)=> {
    const {data} = await axios.get("http://localhost:4000/api/v1/userupdate", {params: {user: row}});
    console.log(data.user);
    refreshPage();
  }

  const handleSave = row => {
    console.log("row",JSON.stringify(row));
    updateUser(row);
    // const newData = [...dataSource]
    // const index = newData.findIndex(item => row.FlatNo === item.FlatNo)
    // console.log("data", dataSource);
    // console.log("index", index);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row
    // })
    // setDataSource(newData)
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
        <div style={{ display: "flex", justifyContent:"center", }}>
            <img src="/src/assests/finance.png" style={{ height: "50px", width: "50px", marginTop : "20px", marginBottom: "50px"}}></img>
            <p id="title">FINANCE AND ACCOUNT MANAGEMENT</p>
        </div>
        
        <div className="Note">
          <p className="NoteTitle">NOTE</p>
          <ul> 
            <li className="NoteList">
               Only Society Dues field can be edited.
            </li>
            <li className="NoteList">
               Please Enter the value to be Edited in the Input and press enter button to be edited.
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
            marginRight: "50px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
           
          }}
        />
      </div>
      <div style={{ height: "100px", color: "white" }}></div>
    </>
  )
}

export default FinanceAndAccount;
