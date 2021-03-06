import { stat } from "fs";
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idel" | "success" | "error" | "loading";
}

const defaultInitialState: State<null> = {
  stat: "idel",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise数据类型");
    }
    setState({
      ...state,
      stat: "loading",
    });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        return err;
      })
      .finally(() => {
        //   setState({
        //       ...state,
        //       stat
        //   })
      });
  };

  return {
    isIdel: state.stat === "idel",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
