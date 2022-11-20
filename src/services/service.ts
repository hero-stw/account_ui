/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CartCreate {
  dish_id?: number;
  cart_id?: number;
  quantity?: number;
  user_id?: number;
}

export interface CartDetailResponse {
  dish_id?: number;
  cart_id?: number;
  quantity?: number;
  dish?: DishesResponse;
  id?: number;
}

export interface CartResponse {
  created_at?: string;
  updated_at?: string;
  cart_detail?: CartDetailResponse[];
  id?: number;
  user_id?: number;
}

export interface CartUpdate {
  quantity?: number;
}

export interface CategoryCreate {
  name?: string;
  slug?: string;
  status?: number;
}

export interface CategoryResponse {
  name?: string;
  slug?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  id?: number;
}

export interface CategoryUpdate {
  name?: string;
  slug?: string;
  status?: number;
}

export interface DishesCreate {
  name?: string;
  slug?: string;
  price?: number;
  description?: string;
  content?: string;
  image?: object;
  quantity?: number;
  category_id?: number;
}

export interface DishesResponse {
  name?: string;
  slug?: string;
  price?: number;
  description?: string;
  content?: string;
  image?: string;
  quantity?: number;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  id?: number;
}

export interface DishesUpdate {
  name?: string;
  slug?: string;
  price?: number;
  description?: string;
  content?: string;
  image?: object;
  quantity?: number;
  category_id?: number;
}

export interface FileResponse {
  path?: string;
}

export interface FileUploadRequest {
  file?: object;
}

/**
 * MessageCreate
 * Message request body data
 */
export interface MessageCreate {
  /** @example "Hero" */
  name?: string;
  /** @example "0987654321" */
  phone?: string;
  /** @example "Thank you for being here!" */
  message?: string;
  /** @example 1 */
  confirm?: number;
  /** @example "NT" */
  side?: string;
  /** @example 1 */
  quantity?: number;
}

/**
 * MessageResponse
 * Message response data
 */
export interface MessageResponse {
  id?: number;
  name?: string;
  phone?: string;
  message?: string;
  confirm?: number;
  side?: string;
  quantity?: number;
}

export interface LocationCreate {
  address?: string;
  distance?: number;
}

