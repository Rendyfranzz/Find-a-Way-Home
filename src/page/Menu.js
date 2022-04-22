import React from 'react'
import {Link} from 'react-router-dom'
const Menu = (props) => {
  return (
  <div class="h-screen w-full bg-hero-image bg-cover bg-center flex flex-col justify-center items-center">

      <div className='font-extrabold font-zila'>
          <h1 className='text-slate-400 hover:text-sky-400 text-8xl'>FIND A WAY HOME</h1>
      </div>

      <div className='bg-transparent text-white mt-20'>
      <ul className='flex gap-10 justify-center items-center '>
          <li>
              <Link to='/'></Link>
          </li>
          <li>
              <Link to='/App'>Map1</Link>
          </li>
          <li>
              <Link to='/App2'>Map2</Link>
          </li>
          <li>
              <Link to='/App3'>Map3</Link>
          </li>
      </ul>
      </div>

  </div>
  )
}

export default Menu