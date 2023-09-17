import { BallTriangle } from "react-loader-spinner";

export default function LoadingModal() {
  return (
    <div className="absolute bg-opacity-80 bg-stone-800 z-10 w-full h-full flex justify-center items-center">
      <BallTriangle
        height={250}
        width={250}
        radius={5}
        color="#fff"
        ariaLabel="ball-triangle-loading"
      />
    </div>
  );
}
