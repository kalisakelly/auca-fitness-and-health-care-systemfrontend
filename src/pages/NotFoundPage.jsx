import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <div className='container mx-auto'>
        <section className="text-center flex flex-col justify-center items-center h-96">
            <FaExclamationTriangle className=' text-yellow-400 text-6xl mb-4' />
            <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
            <p className="text-xl mb-5">This page does not exist</p>
            <Link
                to="/"
                className="text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-md px-3 py-2 mt-4"
                >
                    Go Back
            </Link>
        </section>
    </div>
  )
}

export default NotFoundPage