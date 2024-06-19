// import Overview from '../components/Overview';
import UserActions from '../components/UserActions';
import VisitorInsights from '../components/VisitorInsights';
import StudyTypeChart from '../components/StudyTypeChart';
import { useNavigate } from 'react-router-dom';

const Adminpage = () => {

  const navigate = useNavigate()
  const handleaddvideo=()=>{

    navigate("/VideoFormPage")

  }

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Overall activities</h1>
          {/* <Overview /> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div  className="bg-blue-500 text-white p-4 rounded-lg shadow text-center">
                <h3 className=" text-xl mb-2 g-5 p-5">Exercise videos</h3>
                <button className="bg-gray-800 text-white p-2 rounded mb-2" onClick={handleaddvideo}>Add new video</button>
                {/* <button className="bg-green-500 text-white  p-2 rounded">Upload Details</button> */}
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <VisitorInsights />
            <StudyTypeChart />
          </div>
        </div>
      );
};

export default Adminpage;
