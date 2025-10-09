import {v2} from 'cloudinary'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dtgpekr8p', 
        api_key: '411649592573355', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
}