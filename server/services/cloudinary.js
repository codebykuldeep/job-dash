import { v2 as cloudinary } from 'cloudinary'
import fs from 'node:fs';
import constant from '../constant.js';

cloudinary.config({ 
    cloud_name: constant.CLOUD_NAME, 
    api_key: constant.CLOUD_KEY, 
    api_secret: constant.CLOUD_SECRET
  });


export async function uploadFileToCloudinary(path) {
    try {
        const res = await cloudinary.uploader.upload(
            path,
            {
                folder: "job-dashboard",
                resource_type:'auto'
            },

        );
        try {
            fs.unlinkSync(path)
        } catch (error) {
            console.log('delete',error);

        }
        return res.secure_url;
    } catch (error) {
        try {
            fs.unlinkSync(path)
        } catch (error) {
            console.log('delete',error);

        }
        throw new Error(error.message);
    }

}