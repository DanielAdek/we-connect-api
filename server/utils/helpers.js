import path from 'path';
import { config } from 'dotenv';
import JWT from 'jsonwebtoken';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Datauri from 'datauri';
import { cloudinaryConfig } from '../config/cloudinary';

config();

const secret = process.env.SECRET;

const storage = multer.memoryStorage();

/**
 * @desc GENERATE TOKEN FOR AUTHORIZATION
 * @param {String} time THE EXPIRY TIME
 * @param {object} payload THE DATA TO BE CONTAINED IN THE TOKEN
 * @returns {String} JSON
 */
exports.generateToken = (time, payload) => (`Bearer ${JWT.sign(payload, secret, { expiresIn: time })}`);

/**
 * @description This function uploads images to cloudinary
 * @param  {object} file The image uri to be uploaded
 * @param  {object} res http response object
 * @param {object} fields The request body
 * @returns {object} returns the response object cloudinary which contains the image url
 */
exports.imageUpload = async (file) => {
  // INITIALIZES CLOUDINARY LOCAL CONFIGURATIONS
  cloudinaryConfig();
  const result = await cloudinary.v2.uploader.upload(file.content);
  return result;
};

export const multerUploads = multer({ storage }).single('image');

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
const dUri = new Datauri();
exports.dataUri = (req) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
