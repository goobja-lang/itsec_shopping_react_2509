import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useShallow } from "zustand/shallow";
import React from "react";
import { useState } from "react";

export default function Header() {
  const userInfo = useAuthStore((state) => state?.userInfo);
  const { login, logout } = useAuthStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
    }))
  );
  const navigate = useNavigate();
  const location = useLocation();

  const isImgTestPage = location.pathname === "/imgtest";

  return (
    <div>
      {/* 1. 메인 헤더 (로고 - 메뉴 - 로그인정보 한 줄 배치) */}
      <header>
        {/* 로고 영역 */}
        <h1 className="logo" onClick={() => navigate("/")}>
          LOGO
        </h1>

        {/* 네비게이션 메뉴 영역 */}
        <nav>
          <ul className="topnav">
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                HOME
              </Link>
            </li>

            <li>
              <Link
                to="/product_upsert"
                className={
                  location.pathname === "/product_upsert" ? "active" : ""
                }
              >
                PRODUCT - UPLOAD
              </Link>
            </li>

            <li>
              <Link
                to="/aivtuber"
                className={location.pathname === "/aivtuber" ? "active" : ""}
              >
                AIVTUBER
              </Link>
            </li>
          </ul>
        </nav>

        {/* 우측 로그인/유저 정보 영역 */}
        <div className="header-right">
          {userInfo?.id ? (
            <>
              <span className="user-info">
                {userInfo?.displayName ?? "User"}
              </span>
              <button
                className="auth-button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="auth-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
