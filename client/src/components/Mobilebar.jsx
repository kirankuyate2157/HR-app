// MobileBar.js

import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBuilding, FaBell, FaChartBar, FaCog } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";


const MobileBar = () => {
  return (
    <div id="mobile-bottom-bar" className="fixed lg:hidden bottom-3 left-3  right-3 py-3 px-1 m-auto shadow-md bg-slate-900 rounded-full flex justify-center max-w-[700px]">
      <div className="flex w-full justify-evenly">
      <Link to="/home" className="text-center">
        <FaHome className="text-2xl" />
      </Link>
      <Link to="/employee" className="text-center">
        <FaUsers className="text-2xl" />
      </Link>
      <Link to="/selection" className="text-center">
        <FaBuilding className="text-2xl" />
      </Link>
      <Link to="/notification" className="text-center">
        <FaBell className="text-2xl" />
      </Link>
      <Link to="/reports" className="text-center">
        <FaChartBar className="text-2xl" />
      </Link>
      <Link to="/forms" className="text-center">
        <SiGoogleforms className="text-2xl" />
      </Link>
      <Link to="/setting" className="text-center">
        <FaCog className="text-2xl" />
      </Link>
      </div>
    </div>
  );
};

export default MobileBar;
