import { Circles } from "react-loader-spinner";
import styles from "./LoaderEl.module.css";

interface LoaderProps {
  height?: number;
  width?: number;
}
export default function LoaderEl({ height, width }: LoaderProps) {
  return (
    <Circles
      height={height ? height : 54}
      width={width ? width : 54}
      color="#3454b4"
      ariaLabel="circles-loading"
      wrapperClass={styles.loaderEl}
      visible={true}
    />
  );
}
