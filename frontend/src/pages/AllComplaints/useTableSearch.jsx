import { useState, useEffect } from "react";

export const useTableSearch = ({ searchVal, retrieve }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

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
            user[key] = days + ((days > 1)?" days " : " day ");
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
      const users = await retrieve();
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
  }, [retrieve]);

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

  return { filteredData, loading };
};
