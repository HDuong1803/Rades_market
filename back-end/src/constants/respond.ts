import { logger, Constant } from '@constants';
type SuccessResponse<T> = {
  data: T | any;
  message: string;
  success: boolean;
  count: number;
  total: number;
};

type ErrorResponse = {
  message: string;
  success: boolean;
};
type OptionResponse<T> = SuccessResponse<T> | ErrorResponse;

function onError(error: any, message?: string): ErrorResponse {
  let msg = null;
  if (typeof error == 'object') {
    logger.error(error);
    msg = error.message;
  } else {
    msg = error;
  }
  return {
    message: msg || message || Constant.NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR,
    success: false,
  };
}

function onSuccess<T>(data?: T, total: number = 1): SuccessResponse<T> {
  return {
    data: data || null,
    success: true,
    message: Constant.NETWORK_STATUS_MESSAGE.SUCCESS,
    count: data ? (typeof data == 'object' && 'length' in data ? (data as any).length : 1) : 0,
    total,
  };
}

function onSuccessArray<T>(data: T[], total: number = 1): SuccessResponse<T[]> {
  if (data && data.length != 0) {
    return {
      data,
      success: true,
      message: Constant.NETWORK_STATUS_MESSAGE.SUCCESS,
      count: data.length,
      total,
    };
  }
  return {
    data: [],
    success: true,
    message: Constant.NETWORK_STATUS_MESSAGE.EMPTY,
    count: 0,
    total: 0,
  };
}

export { onError, onSuccess, onSuccessArray, OptionResponse };
