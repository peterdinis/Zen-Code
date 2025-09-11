"use client";

import { store } from "@/redux/store";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

type ReduxProviderProps = {
  children?: ReactNode;
};

const ReduxProvider: FC<ReduxProviderProps> = ({
  children,
}: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
