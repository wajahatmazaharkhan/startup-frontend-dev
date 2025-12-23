import InputField from "../InputField";
import FormHeader from "../FormHeader";
import { ButtonCallToAction } from "../../../components";
import { useFormContext } from "react-hook-form";
// import { stepTwoSchema } from "../schema/counsellor.schema";
import { TextareaField } from "../TextareaField";

export function StepTwo({ nextStep, prevStep }) {
  const {
    register,
    // getValues,
    // setError,
    // clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    // clearErrors();

    // const stepTwoData = {
    //   counselling_type: getValues("counselling_type"),
    //   specialties: getValues("specialties"),
    //   years_experience: getValues("years_experience"),
    //   bio: getValues("bio"),
    // };

    // const result = stepTwoSchema.safeParse(stepTwoData);
    // console.log(getValues());
    // console.log("ZOD RESULT:", result);

    // if (!result.success) {
    //   result.error.issues.forEach((err) => {
    //     setError(err.path[0], {
    //       type: "manual",
    //       message: err.message,
    //     });
    //   });
    //   return;
    // }

    const isValid = await trigger([
      "counselling_type",
      "specialties",
      "years_experience",
      "bio",
    ]);

    if (!isValid) return;

    nextStep();
  };

  return (
    <>
      <FormHeader
        title="Professional Details"
        step={2}
        nextStep={nextStep}
        prevStep={prevStep}
      />
      <div className="flex justify-between flex-col  h-[220px] sm:h-[270px]">
        <div className="grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[5px] sm:gap-y-[10px] ">
          <div className="flex flex-col gap-[5px] sm:gap-[10px]">
            <InputField
              type="text"
              placeholder="Counselling Type"
              {...register("counselling_type")}
              error={errors.counselling_type?.message}
            />

            <InputField
              type="text"
              placeholder="Specialties"
              {...register("specialties")}
              error={errors.specialties?.message}
            />

            <InputField
              type="number"
              placeholder="Years of Experience"
              {...register("years_experience", { valueAsNumber: true })}
              error={errors.years_experience?.message}
            />
          </div>
          {/* <textarea
            type="text"
            placeholder="Bio"
            className=" px-[10px] py-[5px] text-xs sm:text-sm sm:px-3 sm:py-2  border border-[#8473E8] rounded-lg focus:ring-2 focus:ring-[#8473E8] placeholder-[ rgba(0, 0, 0, 0.54)] truncate"
            {...register("bio")}
          />
          <p className="error">{errors.bio?.message}</p> */}
          <TextareaField
            placeholder="Bio"
            {...register("bio")}
            error={errors.bio?.message}
          />
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
