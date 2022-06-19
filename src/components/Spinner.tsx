interface dimensions {
  dimensions?: number;
}

const Spinner = ({ dimensions }: dimensions) => {
  return (
    <div
      className={`animate-spin spinner-border h-${dimensions || "5"} w-${dimensions || "5"} border-b-2 rounded-full`}
    ></div>
  );
};

export default Spinner;
