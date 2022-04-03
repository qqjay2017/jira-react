import { apiBaseUrl } from "constant";
import request from "superagent";
import { cleanObject } from "utils";

const superagentNoCache: () => request.Plugin = () => {
  return (_request) => {
    _request.set("X-Requested-With", "XMLHttpRequest");
    _request.set("Expires", "-1");
    _request.set(
      "Cache-Control",
      "no-cache,no-store,must-revalidate,max-age=-1,private"
    );

    return _request;
  };
};

const superagentPrefix: (prefix: string) => request.Plugin = (prefix) => {
  return (_request) => {
    if (_request.url[0] === "/") {
      _request.url = `${prefix}${_request.url}`;
    }

    return _request;
  };
};

export class API {
  invoke<T>(
    method: string,
    url: string,
    data?: Record<string | symbol, unknown>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const instance = request(method, url)
        .use(superagentNoCache())
        .use(superagentPrefix(apiBaseUrl || "/api"));

      if (data) {
        if (method.toUpperCase() === "GET") {
          instance.query(cleanObject(data));
        } else {
          instance.send(cleanObject(data));
        }
      }

      instance
        .then((res) => {
          resolve(res.body);

          return res.body;
        })

        .catch((err) => {
          // // if we get unauthorized, kick out the user
          // if (err.status === 401 && localStorage.getItem("userLoggedIn")) {
          //   if (window.location.pathname !== "/") {
          //     localStorage.setItem("redirect-path", window.location.pathname);
          //   }

          //   // Refresh the whole page to ensure cache is clear
          //   // and we dont end on an infinite loop
          //   window.location.href = "/login";
          //   return;
          // }
          reject(err);
          //   return this.onError(err);
        });

      //   return instance;
    });
  }

  onError(err: any) {
    // console.log(err)
    // if (err.status) {
    //   const errMessage = get(
    //     err.response,
    //     "body.message",
    //     `Error ${err.status.toString()}`
    //   );
    //   let detailedMessage = get(err.response, "body.detailedMessage", "");
    //   if (errMessage === detailedMessage) {
    //     detailedMessage = "";
    //   }
    //   const capMessage =
    //     errMessage.charAt(0).toUpperCase() + errMessage.slice(1);
    //   const capDetailed =
    //     detailedMessage.charAt(0).toUpperCase() + detailedMessage.slice(1);
    //   const throwMessage: ErrorResponseHandler = {
    //     errorMessage: capMessage,
    //     detailedError: capDetailed,
    //   };
    //   return Promise.reject(throwMessage);
    // } else {
    //   clearSession();
    //   window.location.href = "/login";
    // }
  }
}

const api = new API();
export default api;
