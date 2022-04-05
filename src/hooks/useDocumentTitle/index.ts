import { useEffect, useRef } from "react";

/**
 * 利用闭包实现了,但是我们看起来不是很直观
 * @param title
 * @param keepOnUnmount
 */
// export function useDocumentTitle(title: string, keepOnUnmount = true) {
//   const oldTitle = document.title;
//   useEffect(() => {
//     document.title = title;
//   }, [title]);

//   useEffect(() => {
//     return () => {
//       if (!keepOnUnmount) {
//         document.title = oldTitle;
//       }
//     };
//   }, []);
// }

/**
 * 利用useRef优化闭包
 * @param title
 * @param keepOnUnmount
 */

export function useDocumentTitle(title: string, keepOnUnmount = true) {
  // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
}
