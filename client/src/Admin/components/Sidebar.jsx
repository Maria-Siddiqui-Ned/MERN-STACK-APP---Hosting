import React, { useEffect, useContext } from 'react'
import { FiHome } from 'react-icons/fi'
import { BiCategoryAlt } from 'react-icons/bi'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { TbBrandGooglePhotos } from 'react-icons/tb'
import { BsCart4 } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { GlobalContext } from '../../Context/context'
export default function Sidebar() {

    const location = useLocation()
    const { state, dispatch } = useContext(GlobalContext)

    const NavItems = [
        {
            tab: "Home",
            url: "/",
            icon: <FiHome />
        },
        {
            tab: "Categories",
            url: "/category",
            icon: <BiCategoryAlt />
        },
        {
            tab: "Products",
            url: "/products",
            icon: <MdOutlineProductionQuantityLimits />
        },
        {
            tab: "Brands",
            url: "/brands",
            icon: <TbBrandGooglePhotos />
        },

    ]


    return (
        <>

            <div className="bg-warning p-3 d-flex text-white justify-content-between align-items-center">
                <span className="text-dark"><h5><BsCart4 />Let's ShopPk</h5></span>
                <button className="btn btn-outline-dark"
                    onClick={() => dispatch({ type: "USER_LOGOUT" })}>Logout</button>
            </div>

            <div>
                 <h5 className="text-warning p-3"> Admin Dashboard</h5>
            </div>


           <ul className="nav flex-column pt-1">
                {
                    
                    NavItems.map((val, key) =>

                        <li key={key} className={`nav-item m-2  ${location.pathname == val.url ? 'bg-warning rounded opacity-75 text-dark' : null}`}>
                            <Link className='nav-link d-flex align-items-center  gap-2' to={val.url}>
                                <span>{val.icon}</span>

                                <span>{val.tab}</span>
                            </Link>
                        </li>)
                }

            </ul>

        </>
    )
}
