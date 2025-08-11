import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Store } from "../../../Utils/Store";

const Sidebar = () => {
    const {state,dispatch } = useContext(Store)
    const {UserInfo} = state
 
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('UserInfo');
        dispatch({ type: 'ClearUserInfo', payload: null })
        navigate('/login');
    };
    return (
        <>
            <div className="vertical-menu">
                <div data-simplebar="init" className="h-100">
                    <div className="simplebar-wrapper" style={{ margin: 0 }}>
                        <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer" />
                        </div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{ right: "-17px", bottom: 0 }}>
                                <div
                                    className="simplebar-content-wrapper"
                                    style={{ height: "100%", overflow: "hidden scroll" }}
                                >
                                    {UserInfo? UserInfo.isAdmin?
                                    <div className="simplebar-content" style={{ padding: 0 }}>
                                        {/*- Sidemenu */}
                                        <div id="sidebar-menu" className="mm-active">
                                            <p className="mb-2 ml-5" style={{marginLeft:"20px",color:"red"}}><b>Admin</b></p>

                                            <ul className="metismenu list-unstyled mm-show" id="side-menu">
                                                <li className='menu-title' id='key-menu'>
                                                    Sidebar
                                                </li>
                                                <li>
                                                    <Link to="/admin/dashboard" className="waves-effect">
                                                        <i className="bx bx-home" />
                                                        <span key="t-chat">Profile</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/users-list" className="waves-effect">
                                                        <i className="bx bx-user" />
                                                        <span key="t-chat">Users</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/attorneys-list" className="waves-effect">
                                                        <i className="bx bx-book" />
                                                        <span key="t-chat">Attorneys</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/admin/transactions-list" className="waves-effect">
                                                        <i className="bx bx-transfer" />
                                                        <span key="t-chat">Transaction</span>
                                                    </Link>
                                                </li>
                                                <li onClick={handleLogout}>
                                                    <Link className="waves-effect">
                                                        <i className="bx bx-power-off" />
                                                        <span key="t-chat">Logout</span>
                                                    </Link>
                                                </li>
                                            </ul>


                                        </div>
                                        {/* Sidebar */}
                                    </div>:UserInfo.isLawyer?<div className="simplebar-content" style={{ padding: 0 }}>
                                        {/*- Sidemenu */}
                                        <div id="sidebar-menu" className="mm-active">
                                            <p className="mb-2 ml-5" style={{marginLeft:"20px",color:"red"}}><b>Lawyer</b></p>

                                            <ul className="metismenu list-unstyled mm-show" id="side-menu">
                                                <li className='menu-title' id='key-menu'>
                                                    Sidebar
                                                </li>
                                                <li>
                                                    <Link to="/user/dashboard" className="waves-effect">
                                                        <i className="bx bx-home" />
                                                        <span key="t-chat">Profile</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/user/settings" className="waves-effect">
                                                        <i className="bx bx-slider-alt" />
                                                        <span key="t-chat">Setting</span>
                                                    </Link>
                                                </li>
                                              
                                                <li onClick={handleLogout}>
                                                    <Link className="waves-effect">
                                                        <i className="bx bx-power-off" />
                                                        <span key="t-chat">Logout</span>
                                                    </Link>
                                                </li>
                                            </ul>


                                        </div>
                                        {/* Sidebar */}
                                    </div>:null:null
                                    }

                                </div>
                            </div>
                        </div>
                        <div
                            className="simplebar-placeholder"
                            style={{ width: "auto", height: 1237 }}
                        />
                    </div>
                    <div
                        className="simplebar-track simplebar-horizontal"
                        style={{ visibility: "hidden" }}
                    >
                        <div
                            className="simplebar-scrollbar"
                            style={{ transform: "translate3d(0px, 0px, 0px)", display: "none" }}
                        />
                    </div>
                    <div
                        className="simplebar-track simplebar-vertical"
                        style={{ visibility: "visible" }}
                    >
                        <div
                            className="simplebar-scrollbar"
                            style={{
                                height: 618,
                                transform: "translate3d(0px, 0px, 0px)",
                                display: "block"
                            }}
                        />
                    </div>
                </div>
            </div>


        </>
    )
}

export default Sidebar