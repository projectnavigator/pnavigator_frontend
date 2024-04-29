import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/User";
import UserInfo from "./userInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import { toast } from "react-toastify";

day.extend(advancedFormat);

const Users = ({_id,firstName,lastName,isProjectManager,createdAt}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  const [isArchived, setIsArchived] = useState(false);
  const archiveUser = async () => {
  try {
    await customFetch.put(`/user/${_id}/archive`, { archive: true });
    setIsArchived(true);
    toast.success('User has been archived')
    window.location.reload()
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
console.log(_id);

  return (
    <Wrapper>
 <header>
        <div className='main-icon'>{lastName.charAt(0)}</div>
        <div className='info'>
          <h5>{lastName}</h5>
          <p>{firstName}{isProjectManager}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <UserInfo icon={<FaCalendarAlt />} text={date} />
          <UserInfo icon={<FaBriefcase />} text={isProjectManager} />
        </div>
        <footer className='actions'>
          <Form method='post' action={`../delete-user/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
          <button className="btn delete-btn" style={{marginLeft:'5px'}} onClick={archiveUser}>Archive</button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Users;