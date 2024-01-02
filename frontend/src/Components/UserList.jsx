// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import "../CSS/UserList.css"

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

// //   const handleSelectUser = async (selectedUserId) => {
// //     try {
// //       // Implement logic to add user to the team
// //       const token = sessionStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:5039/User/Log",
// //         { memberId: selectedUserId },
// //         {
// //           headers: {
// //             Authorization: token ? `${token}` : "",
// //           },
// //         }
// //       );

// //       Swal.fire({
// //         text: response.data.msg,
// //         icon: "success",
// //         confirmButtonText: "OK",
// //       });

// //       console.log("User added to the team:", response.data);

// //       // Update the teamMembers state with the added user ID
// //     } catch (error) {
// //       console.error("Error adding user to the team:", error);
// //       Swal.fire({
// //         text: "Something went wrong",
// //         icon: "failer",
// //         confirmButtonText: "OK",
// //       });
// //     }
// //   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       // Implement logic to delete user
//       const response = await axios.delete(
//         `http://localhost:5039/User/Delete/${userId}`
//       );
//       console.log("User deleted:", response.data);
//       Swal.fire({
//         text: response.data.msg,
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       fetchUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       Swal.fire({
//         text: "Something went wrong",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5039/User/All-Users?page=${page}&search=${searchQuery}`,
//         { params: filters }
//       );
//       setUsers(response.data.users);
//       console.log(response.data);
//       setTotalPages(response.data.totalPage);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const handleFilterChange = (filter, value) => {
//     setFilters({ [filter]: value });
//   };

//   const handlePageChange = (newPage) => {
//     // Updating the current page
//     setPage(newPage);
//   };

//   useEffect(() => {
//     fetchUsers();
//     // usersLength()
//   }, [searchQuery, page, filters]);

//   return (
//     <div className="mainBox">
//       <div className="filterBoxes">
//         <div>
//         <label>Search by any field Name</label>
//           <input
//             type="text"
//             placeholder="Search by name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Name:</label>
//           <select
//             value={filters.name}
//             onChange={(e) => handleFilterChange("name", e.target.value)}
//           >
//             <input type="text" />
           
//           </select>
//         </div>

//         <div>
//           <label>Email:</label>
//           <select
//             value={filters.email}
//             onChange={(e) => handleFilterChange("email", e.target.value)}

//           >
//             <input type="text" />
            
//           </select>
//         </div>
//         <div>
//           <label>Phone:</label>
//           <select
//             value={filters.phone}
//             onChange={(e) => handleFilterChange("phone", e.target.value)}
//           >
//             <input type="text" />
           
//           </select>
//         </div>
//       </div>
//       <div className="user-list">
//         {users.map((user) => (
//           <div key={user._id} className="user-card">
//             {/* <div>
//               <Link to={"/user/" + user._id}>
//                 <img src={user.avatar} alt="User Avatar" />
//               </Link>
//             </div> */}

//             <p>
//               Name: {user.name}
//             </p>
//             <p>Email: {user.email}</p>
//             <p>Gender: {user.gender}</p>
//             <p>Phone: {user.phone}</p>
//             <p>City: {user.city}</p>
            

//             {/* <button onClick={() => handleSelectUser(user._id)}>
//               Add To Team
//             </button> */}
//             <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
//             <button className="Lnk">
//               <Link to={"/update/" + user._id}>Update User</Link>
//             </button>
//           </div>
//         ))}
//       </div>
//      <div c>
//      <div className="btnsContainer">
//         {Array(totalPages)
//           .fill()
//           .map((ele, index) => (
//             <div> <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
//             {index + 1}
//           </button></div>
//           ))}
//       </div>
//      </div>
//     </div>
//   );
// };

// export default UserList;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../CSS/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
  });


  const [sortOrder, setSortOrder] = useState("asc");

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5039/User/Delete/${userId}`
      );
      console.log("User deleted:", response.data);
      Swal.fire({
        text: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5039/User/All-Users?page=${page}&search=${searchQuery}`,
        { params: filters,sortOrder }
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    fetchUsers();
  }, [searchQuery, page, filters]);

  return (
    <div className="mainBox">
      <div className="filterBoxes">
        <div>
          <label>Search by any field Name</label>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="text"
            value={filters.email}
            onChange={(e) => handleFilterChange("email", e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={filters.phone}
            onChange={(e) => handleFilterChange("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="sortButtons">
          <button onClick={toggleSortOrder}>
            Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
        </div>
      <div className="user-list">
     
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
            <p>City: {user.city}</p>

            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button className="Lnk">
              <Link to={`/update/${user._id}`}>Update User</Link>
            </button>
          </div>
        ))}
      </div>
      <div className="btnsContainer">
        {Array(totalPages)
          .fill()
          .map((_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default UserList;
