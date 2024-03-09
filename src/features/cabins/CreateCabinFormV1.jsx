import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import FormRow from "./FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";

import { createCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;
  //console.log(errors);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreateing } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New Cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(data) {
    console.log({ ...data, image: data.image[0] });

    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          disabled={isCreateing}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isCreateing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreateing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Cabin should have a price",
            min: { value: 150, message: "Minimum price is 150" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreateing}
          type="number"
          id="discount"
          defaultValue="0"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          disabled={isCreateing}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Cabin should have a description",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreateing}
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Cabin should have a image",
          })}
        />
      </FormRow>

      <FormRow>
        {/*  type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreateing}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
