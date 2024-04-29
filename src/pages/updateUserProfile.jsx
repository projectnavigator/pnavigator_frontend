import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";
import { FormRow } from "../components";

export const loader = async ({params}) => {
    try {
      const response = await customFetch.get("/user/current-user");
      const { data: currentUser } = response;
      
  
      return { currentUser };
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

// export const action = async ({ request, params }) => {
//   const { currentUser } = useLoaderData();
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   try {
//     await customFetch.patch(`/user/${currentUser.user._id}`, data);
//     toast.success("User Updated Successfully");
//     return redirect("/dashboard");
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//     return error;
//   }
// };

const updateUserProfile = () => {
  const {currentUser}  = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(currentUser);

  return (
    <Wrapper>
      <Form action={action}>
        <h4 className="form-title">Update User Profile</h4>
        <div className="form-center">
          <FormRow type="email" name="email" value={currentUser.user.email} />
          <FormRow type="password" name="current password" />
          <FormRow type="password" name="new password" />
          <FormRow type="password" name="confirm password" />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default updateUserProfile;