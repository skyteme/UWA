import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/header.css";
import logo from "../../css/imgs/logo.png";
import "../../css/MainSideBar.css";
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUser,
  faStar,
  faNoteSticky,
  faBook,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let currentPath = location.pathname;
  let [useSideBar, setUseSideBar] = useState(false);

  let token = localStorage.getItem("token") || "";

  const boxRef = useRef();

  const logout = () => {
    alert("로그아웃 하시겠습니까?");
    localStorage.removeItem("token");
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

  useEffect(() => {
    let setHandler = false;
    const handleOutsideClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        if (setHandler) {
          document
            .querySelector(".main_side_bar")
            .classList.remove("side_bar_animation");
          setUseSideBar(false);
        }
        setHandler = true;
      }
    };

    if (useSideBar) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [useSideBar]);

  return (
    <header>
      <div id="headerTop">
        <div id="logo">
          <Link>
            <img src={logo} />
          </Link>
        </div>
        {token ? (
          <div id="headerBtnBlock">
            <div id="headerNicknameBlock">{jwtDecode(token)["nickname"]}</div>
            <div>
              <FontAwesomeIcon
                className="header_icon"
                icon={faBars}
                size="lg"
                onClick={(e) => {
                  document
                    .querySelector(".main_side_bar")
                    .classList.add("side_bar_animation");
                  setUseSideBar(true);
                }}
              />
            </div>
            <button id="logoutBtn" onClick={logout}>
              <FontAwesomeIcon
                className="header_icon"
                icon={faRightFromBracket}
                size="lg"
              />
            </button>
          </div>
        ) : (
          <div id="headerBtnBlock">
            <Link id="loginBtn" to="/login">
              <div id="header_login_btn">
                <span className="header_font">Login</span>
                <span>
                  <FontAwesomeIcon
                    className="header_icon"
                    icon={faRightToBracket}
                    size="lg"
                  />
                </span>
              </div>
            </Link>
            <Link id="joinBtn" to="/join">
              <div id="header_login_btn">
                <span className="header_font">Join</span>
                <span>
                  <FontAwesomeIcon
                    className="header_icon"
                    icon={faUserPlus}
                    size="lg"
                  />
                </span>
              </div>
              {/* <div>Join</div> */}
            </Link>
          </div>
        )}
      </div>
      <div id="headerBottom">
        <ul id="headerMenu">
          <li>
            <Link
              to="/"
              className={currentPath == "/" ? "header_selectMenu" : null}
            >
              전체 와인
            </Link>
          </li>
          <li>
            <Link>판매중인 와인</Link>
          </li>
          <li>
            <Link
              to="/board/0/1/"
              className={
                currentPath.startsWith("/board") ? "header_selectMenu" : null
              }
            >
              자유게시판
            </Link>
          </li>
          <li>
            <Link>이벤트</Link>
          </li>
          <li>
            <Link>공지사항</Link>
          </li>
        </ul>
      </div>
      <div ref={boxRef} className="main_side_bar">
        <div className="side_bar_menu_logo">
          <img src={logo} />
        </div>
        <div className="side_bar_user_info">
          <div>{jwtDecode(token)["nickname"]}</div> |
          <div>
            {jwtDecode(token)["role"] == "ROLE_USER"
              ? "사용자"
              : jwtDecode(token)["role"] == "ROLE_SELLER"
              ? "판매자"
              : "관리자"}
          </div>
        </div>
        <div>
          <ul className="side_bar_menu_container">
            <li className="side_bar_menu_title">마이페이지</li>
            <li>
              <hr></hr>
            </li>
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faStar} className="side_bar_menu_icon" />
              즐겨찾기
            </li>
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faUser} className="side_bar_menu_icon" />
              정보 수정
            </li>
            <li className="side_bar_menu_list">
              <FontAwesomeIcon
                icon={faNoteSticky}
                className="side_bar_menu_icon"
              />
              게시글 관리
            </li>
            <li className="side_bar_menu_list">
              <FontAwesomeIcon icon={faBook} className="side_bar_menu_icon" />
              다이어리
            </li>
            <Link
              to="mypage/regist"
              className={
                currentPath.startsWith("/mypage/regist")
                  ? "side_menu_list_select"
                  : null
              }
            >
              <li className="side_bar_menu_list">
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className="side_bar_menu_icon"
                />
                판매자 요청
              </li>
            </Link>
            <li className="side_bar_menu_title">판매자</li>
            <li>
              <hr></hr>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
