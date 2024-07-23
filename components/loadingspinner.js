import { useTheme } from "next-themes";
import { FidgetSpinner } from "react-loader-spinner";

export default function LoadingSpinner() {
  const { theme } = useTheme();
  return (
    <div className="flex h-screen items-center justify-center">
      {theme === "dark" ? (
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          backgroundColor="white"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      ) : (
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          backgroundColor="black"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      )}
    </div>
  );
}
