import {Link} from 'react-router-dom'
 const map='px-4 rounded-md border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'
const Menu = (props) => {
  return (
  <div class="h-screen bg-hero-image bg-cover bg-center flex flex-col justify-center items-center">
      <div className='font-extrabold font-zila'>
          <h1 className='transition ease-in-out delay-100 duration-700 text-gray-600 hover:scale-110 text-8xl'>FIND A WAY HOME</h1>
      </div>

      <div className='text-white mt-20 mr-10 font-bold'>
      <ul className='flex gap-10 justify-center items-center '>
          <li className={map}>
              <Link to='/App'>Map1</Link>
          </li>
          <li className={map}>
              <Link to='/App2'>Map2</Link>
          </li>
          <li className={map}>
              <Link to='/App3'>Map3</Link>
          </li>
      </ul>
      </div>

  </div>
  )
}

export default Menu