import { NextFunction, Request, Response } from 'express';
import { web3 } from '@providers';
import { onError, Constant, logger } from '@constants';
const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;

const SignatureMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { authorize } = req.headers;
    if (!authorize) {
      return res
        .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
        .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
    }
    authorize = authorize as string;
    const [message, signature] = authorize.split(':');
    const address = web3.eth.accounts.recover(message, signature);
    req.headers.address = address.toLowerCase();
    req.headers.signature = signature;
    return next();
  } catch (error) {
    logger.error(error);
    return res
      .status(NETWORK_STATUS_CODE.UNAUTHORIZED)
      .json(onError(NETWORK_STATUS_MESSAGE.UNAUTHORIZED));
  }
};

export { SignatureMiddleware };
