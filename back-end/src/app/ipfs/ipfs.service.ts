import { uploadFile } from "@providers"
import { OutputUpload } from "./ipfs"

export class IpfsService {
    /**
   * Uploads an image to a remote server.
   * @param {Buffer} imageBuffer - The image buffer to upload.
   * @returns {Promise<OutputUpload>} A promise that resolves to an object containing information about the uploaded image.
   */
  public async uploadImage(imageBuffer: Buffer): Promise<OutputUpload> {
    const cid = await uploadFile(imageBuffer)

    return cid
  }

//   public async getImageDetails(cid: string): Promise<any> {
//   }
}
