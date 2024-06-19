
const UserActions = () => {
  const actions = [
    { label: 'Users', buttonText: 'Add admin user' },
    { label: 'Exercise videos', buttonText: 'Add Video category' },
    { label: 'Nutrients', buttonText: 'Add food category' },
  ];

  return (
    <>
      {actions.map((action, index) => (
        <div key={index} className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
          <h3 className=" text-xl mb-2 g-5 p-5">{action.label}</h3>
          <button className="bg-gray-800 text-white p-2 rounded mb-2">{action.buttonText}</button>
          {/* <button className="bg-green-500 text-white  p-2 rounded">Upload Details</button> */}
        </div>
      ))}
    </>
  );
};

export default UserActions;
