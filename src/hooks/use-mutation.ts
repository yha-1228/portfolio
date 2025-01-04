import { useReducer } from "react";
import { type AnyAsyncFunction } from "@/types/utils";
import { assertNever } from "@/utils/assert-never";

interface UseMutationProps<TAction extends AnyAsyncFunction> {
  fn: TAction;
  onSuccess?: (
    result: Awaited<ReturnType<TAction>>,
    ...args: Parameters<TAction>
  ) => void;
  onError?: (error: unknown, ...args: Parameters<TAction>) => void;
}

type UseMutationState =
  | {
      pending: true;
      loading: false;
      isSuccess: false;
      isError: false;
      error: undefined;
    }
  | {
      pending: false;
      loading: true;
      isSuccess: false;
      error: undefined;
      isError: false;
    }
  | {
      pending: false;
      loading: false;
      isSuccess: true;
      isError: false;
      error: undefined;
    }
  | {
      pending: false;
      loading: false;
      isSuccess: false;
      isError: true;
      error: unknown;
    };

type Action =
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; error: unknown }
  | { type: "reset" };

function reducer(_: UseMutationState, action: Action): UseMutationState {
  switch (action.type) {
    case "loading": {
      return {
        pending: false,
        loading: true,
        isSuccess: false,
        isError: false,
        error: undefined,
      };
    }

    case "success": {
      return {
        pending: false,
        loading: false,
        isSuccess: true,
        isError: false,
        error: undefined,
      };
    }

    case "error": {
      return {
        pending: false,
        loading: false,
        isSuccess: false,
        isError: true,
        error: action.error,
      };
    }

    case "reset": {
      return {
        pending: true,
        loading: false,
        isSuccess: false,
        isError: false,
        error: undefined,
      };
    }

    default:
      return assertNever(action);
  }
}

function useMutation<TAction extends AnyAsyncFunction>(
  props: UseMutationProps<TAction>,
) {
  const { fn, onSuccess, onError } = props;
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    pending: true,
    loading: false,
    isSuccess: false,
    isError: false,
    error: undefined,
  });

  const handleAction = async (...args: Parameters<TAction>) => {
    dispatch({ type: "loading" });

    try {
      const result = await fn(args);
      onSuccess?.(result, ...args);
      dispatch({ type: "success" });
    } catch (error) {
      onError?.(error, ...args);
      dispatch({ type: "error", error });
    }
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return [state, handleAction, handleReset] as const;
}

export { useMutation };
export type { UseMutationProps, UseMutationState };
