import { useEffect } from "react";

export function useDocumentTitle(title: string, keepOnUnmount = true) {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
}
