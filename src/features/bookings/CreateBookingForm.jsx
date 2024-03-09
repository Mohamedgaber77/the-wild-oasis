import { differenceInCalendarDays } from "date-fns";
import Spinner from "../../ui/Spinner";
import { useCabin } from "../cabins/useCabin";
import { useGuests } from "../guests/useGuests";
import { useSetting } from "../settings/useSetting";
import { useBookings } from "./useBookings";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import propTypes from "prop-types";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";

import Input from "../../ui/Input";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
CreateBookingForm.propTypes = {
  onClose: propTypes.func,
};
const FormSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;
function CreateBookingForm({ onClose }) {
  const { creatingBooking, isCreating } = useBookings();
  const { fetching, cabins } = useCabin();

  const { allGuests, isAllGuests } = useGuests();
  const { loadSetting, setting } = useSetting();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  if (loadSetting || fetching || isCreating || isAllGuests /* /*creating*/)
    return <Spinner />;

  const guest = allGuests?.map((guest) => ({
    id: guest.id,
    name: guest.fullName,
    email: guest.email,
    nationality: guest.nationality,
    nationalID: guest.nationalID,
    countryFlag: guest.countryFlag,
  }));
  const cabin = cabins?.map((cabin) => ({
    price: cabin.regularPrice,
    id: cabin.id,
    name: cabin.name,
    description: cabin.description,
    image: cabin.image,
    maxCapacity: cabin.maxCapacity,
    discount: cabin.discount,
  }));

  console.log(cabin);
  console.log(guest);

  function onSubmit(data) {
    const chosenCabin = cabin
      ?.filter((cabin) => cabin.id === Number(data.cabinId))
      .at(0);

    const numNights =
      data.startDate === data.endDate
        ? 1
        : differenceInCalendarDays(
            new Date(data.endDate),
            new Date(data.startDate)
          );

    const cabinPrice = (chosenCabin.price - chosenCabin.discount) * numNights;
    const cabinCapacity = chosenCabin.maxCapacity;
    if (cabinCapacity < data.numGuests) {
      toast.error(`Cabin capacity is ${cabinCapacity}`);
    }
    const extrasPrice = addBreakfast
      ? setting.breakfastPrice * numNights * data.numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;
    if (data.startDate > data.endDate)
      return toast.error("End date must be after start date");
    creatingBooking(
      {
        ...data,
        cabinPrice,
        extrasPrice,
        totalPrice,
        isPaid,
        numNights,
        cabinId: Number(data.cabinId),
        numGuests: Number(data.numGuests),
        guestId: Number(data.guestId),
        hasBreakfast: addBreakfast,
        status: "unconfirmed",
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      },
      {
        onSucess: () => {
          toast.success("Booking created");
          reset();
          onClose?.();
        },
      }
    );
    console.log(data.endDate);
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label={"Cabin"} error={errors?.cabinId?.message}>
        <FormSelect
          id="cabinId"
          disabled={isCreating}
          {...register("cabinId", {
            required: "This field is required",
          })}>
          {cabin?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              Name {cabin.name} - Price {formatCurrency(cabin.price)} - Guests{" "}
              {cabin.maxCapacity}
            </option>
          ))}
        </FormSelect>
      </FormRow>

      <FormRow label={"Guest"} error={errors?.guestId?.message}>
        <FormSelect
          id="guestId"
          disabled={isCreating}
          {...register("guestId", { required: "This field is required" })}>
          {guest?.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.name}
            </option>
          ))}
        </FormSelect>
      </FormRow>

      {/* <FormRow label={"Number of Nights"} error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          disabled={isCreating}
          {...register("numNights", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

      <FormRow label={"Number of Guests"} error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating}
          {...register("numGuests", {
            required: "This field is required",
            min: 1,
            max: {
              value: cabin?.maxCapacity,
              message: `Maximum number of guests is ${setting?.maxBookingLength}`,
            },
          })}
        />
      </FormRow>

      <FormRow label={"Start Date"} error={errors?.startDate?.message}>
        <Input
          type="date"
          {...register("startDate", {
            required: "This field is required",
            min: {
              value: new Date().toISOString().split("T")[0],
            },
            validate: (cur) => {
              if (cur < new Date()) {
                return "Start date cannot be in the past";
              }
            },
          })}
        />
      </FormRow>

      <FormRow label={"End Date"} error={errors?.endDate?.message}>
        <Input
          type="date"
          {...register("endDate", {
            required: "This field is required",
            min: {
              value: new Date().toISOString().split("T")[0],
            },
            validate: (cur) => {
              if (cur < new Date()) {
                return "End date cannot be in the past";
              }
            },
          })}
        />
      </FormRow>

      <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <Checkbox
          checked={addBreakfast}
          id="hasBreakfast"
          onChange={() => setAddBreakfast((addBreakfast) => !addBreakfast)}
          disabled={isCreating}>
          Include breakfast
        </Checkbox>
      </FormRow>

      <FormRow label="Payment" error={errors?.isPaid?.message}>
        <Checkbox
          checked={isPaid}
          id="isPaid"
          onChange={() => setIsPaid((paid) => !paid)}
          disabled={isCreating}>
          Confirm payment
        </Checkbox>
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="text"
          id="observations"
          disabled={isCreating}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
