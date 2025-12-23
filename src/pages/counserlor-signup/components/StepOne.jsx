import { useFormContext } from "react-hook-form";
import InputField from "../InputField";
import FormHeader from "../FormHeader";
import CustomDropdown from "../SelectInput";
import { ButtonCallToAction } from "../../../components";
// import { stepOneSchema } from "../schema/counsellor.schema";
// import { CloudHail } from "lucide-react";

export function StepOne({ nextStep }) {
  const {
    register,
    setValue,
    watch,
    // getValues,
    // setError,
    // clearErrors,
    // trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    // console.log("HANDLE NEXT CALLED");
    // clearErrors();

    // const stepOneData = {
    //   fullname: getValues("fullname"),
    //   dob: getValues("dob"),
    //   phone_number: getValues("phone_number"),
    //   gender: getValues("gender"),
    //   email: getValues("email"),
    //   languages: getValues("languages"),
    //   password: getValues("password"),
    //   timezone: getValues("timezone"),
    // };

    // const result = stepOneSchema.safeParse(stepOneData);
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

    // const isValid = await trigger([
    //   "fullname",
    //   "dob",
    //   "phone_number",
    //   "gender",
    //   "email",
    //   "languages",
    //   "password",
    //   "timezone",
    // ]);

    // if (!isValid) return;

    nextStep();
  };

  return (
    <>
      <FormHeader nextStep={nextStep} />
      <div className="flex justify-between flex-col h-[220px] sm:h-[270px]">
        <div className="grid grid-cols-2 gap-x-[30.5px] sm:gap-x-[60px] gap-y-[5px] sm:gap-y-[10px]">
          <InputField
            placeholder="Full Name"
            {...register("fullname")}
            error={errors.fullname?.message}
          />

          <InputField
            type="date"
            placeholder="DOB"
            {...register("dob")}
            error={errors.dob?.message}
            max={new Date().toISOString().split("T")[0]} // prevent future dates
            className="px-3 py-2 border border-[#8473E8] rounded-lg
             focus:ring-2 focus:ring-[#8473E8]
             text-[12px] text-black/70 cursor-pointer"
          />

          <InputField
            type="tel"
            placeholder="Phone"
            {...register("phone_number")}
            error={errors.phone_number?.message}
          />

          <CustomDropdown
            placeholder="Gender"
            options={["Male", "Female", "Prefer Not To Say"]}
            value={watch("gender")}
            onChange={(val) =>
              setValue("gender", val, { shouldValidate: true })
            }
            error={errors.gender?.message}
          />

          <InputField
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />

          <CustomDropdown
            placeholder="Language"
            options={["English", "Hindi"]}
            value={watch("languages")}
            onChange={(val) =>
              setValue("languages", val, { shouldValidate: true })
            }
            error={errors.languages?.message}
          />

          <InputField
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />

          <CustomDropdown
            placeholder="Time Zone"
            options={["GMT +5:30"]}
            value={watch("timezone")}
            onChange={(val) =>
              setValue("timezone", val, { shouldValidate: true })
            }
            error={errors.timezone?.message}
          />
        </div>
        <p className="text-center  text-xs sm:text-sm mt-2 pb-1 sm:pb-2 cursor-default font-light  leading-[10px] text-black/54">
          Already have an account?{" "}
          <span className="text-[#8473E8] cursor-pointer underline underline-offset-2">
            Login
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center mt-4">
        <ButtonCallToAction content="Continue" handlClick={handleNext} />
      </div>
    </>
  );
}
