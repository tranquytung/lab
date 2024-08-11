import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faCircleXmark, faHouse, faAddressCard, faChartLine, faFileLines, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function HeaderPage() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);

           return window.innerWidth
        }
        window.addEventListener("resize", changeWidth);
        return () => {
            window.removeEventListener("resize", changeWidth);
        }
    }, []);


    const handleClickToggle = () => {
        setToggleMenu(!toggleMenu);
    }

    return(
        <>
            <div className="nav">
                {
                    screenWidth < 1023 ? (
                        <>
                            <div className="nav-btn-bars" onClick={() => handleClickToggle()}>
                                <FontAwesomeIcon icon={faBars} color={"#fff"} />
                            </div>
                            <div onClick={() => handleClickToggle()}
                                 className={`nav-overlay ${toggleMenu ? "nav-open-overlay" : ""}`}>
                            </div>
                            <nav className={`nav-mobile ${toggleMenu ? "nav-open-mobile" : ""}`}>
                                <div className="nav-mobile-close" onClick={() => handleClickToggle()}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </div>
                                <ul className="nav-mobile-list">
                                    <li onClick={() => handleClickToggle()}>
                                        <FontAwesomeIcon icon={faHouse} />
                                        <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                                    </li>
                                    <li onClick={() => handleClickToggle()}>
                                        <FontAwesomeIcon icon={faAddressCard} />
                                        <NavLink className="nav-link" to="/about">Giới thiệu</NavLink>
                                    </li>
                                    <li onClick={() => handleClickToggle()}>
                                        <FontAwesomeIcon icon={faChartLine} />
                                        <NavLink className="nav-link" to="/service">Dịch vụ</NavLink>
                                    </li>
                                    <li onClick={() => handleClickToggle()}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <NavLink className="nav-link" to="/project">Dự án</NavLink>
                                    </li>
                                    <li onClick={() => handleClickToggle()}>
                                        <FontAwesomeIcon icon={faPhone} />
                                        <NavLink className="nav-link" to="/contract">Liên hệ</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </>
                    ) : (
                        <nav className="nav-pc">
                            <ul className="nav-list">
                                <li>
                                    <NavLink className="nav-link" to="/">Trang chủ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/about">Giới thiệu</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/service">Dịch vụ</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/project">Dự án</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/contract">Liên hệ</NavLink>
                                </li>
                            </ul>
                        </nav>
                    )
                }
            </div>
        </>
    )
}