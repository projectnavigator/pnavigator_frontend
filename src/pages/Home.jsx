import { FormRow, FormRowSelect } from "../components";
import { Form, useNavigation, redirect } from "react-router-dom";
import userLoaderData from "./alluserdata";
import customFetch from "../utils/customFetch";
import { useLoaderData, Link } from "react-router-dom";
import { ProjectContainer } from "../components";
import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {PROJECT_STATUS,PROJECT_SORT_BY, PROJECT_COMPLETION} from "../utils/constants";

const AllProjectContext = createContext();

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/project", data);
    toast.success("Created Successfully");
    return null;
  } catch (error) {
    const showErrorMessages = () => {
      const errors = error?.response?.data?.errorMessages;
      const errors1 = error?.response?.data?.msg;

      if (!errors1) {
        for (let i = 0; i < errors.length; i++) {
          toast.error(errors[i]);
        }
      } else {
        toast.error(errors1);
      }
    };
    showErrorMessages();
    return error;
  }
};

export const loader = async ({request}) => {
  console.log(request.url);
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries(),]);
  console.log(params);
  try {
    const [projectResponse, usersResponse, tasksResponse,currentuserResponse] = await Promise.all([
      customFetch.get("/project",{params}),
      customFetch.get("/user/all-user"),
      customFetch.get("/task"),
      customFetch.get("/user/current-user"),
    ]);

    const { data: projects } = projectResponse;
    const { data: users } = usersResponse;
    const { data: tasks1 } = tasksResponse;
    const { data: currentuser } = currentuserResponse;

    return { projects, users, tasks1, currentuser };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Home = () => {
  const { projects, users, tasks1, currentuser } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const animatedComponents = makeAnimated();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const userIds = selectedOptions.map((user) => user.value);

  const options = users
    .filter((user) => !user.isProjectManager)
    .map((option) => ({
      value: option._id,
      label: `${option.firstName} ${option.lastName}`,
    }));

  const handleExportCSV = async () => {
    try {
      const response = await customFetch.get("/project/export", {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your authentication token here
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Projects.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newProject"
        >
          New Project
        </button>
        <div
          className="modal fade"
          id="newProject"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="newProjectLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="newProjectLabel">
                  Create new project
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Form method="post">
                  <div className="form-center">
                    <FormRow
                      type="text"
                      name="projectName"
                      labelText="Project Name"
                      placeholder={"Project Name"}
                    />
                    <FormRow
                      type="date"
                      labelText="Plan Start"
                      name="plannedStart"
                      placeholder={"??"}
                    />
                    <FormRow
                      type="date"
                      labelText="Plan End"
                      name="plannedEnd"
                      placeholder={"??"}
                    />
                    <div className="form-row">
                      <label className="form-label">Team Members</label>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        label="Team"
                        value={selectedOptions}
                        isMulti
                        onChange={setSelectedOptions}
                        options={options}
                      />
                      <input
                        type="text"
                        hidden
                        name="team"
                        defaultValue={userIds.toString()}
                      />
                    </div>
                    <br />

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn form-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating" : "Create Project"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* another button */}

        <button
          type="button "
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#searchUser"
        >
          Search Engine
        </button>

        {currentuser.isProjectManager!==true?<button type="button " className="btn" onClick={handleExportCSV}>
          Export CSV
        </button>:''}

        <div
          className="modal fade"
          id="searchUser"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="searchUserLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="searchUser">
                  Filter Project
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
              <Form method="get">
                    <div className="form-center">
                      <FormRow type='search' name='search' defaultValue='' />
                      <FormRowSelect labelText='project status' name='projectStatus' list={['all', ...Object.values(PROJECT_STATUS)]} defaultValue="='all" />
                      <FormRowSelect labelText='project completion' name='projectCompletion' list={['all', ...Object.values(PROJECT_COMPLETION)]} defaultValue="='all" />
                      <FormRowSelect name='sort' defaultValue="newest" list={[...Object.values(PROJECT_SORT_BY)]} />

                      {/* TEMPORARY */}

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn form-btn"
                          data-bs-dismiss="modal"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'submitting' : 'submit'}
                        </button>
                        <Link to='/dashboard/dash' className="btn form-btn delete-btn">Reset Search Values</Link>
                      </div>
                    </div>
                  </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllProjectContext.Provider value={{ projects, users, tasks1, currentuser }}>
        <ProjectContainer />
      </AllProjectContext.Provider>
    </>
  );
};

export const UseAllProjectContext = () => useContext(AllProjectContext);

export default Home;