export interface LocationResponse {
  id?: number;
  address?: string;
  distance?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LocationUpdate {
  address?: string;
  distance?: number;
}

/**
 * User Login Request
 * User Login request body data
 */
export interface UserLogin {
  phone?: string;
  password?: string;
}

/**
 * User register request
 * User register request body data
 */
export interface UserRegister {
  name: string;
  phone?: string;
  password: string;
  password_confirmation?: string;
}

export interface UserResponse {
  name?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  id?: number;
  password?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://order-me-api.herokuapp.com/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Laravel OpenApi
 * @version 1.0.0
 * @license Apache 2.0 (http://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl https://order-me-api.herokuapp.com/api/v1
 * @contact <admin@admin.com>
 *
 * L5 Swagger OpenApi description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  admin = {
    /**
     * @description Returns list of category
     *
     * @tags Category
     * @name GetCategories
     * @summary Get list of category
     * @request GET:/admin/category
     * @secure
     */
    getCategories: (params: RequestParams = {}) =>
      this.request<CategoryResponse, any>({
        path: `/admin/category`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns category data
     *
     * @tags Category
     * @name CreateCategory
     * @summary Create new category
     * @request POST:/admin/category
     * @secure
     */
    createCategory: (data: CategoryCreate, params: RequestParams = {}) =>
      this.request<CategoryResponse, any>({
        path: `/admin/category`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns category data
     *
     * @tags Category
     * @name GetCategoryById
     * @summary Get category information
     * @request GET:/admin/category/{id}
     * @secure
     */
    getCategoryById: (id: number, params: RequestParams = {}) =>
      this.request<CategoryResponse, any>({
        path: `/admin/category/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns updated category data
     *
     * @tags Category
     * @name UpdateCategory
     * @summary Update existing category
     * @request PUT:/admin/category/{id}
     * @secure
     */
    updateCategory: (id: number, data: CategoryUpdate, params: RequestParams = {}) =>
      this.request<CategoryResponse, any>({
        path: `/admin/category/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a record and returns no content
     *
     * @tags Category
     * @name DeleteCategory
     * @summary Delete existing category
     * @request DELETE:/admin/category/{id}
     * @secure
     */
    deleteCategory: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/admin/category/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of dish
     *
     * @tags Dish
     * @name GetDishes
     * @summary Get list of dish
     * @request GET:/admin/dish
     * @secure
     */
    getDishes: (params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/admin/dish`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns dish data
     *
     * @tags Dish
     * @name CreateDish
     * @summary Create new dish
     * @request POST:/admin/dish
     * @secure
     */
    createDish: (data: DishesCreate, params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/admin/dish`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns dish data
     *
     * @tags Dish
     * @name GetDishById
     * @summary Get dish information
     * @request GET:/admin/dish/{id}
     * @secure
     */
    getDishById: (id: number, params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/admin/dish/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns updated dish data
     *
     * @tags Dish
     * @name UpdateDish
     * @summary Update existing dish
     * @request PUT:/admin/dish/{id}
     * @secure
     */
    updateDish: (id: number, data: DishesUpdate, params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/admin/dish/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a record and returns no content
     *
     * @tags Dish
     * @name DeleteDish
     * @summary Delete existing dish
     * @request DELETE:/admin/dish/{id}
     * @secure
     */
    deleteDish: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/admin/dish/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of location
     *
     * @tags Location
     * @name GetLocations
     * @summary Get list of locltion
     * @request GET:/admin/location
     * @secure
     */
    getLocations: (params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/admin/location`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns location data
     *
     * @tags Location
     * @name CreateLocation
     * @summary Create new location
     * @request POST:/admin/location
     * @secure
     */
    createLocation: (data: LocationCreate, params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/admin/location`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns location data
     *
     * @tags Location
     * @name GetLocationById
     * @summary Get location information
     * @request GET:/admin/location/{id}
     * @secure
     */
    getLocationById: (id: number, params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/admin/location/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns updated location data
     *
     * @tags Location
     * @name UpdateLocation
     * @summary Update existing location
     * @request PUT:/admin/location/{id}
     * @secure
     */
    updateLocation: (id: number, data: LocationUpdate, params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/admin/location/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a record and returns no content
     *
     * @tags Location
     * @name DeleteLocation
     * @summary Delete existing location
     * @request DELETE:/admin/location/{id}
     * @secure
     */
    deleteLocation: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/admin/location/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * @description Returns user data
     *
     * @tags User Authenticate
     * @name AuthRegister
     * @summary Create new
     * @request POST:/register
     */
    authRegister: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Login into system
     *
     * @tags User Authenticate
     * @name AuthLogin
     * @summary User Login
     * @request POST:/login
     */
    authLogin: (data: UserLogin, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  me = {
    /**
     * @description Returns a single user.
     *
     * @tags User Authenticate
     * @name GetProfile
     * @summary Get user
     * @request GET:/me
     * @secure
     */
    getProfile: (params: RequestParams = {}) =>
      this.request<
        UserResponse,
        {
          /** @example "Unauthenticated." */
          message?: string;
        }
      >({
        path: `/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * @description logout
     *
     * @tags User Authenticate
     * @name AuthLogout
     * @summary Logout
     * @request POST:/logout
     * @secure
     */
    authLogout: (params: RequestParams = {}) =>
      this.request<
        any,
        {
          /** @example "Unauthenticated." */
          message?: string;
        }
      >({
        path: `/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  client = {
    /**
     * @description Returns list of Cart
     *
     * @tags Cart
     * @name GetCartByUserId
     * @summary Get list of Cart
     * @request GET:/client/cart/{id}
     * @secure
     */
    getCartByUserId: (id: number, params: RequestParams = {}) =>
      this.request<CartResponse, any>({
        path: `/client/cart/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns updated cart data
     *
     * @tags Cart
     * @name UpdateCart
     * @summary Update existing cart
     * @request PUT:/client/cart/{id}
     * @secure
     */
    updateCart: (id: number, data: CartUpdate, params: RequestParams = {}) =>
      this.request<CartResponse, any>({
        path: `/client/cart/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a record and returns no content
     *
     * @tags Cart
     * @name DeleteCart
     * @summary Delete existing cart
     * @request DELETE:/client/cart/{id}
     * @secure
     */
    deleteCart: (id: number, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/client/cart/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns cart data
     *
     * @tags Cart
     * @name AddToCart
     * @summary Add products to cart
     * @request POST:/client/cart
     * @secure
     */
    addToCart: (data: CartCreate, params: RequestParams = {}) =>
      this.request<CartResponse, any>({
        path: `/client/cart`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete multiple record and returns no content
     *
     * @tags Cart
     * @name DeleteCartMultiple
     * @summary Delete existing cart
     * @request POST:/client/cart/deleteMultiple
     * @secure
     */
    deleteCartMultiple: (
      query: {
        /** Cart id */
        "cartIds[]": number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/client/cart/deleteMultiple`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of category
     *
     * @tags CategoryClient
     * @name GetClientCategories
     * @summary Get list of category
     * @request GET:/client/category
     */
    getClientCategories: (params: RequestParams = {}) =>
      this.request<CategoryResponse, any>({
        path: `/client/category`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of dish
     *
     * @tags DishClient
     * @name GetClientDishes
     * @summary Get list of dish
     * @request GET:/client/dish
     */
    getClientDishes: (params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/client/dish`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns dish data
     *
     * @tags DishClient
     * @name GetClientDishById
     * @summary Get dish information
     * @request GET:/client/dish/{id}
     */
    getClientDishById: (id: number, params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/client/dish/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns dish data
     *
     * @tags DishClient
     * @name GetClientDishByCategory
     * @summary Get dish information
     * @request GET:/client/dish/by-category/{id}
     */
    getClientDishByCategory: (id: number, params: RequestParams = {}) =>
      this.request<DishesResponse, any>({
        path: `/client/dish/by-category/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns list of location
     *
     * @tags LocationClient
     * @name GetClientLocations
     * @summary Get list of locltion
     * @request GET:/client/location
     */
    getClientLocations: (params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/client/location`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns location data
     *
     * @tags LocationClient
     * @name GetClientLocationById
     * @summary Get location information
     * @request GET:/client/location/{id}
     */
    getClientLocationById: (id: number, params: RequestParams = {}) =>
      this.request<LocationResponse, any>({
        path: `/client/location/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  heroWedding = {
    /**
     * @description Returns list of Message
     *
     * @tags Hero Wedding Message
     * @name HeroGetMessages
     * @summary Get list of Message
     * @request GET:/hero-wedding/message
     */
    heroGetMessages: (params: RequestParams = {}) =>
      this.request<MessageResponse, any>({
        path: `/hero-wedding/message`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns message data
     *
     * @tags Hero Wedding Message
     * @name HeroAddMessage
     * @summary Create new message
     * @request POST:/hero-wedding/message
     */
    heroAddMessage: (data: MessageCreate, params: RequestParams = {}) =>
      this.request<MessageResponse, any>({
        path: `/hero-wedding/message`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
