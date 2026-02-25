import { Circles } from "react-loader-spinner";

export default function LoaderEl() {
  return (
    <Circles
      height="54"
      width="54"
      color="#3454b4"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
