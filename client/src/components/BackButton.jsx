import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCircleChevLeft } from "react-icons/ci";
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        position: 'absolute',
        bottom: '50px',
        fontSize:"40px",
        zIndex:"30",
        left: '10px',
        padding: '3px',
        color: 'white',
        border: 'none',
        borderRadius: '100px',
        cursor: 'pointer',
      }}
      className='bg-black hover:bg-slate-900'
    >
        <CiCircleChevLeft/>
    </button>
  );
};

export default BackButton;
