import { Dna } from "react-loader-spinner";

export default function DnaLoading({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  return (
    <Dna
      height={height}
      width={width}
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
}
