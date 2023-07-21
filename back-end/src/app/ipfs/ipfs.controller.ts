import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { uploadFile, uploadJson } from '@providers';
import { 
  Body, 
  Controller, 
  // Get, 
  Middlewares, 
  Post, Route, 
  Security, 
  Tags, 
  UploadedFile 
} from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('ipfs')
@Route('ipfs')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class IpfsController extends Controller {
  @Post('upload-image')
  public async uploadImage(
    @UploadedFile()
    imageFile: Express.Multer.File,
  ): Promise<OptionResponse<String>> {
    try {
      const imageIPFS = await uploadFile(imageFile.buffer);
      return onSuccess(`${process.env.IPFS_GATEWAY_URI}${imageIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('upload-json')
  public async uploadJson(@Body() body: any): Promise<OptionResponse<String>> {
    try {
      const jsonIPFS = await uploadJson(body);
      return onSuccess(`${process.env.IPFS_GATEWAY_URI}${jsonIPFS.path}`);
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get('image-detail')
  // public async imageDetail(
  //   @Body() cid: string
  // ): Promise<OptionResponse<String>> {
  //   try {
  //     const imageDetails = await Singleton.getIpfsInstance.getImageDetails(cid);
  //     return onSuccess(JSON.stringify(imageDetails));
  //   } catch (error) {
  //     logger.error(error);
  //     return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
  //   }
  // }
}
