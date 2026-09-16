/**
 * Hand-written placeholder that mirrors the shape of `openapi-typescript` output.
 * It covers only the auth/profile endpoints (an example OTP contract) so the
 * scaffold type-checks before the backend exposes an OpenAPI document.
 * Once it does, run `yarn generate:api` and never edit this file by hand again.
 */

export interface paths {
  "/auth/send-otp": {
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["SendOtpRequest"];
        };
      };
      responses: {
        204: {
          headers: { [name: string]: unknown };
          content?: never;
        };
        400: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
      };
    };
  };
  "/auth/verify-otp": {
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["VerifyOtpRequest"];
        };
      };
      responses: {
        200: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["AuthSession"];
          };
        };
        400: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
        401: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
      };
    };
  };
  "/auth/refresh": {
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["RefreshRequest"];
        };
      };
      responses: {
        200: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["AuthTokens"];
          };
        };
        401: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
      };
    };
  };
  "/auth/logout": {
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        204: {
          headers: { [name: string]: unknown };
          content?: never;
        };
        401: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
      };
    };
  };
  "/users/me": {
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        200: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        401: {
          headers: { [name: string]: unknown };
          content: {
            "application/json": components["schemas"]["ApiError"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    SendOtpRequest: {
      phone: string;
      client: "mobile" | "web";
    };
    VerifyOtpRequest: {
      phone: string;
      code: string;
    };
    RefreshRequest: {
      refreshToken: string;
    };
    AuthTokens: {
      accessToken: string;
      refreshToken: string;
    };
    AuthSession: {
      accessToken: string;
      refreshToken: string;
      user: components["schemas"]["User"];
      isNewUser: boolean;
    };
    User: {
      id: string;
      phoneNumber: string;
      displayName: string | null;
      avatar: string | null;
      appLanguage: "ru" | "en" | null;
    };
    ApiError: {
      code: string;
      message: string;
      details?: Record<string, unknown>;
    };
  };
}
