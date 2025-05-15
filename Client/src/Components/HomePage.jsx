import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [editUserData, setEditUserData] = useState(null);


  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/getusers` ,users);
      setUsers(response.data);
    } catch (error) {
      alert("Get data failed: " ,error);
    }
  };

  const updateData = async () => {
    try {
      await axios.put(
        `http://localhost:8000/users/putusers/${editUserData._id}`,
        editUserData
      );
      setEditUserData(null);
      getUserData(); 
    } catch (error) {
      alert("Update failed: " , error);
    }
  };

  const deleteUserData = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/deleteusers/${id}`);
      getUserData(); 
    } catch (error) {
      alert("Delete failed: " , error);
    }
  }; 

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">HomePage</h1>
      {users.map((user) => (
        <div key={user._id} className="mb-4 border p-4 rounded">
          {editUserData?._id === user._id ? (
            <div>
              <input
                type="text"
                value={editUserData.name}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, UserName: e.target.value })
                }
                placeholder="Username"
              />
              <input
                type="email"
                value={editUserData.email}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                type="text"
                value={editUserData.phoneNumber}
                onChange={(e) =>
                  setEditUserData({ ...editUserData, phoneNumber: e.target.value })
                }
                placeholder="Phone Number"
              />
              <button onClick={updateData} className="ml-2 bg-green-500 px-2 py-1 rounded text-white">
                Save
              </button>
              <button onClick={() => setEditUserData(null)} className="ml-2 bg-gray-500 px-2 py-1 rounded text-white">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <div>

                <div>Name : {user.name}</div> 
                <div>
                  Email : {user.email} 
                </div>
                <div>
                  PhoneNumber: {user.phoneNumber}
                </div>
              </div>
              <button
                onClick={() => setEditUserData(user)}
                className="mr-2 bg-blue-500 px-2 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUserData(user._id)}
                className="bg-red-500 px-2 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
