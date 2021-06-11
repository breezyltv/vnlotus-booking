export const backendErrorMessages = (errors: string[]): JSX.Element | null => {
  //console.log(errors);
  if (!errors || errors === undefined) return null;
  return (
    <>
      {errors &&
        errors.map((error, idx) => (
          <>
            <span key={idx}>{error}</span>
            <br />
          </>
        ))}
    </>
  );
};
