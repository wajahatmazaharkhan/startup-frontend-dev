export const applyZodErrors = (zodError, setError) => {
  const formatted = zodError.format();

  Object.entries(formatted).forEach(([field, value]) => {
    if (field === "_errors") return;

    if (value?._errors?.length) {
      setError(field, {
        type: "manual",
        message: value._errors[0], // show first error
      });
    }
  });
};
