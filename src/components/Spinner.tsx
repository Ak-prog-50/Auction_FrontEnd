interface dimensions {
  dimensions?: "lg";
}

const Spinner = ({ dimensions }: dimensions) => {
  return (
    <>
      {dimensions === "lg" ? (
        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
      ) : (
        <div className="animate-spin spinner-border h-5 w-5 border-b-2 rounded-full"></div>
      )}
    </>
  );
};

export default Spinner;
