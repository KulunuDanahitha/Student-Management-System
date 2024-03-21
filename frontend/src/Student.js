import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

function Student() {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        console.log(res.data);
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setStudent(student.filter((std) => std.ID !== id));
      })
      .catch((err) => console.log(err));
    
  }



  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success"> Add +</Link>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {student.map((std, index) => (
              <tr key={index}>
                <td> {std.Name} </td>
                <td> {std.Email} </td>
                <td>
                  <Link to={`update/${std.ID}`} className = " btn btn-primary"> Update </Link>
                  <button className=" btn btn-danger ms-2" onClick={e => handleDelete(std.ID)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
