import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";

import { useGuests } from "./useGuests";

import Input from "../../ui/Input";
import propTypes from "prop-types";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { flag } from "../../utils/helpers";
CreateGuestForm.propTypes = {
  editGuest: propTypes.object,
  onClose: propTypes.func,
};
// const FormSelect = styled(Select)`
//   width: 100%;
// `;

// With NEW modal
// function CreateGuest({ onSuccessNewGuest, setIsOpenForm }) {

function CreateGuestForm({ onClose }) {
  //const { isLoading: isLoadingCountries, countries } = useCountries();
  const { creatingGuest, isCreating } = useGuests();
  //const [countryFlag, setCountryFlag] = useState("");

  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  if (isCreating) return <Spinner />;

  function onSubmit(data) {
    const countryFlag = flag(data.nationality);
    data.countryFlag = countryFlag
      ? `https://flagcdn.com/${countryFlag}.svg`
      : "";
    creatingGuest(data, {
      onSuccess: () => {
        reset();
        onClose?.();
      },
    });
  }
  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "Email address is required",
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: "Please specify a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          id="nationality"
          disabled={isCreating}
          // options={[
          //   { value: "", label: "Select nationality..." },
          //   ...countryOptions,
          // ]}
          //onChange={handleFlag}
          {...register("nationality", {
            required: "This field is required",
          })}></Input>
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="nationalID"
          {...register("nationalID", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => {
            onClose?.();
            console.log("close modal");
          }}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
