import React from 'react'
import topImage from '../../assets/404.png'
import './Index.css'
import { Link } from 'react-router-dom'

const LostPage = () => {
  return (
    <div className='container'>
      <div className='imageContainer'>
         <img src={topImage} alt="404NotFound" srcset="" />
      </div>
      <div>
         <h2>Page Not Found</h2>
         <Link className=' btn btn-404 btn-primary' to="/" >GO BACK TO HOME </Link>
      </div>
    </div>
  )
}

export default LostPage
