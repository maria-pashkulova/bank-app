//Make jsonwebtoken library work with promises instead of callbacks for asynchronous operations
//Extend jsonwebtoken library

import jsonwebtoken from "jsonwebtoken";

export const sign = (payload:object, secret: string, options?: jsonwebtoken.SignOptions): Promise<string> => {
  //new Promise (executor function - gets 2 params resolve и reject)
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, secret, options|| {}, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        resolve(token!);

      }

    });
  });

};

export const verify = (token: string, secret: string): Promise<any> => {
  return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, secret, (err, decoded) => {
          if (err) {
              reject(err);
          } else {
              resolve(decoded);
          }
      });
  });
};
