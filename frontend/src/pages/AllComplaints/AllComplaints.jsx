import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Input, Form, Popconfirm } from "antd";
import axios from "axios";
import './AllComplaints.css';
import LoginNavBar from '/src/components/LoginNavBar/LoginNavBar'
import 'antd/dist/antd.css';
import Accordion from 'react-bootstrap/Accordion';
const { Search } = Input;
import Posts from "/src/components/Posts/Posts"

import Toast from 'react-bootstrap/Toast';
import AdminPosts from "../../components/AdminPosts/AdminPosts";
import { useRoutes } from "react-router-dom";

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


const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/api/v1/AllComplaints"
  );
  const users = data.complaints;
  return users;
};


function AllComplaints() {
  const [Issues, setIssues] = useState([]);
  const [dataSource, setDataSource] = useState([])
  const [searchVal, setSearchVal] = useState("")
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isvalid, setIsvalid] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");
  const [filteredData, setFilteredData] = useState([]);


  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
      if (!allValues) allValues = [];
      for (var key in user) {

        if (typeof user[key] === "object") crawl(user[key], allValues);
        else if (key !== "Description") {
          if (key === "Time") {
            let timeStamp = Date.parse(user[key]);
            var date1 = new Date(timeStamp);
            var date2 = new Date();

            var Difference_In_Time = date2.getTime() - date1.getTime();
            var days = Difference_In_Time / (1000 * 3600 * 24);
            days = (Math.ceil(days)).toString();
            user[key] = days + ((days > 1) ? " days " : " day ");
            allValues.push(days + " ");
          }
          else {
            allValues.push(user[key] + " ");
          }
        }
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
  }, [selectedOption]);

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
    } else {
      setFilteredData(origData);
    }
  }, [searchVal, origData, searchIndex]);



  const delete_Issue = async (ele) => {
    const issue = await axios.post("http://localhost:4000/api/v1/delete_issue", {
      issue: ele.Name,
      Admin: JSON.parse(localStorage.getItem("User")).FlatNo
    })
    setIssues([]);
  }

  const issue = async (issue) => {
    const { data } = await axios.post("http://localhost:4000/api/v1/new_issue", {
      issue: issue
    })
    setIssues([]);
  }
  const issueSubmit = (e) => {
    e.preventDefault();
    issue(e.target.issue.value);
  }
  const fetchIssues = async () => {
    const { data } = await axios.get("http://localhost:4000/api/v1/issue_types");
    setIssues(data.issues);
  }
  useEffect(() => {
    fetchIssues();
  }, [Issues.length]);

  const deleteComplaint = async (key) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/deletecomplaint", { params: { FlatNo: key.FlatNo, Issue: key.Issue, Description: key.Description } });
    refreshPage();
  }

  const handleDelete = (key) => {

    deleteComplaint(key);
    const newData = dataSource.filter(item => item.FlatNo !== key.FlatNo)

    setDataSource(newData)
  }

  const confirm = () => {
    setIsvalid(true);
  }

  const defaultColumns = [
    {
      title: "Flat Number",
      dataIndex: "FlatNo",
      key: "FlatNo",
      editable: false
    },
    {
      title: "Issue",
      dataIndex: "Issue",
      key: "Issue",
      editable: false
    },
    {
      title: "Days Since Posted",
      dataIndex: "Time",
      key: "Time",
      editable: false
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      editable: true
    },

  ]

  const updateComplaint = async (row) => {
    const { data } = await axios.get("http://localhost:4000/api/v1/updatecomplaint", { params: { complaint: row } });
    console.log(data.complaint);
    refreshPage();
  }

  const handleSave = row => {
    updateComplaint(row);

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
        <div style={{ display: "flex", marginTop: "100px", justifyContent:"center", }}>
            <img src="/src/assests/complaint.png" style={{ height: "50px", width: "50px", marginTop : "-3px", marginBottom: "50px", marginRight: "5px"}}></img>
            <p id="title10">ALL COMPLAINTS</p>
        </div>

          <Accordion >
          <Accordion.Item eventKey="0" id="IssueAccord" style={{ marginTop: "50px", width: "90%", border: "2px solid #d3d3d3", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", }}>
            <Accordion.Header>
              <p className="IssueTitle">Add New Complaint Type</p>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <form onSubmit={
                   issueSubmit
                } className="ComplaintForm">
                  <div style={{ display: "flex" }}>
                    <input placeholder="Complaint Type" type="text" name="issue" className="IssueInput" />
                    <Popconfirm
                      title='Click "ok" button to confirm'
                      onConfirm={confirm}>
                      <button type="submit" className="IssueButton">Add</button>
                    </Popconfirm>
                  </div>
                </form>
              </div>
              <div className="ToastDiv">

                {

                  Issues.map(({ Name }) => {
                    return (
                      <Toast onClose={(e) => { e.preventDefault(); delete_Issue({ Name }) }} animation={false} className="ToastIssue">
                        <Toast.Header>
                          {Name}
                        </Toast.Header>
                      </Toast>);
                  })

                }
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="Note" style={{ marginTop: "50px" }}>
          <p className="NoteTitle">NOTE</p>
          <ul>
            <li className="NoteList">
              Status Field can only be edited.
            </li>
            <li className="NoteList">
              Please Enter the value to be Edited in the Input and press enter button to be edited.
            </li>
            <li className="NoteList">
              Please Press Delete button to delete the Complaint details
            </li>
          </ul>
        </div>
        <Search
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Search Complaint"
          enterButton
          size="large"
          style={{ width: "90%", marginTop: "50px", border: "1px solid black", borderRadius: "5px" }}
        />
          <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
            <p style={{ fontSize: "20px", letterSpacing: "1px", marginBottom:"0px"}}>Filter Complaints</p>
            <select onChange={(e) => setSelectedOption(e.target.value)} style={{ width: "300px", height: "50px", padding: "10px", borderRadius: "10px", border: "2px solid black" }}>
              <option value="all" >All</option>
              <option value="month">More than 1 month</option>
              <option value="twomonths">More than 2 months</option>
              <option value="threemonths">More than 3 months</option>
              <option value="fourmonths">More than 4 months</option>
              <option value="fivemonths">More than 5 months</option>
              <option value="sixmonths">More than 6 Months</option>

            </select>
          </div>
        
        <div className="AdminPostsDiv">
          {
            filteredData.map(item => <AdminPosts props={item} selectedOption={selectedOption} />)
          }
        </div>
      </div>
      <div style={{ height: "100px", color: "white" }}>

      </div>
    </>
  );
}

export default AllComplaints;