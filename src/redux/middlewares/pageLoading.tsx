import { ComponentType, Suspense, useEffect, useState } from "react";
import Loading from "../../assets/images/apps/loading.gif";
type ReturnType<T> = (props: T) => JSX.Element;

export const PageLoading = <T extends object>(
  Component: ComponentType<T>
): React.FC<T> => {
  const WrappedComponent = (props: T) => {
    return (
      <Suspense
        fallback={
          <div className="d-flex w-100 align-items-center justify-content-center">
            <img src={Loading} className="w-25" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

  WrappedComponent.displayName = `WithLoading(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
