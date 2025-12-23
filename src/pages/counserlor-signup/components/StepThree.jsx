import InputField from "../InputField";
import FormHeader from "../FormHeader";
import { ButtonCallToAction } from "../../../components";
import { useFormContext } from "react-hook-form";
import { stepThreeSchema } from "../schema/counsellor.schema";

export function StepThree({ nextStep, prevStep }) {
  const {
    register,
    // getValues,
    // setError,
    // clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    // console.log("HANDLE NEXT CALLED");
    // clearErrors();
    // const stepThreeData = {
    //   availability: getValues("availability"),
    //   hourly_rate: getValues("hourly_rate"),
    // };
    // const result = stepThreeSchema.safeParse(stepThreeData);

    // if (!result.success) {
    //   result.error.issues.forEach((err) => {
    //     setError(err.path[0], { message: err.message });
    //   });
    //   return;
    // }

    const isValid = await trigger(["availability", "hourly_rate"]);

    if (!isValid) return;

    nextStep();
  };
  return (
    <>
      <FormHeader
        title="Availability & Pricing"
        step={3}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col  h-[220px] sm:h-[270px]">
        <div className="grid  gap-y-[5px] sm:gap-y-[10px]">
          <InputField
            type="text"
            placeholder="Availability"
            width="w-[70%] mx-auto"
            {...register("availability")}
            error={errors.availability?.message}
          />

          <InputField
            type="number"
            placeholder="Pricing"
            width="w-[70%] mx-auto"
            {...register("hourly_rate", { valueAsNumber: true })}
            error={errors.hourly_rate?.message}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
