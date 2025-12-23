import { useFormContext } from "react-hook-form";
import { stepFourSchema } from "../schema/counsellor.schema";
import FormHeader from "../FormHeader";
import CustomDropdown from "../SelectInput";
import { ButtonCallToAction } from "../../../components";

export function StepFour({ nextStep, prevStep }) {
  const {
    setValue,
    watch,
    // getValues,
    // setError,
    // clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    // clearErrors();

    // const stepFourData = {
    //   session_type: getValues("session_type"),
    // };
    // const result = stepFourSchema.safeParse(stepFourData);

    // if (!result.success) {
    //   result.error.issues.forEach((err) => {
    //     setError(err.path[0], { message: err.message });
    //   });
    //   return;
    // }

    const isValid = await trigger(["session_type"]);

    if (!isValid) return;

    nextStep();
  };

  return (
    <>
      <FormHeader
        title="Session Preferences"
        step={4}
        nextStep={nextStep}
        prevStep={prevStep}
      />

      <div className="flex justify-between flex-col  h-[220px] sm:h-[270px]">
        <div className="grid  gap-y-[5px] sm:gap-y-[10px]">
          <CustomDropdown
            placeholder="Session Type"
            options={["Video Session", "Voice Session", "Chat Session"]}
            value={watch("session_type")}
            onChange={(val) => {
              setValue("session_type", val, { shouldValidate: false });
            }}
            width="w-[70%] mx-auto"
            error={errors.session_type?.message}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
