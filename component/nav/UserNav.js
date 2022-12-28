import React from 'react'
import Link from 'next/link'
import {useEffect, useState} from 'react'
function UserNav() {

  const [current, setCurrent] = useState("");

  useEffect(() => {
    console.log(window.location.pathname);
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);


  return (
    <div className="nav flex-column nav-pills m-2">
    <Link href='/user'>
    <a className={`nav-link ${current==='/user' && 'active'}`}>Dashboard</a></Link>

    </div>
  )
}
export default UserNav