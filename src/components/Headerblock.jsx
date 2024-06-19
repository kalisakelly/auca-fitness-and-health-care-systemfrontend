/* eslint-disable react/prop-types */


function HeaderBlock({ title, description, image }) {
    return (
      <div
        className="relative rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row items-center justify-center"
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '180px' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        
        <div className="relative z-10 p-4 text-center">
          <h1 className="text-3xl font-bold mb-2 text-blue-500">{title}</h1>
          <p className="text-gray-300 text-justify">{description}</p>
        </div>
      </div>
    );
  }
  
  export default HeaderBlock;
  
