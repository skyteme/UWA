import { jwtDecode } from "jwt-decode";
import React from "react";
import "../../css/admin/command/adminheader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminHeader = () =>{
  const token = localStorage.getItem("token") || "";
    if (token === "") {
      return <></>;
    } else {
      const userinfo = jwtDecode(token);
      if(userinfo.role === "ROLE_ADMIN") {
        return <AdminHeaderComponent userinfo={userinfo} />;
      } else {
        return <></>
      }
      
    }
}
const AdminHeaderComponent = () => {
  const navigate = useNavigate();

  let token = localStorage.getItem("token") || "";
  console.log(token);

  const logout = () => {
    alert("로그아웃 하시겠습니까?");
    token = null;

    axios
      .post("http://localhost:8080/api/user/logout")
      .then((res) => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="adminHeader">
      <div id="adminHeaderTitle">
        <div>{jwtDecode(token)["nickname"]}</div>님 환영합니다
      </div>
      <div id="adminUserInfo">
        <div id="adminUserInfoUsername">
          Username<div>{jwtDecode(token)["nickname"]}</div>
        </div>
        <div id="adminUserLogoutBtn">
          <button onClick={logout}>Logout</button>
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;