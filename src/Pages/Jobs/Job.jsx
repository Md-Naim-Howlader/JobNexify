import { FaRegHeart } from "react-icons/fa";

import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import ToggleFavJob from "../../utils/ToggleFavJob";
import { deleteJob } from "../../utils/deleteJob";
import { useContext } from "react";
import { JobContext } from "../../Context/JobContext";

const Job = ({ job, updateData, setUpdateData }) => {
  const [user] = useAuthState(auth);
  // destucture job
  const { id, title, logo, companyName, position, description } = job;

  // call jobContext get need data

  // navigate route
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate(`/jobs/${id}`);
  };
  const { favToggle, handleAddFav, handleRemoveFav } = ToggleFavJob(job);

  // handle delete job
  const handleDeleteJob = (id) => {
    deleteJob(id, updateData, setUpdateData);
  };

  // add apply
  const { dispatch, addApply } = useContext(JobContext);
  const handleApplyClick = () => {
    addApply(dispatch, job);
    navigate(user ? "/applyJob" : "/signUp");
  };
  return (
    <div className="post">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="post__owner_info">
          <img src={logo} alt="Darkento Ltd." />
          <div className="info">
            <h4>{companyName}</h4>
          </div>
        </div>
        <button
          onClick={handleDetailsClick}
          className="btn"
          title="Show Details"
        >
          Show Details
        </button>
      </div>
      <div className="post__body">
        <h3>{title}</h3>
        <span>Job Position: {position}</span>
        <p>{description}</p>
        <div className="buttons">
          <button
            onClick={handleApplyClick}
            className="apply__btn"
            title="Apply Now"
          >
            Apply Now
          </button>
          {/* favorite icons start */}

          <button
            onClick={favToggle ? () => handleRemoveFav(id) : handleAddFav}
            style={{ color: "#d63031" }}
            className="edit_delete"
          >
            {!favToggle ? <FaRegHeart /> : <FaHeart />}
          </button>

          {/* favorite icons end */}
          <button className="edit_delete" title="Edit">
            <FaEdit />
          </button>
          <button
            onClick={() => handleDeleteJob(id)}
            style={{ color: "#DC3545" }}
            className="edit_delete"
            title="Delete"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
