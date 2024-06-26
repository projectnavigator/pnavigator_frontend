import { useContext, createContext, useState } from "react";
import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
  useLoaderData,
} from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { UserContainer } from "../components/";
import Wrapper from "../assets/wrappers/DashboardFormPage";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/all-user");
    return { data };
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

const AllUserContext = createContext();

//post action
export const action1 = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered Successfully");
    return redirect("/dashboard/database");
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

const Database = () => {
  const { data } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isArchived, setIsArchived] = useState(true);
  const unarchiveUser = async (index) => {
    try {
      await customFetch.put(`/user/${index}/unarchive`, { archive: true });
      setIsArchived(false);
      toast.success("User/s have been unarchived");
      window.location.reload();
    } catch (error) {
      console.log(index);
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newUser"
        >
          New User
        </button>
        <div
          className="modal fade"
          id="newUser"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Create new user
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
                      name="firstName"
                      labelText="First Name"
                      required={true}

                      // defaultValue={"Ralph"}
                    />
                    <FormRow
                      type="text"
                      labelText="Last Name"
                      name="lastName"
                      required={true}

                      // defaultValue={"Talplacido"}
                    />
                    <FormRow
                      type="email"
                      labelText="Email"
                      name="email"
                      required={true}

                      // defaultValue={"ralph.sabalo@gmail.com"}
                    />
                    <FormRow
                      type="password"
                      labelText="Password"
                      name="password"
                      required={true}

                      // defaultValue={"password"}
                    />
                    <div className="form-check form-switch">
                      <input
                        name="isProjectManager"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isProjectManager"
                        value={true}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isProjectManager"
                      >
                        is a Project Manager?
                      </label>
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
                        {isSubmitting ? "Creating..." : "Add User"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* search button */}
        <div class="dropdown open">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="triggerId"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />

          <div className="dropdown-menu" aria-labelledby="triggerId">
            <button
              type="button"
              className="dropdown-item text-center"
              data-bs-toggle="modal"
              data-bs-target="#archivedModal"
            >
              Archived
            </button>
            <button
              type="button"
              className="dropdown-item text-center"
              data-bs-toggle="modal"
              data-bs-target="#searchUser"
            >
              Search User
            </button>
          </div>
        </div>
        <div
          className="modal fade"
          id="searchUser"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Search user
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
                    <FormRow
                      type="text"
                      name="firstName"
                      id={"first"}
                      labelText="First Name"

                      // defaultValue={"Ralph"}
                    />
                    <FormRow
                      type="text"
                      labelText="Last Name"
                      name="lastName"
                      id={"last"}
                      // defaultValue={"Talplacido"}
                    />

                    <div className="form-check form-switch">
                      <input
                        name="isProjectManager"
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={""}
                        value={true}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="isProjectManager"
                      >
                        is a Project Manager?
                      </label>
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
                        {isSubmitting ? "Searching..." : "Search"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="archivedModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" style={{ width: "300px" }}>
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Unarchive Users
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <Form>
                <div class="modal-body d-flex justify-content-center">
                  <ul>
                    {data
                      .filter((e) => e.archived === true)
                      .map((member, index) => (
                        <li key={index}>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheckChecked-${index}`}
                              onChange={(e) =>
                                unarchiveUser(member._id, e.target.checked)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexSwitchCheckChecked-${index}`}
                            >
                              {`${member.firstName} ${member.lastName}`}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </Form>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {isSubmitting ? "Unarchiving..." : "Unarchive"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AllUserContext.Provider value={{ data }}>
        <UserContainer />
      </AllUserContext.Provider>
    </div>
  );
};

export const UseAllUserContext = () => useContext(AllUserContext);

export default Database;
