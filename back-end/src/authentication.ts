import * as express from 'express';

export function expressAuthentication(
  _request: express.Request,
  _securityName: string,
  _scopes: string[],
) {
  return Promise.resolve({});
}