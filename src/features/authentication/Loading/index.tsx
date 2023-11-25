import { ReactNode } from "react";

export type LoadingProps = {
  children?: ReactNode;
  isLoading?: boolean;
};

const Loading = (props: LoadingProps) => {
  if (!props.children) {
    return <Animation />;
  }

  const opacityContent = (isLoading: boolean) => {
    if (isLoading) {
      return "opacity-60";
    }

    return "";
  };

  const showAnimation = (isLoading: boolean) => {
    if (isLoading) {
      return {};
    }

    return {
      display: "none",
    };
  };

  return (
    <div className="relative">
      <div className={opacityContent(props.isLoading == true)}>
        {props.children}
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 grid place-items-center"
        style={showAnimation(props.isLoading == true)}
      >
        <Animation />
      </div>
    </div>
  );
};

const Animation = () => {
  return (
    <svg
      role="status"
      className="animate-spin h-8 w-8 rounded-full border-4 border-solid border-gray-500 border-r-transparent"
    />
  );
};

export default Loading;
