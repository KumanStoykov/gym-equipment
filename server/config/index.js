const envConfig = {
        development: {
                PORT: process.env.PORT || 3000,
                DB_CONNECTION_STRING: 'mongodb://localhost:27017/gymEquipment',
                COOKIE_TOKEN_NAME: 'X-Authorization',
                SECRET: 'fasdf;j34erj23221342fdsf2342',
                ROUND_SALT: 9,
                CORS: {
                        origin: ['http://localhost:4200'],
                        credentials: true
                },
                CLOUDINARY: {
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        api_name: process.env.CLOUDINARY_CLOUD_NAME,
                }
        },
        production: {
                PORT: process.env.PORT || 3000,
                DB_CONNECTION_STRING: 'mongodb://localhost:27017/gymEquipment',
                COOKIE_TOKEN_NAME: 'X-Authorization',
                SECRET: process.env.SECRET,
                ROUND_SALT: 9,
                CORS: {
                        origin: [''],
                        credentials: true
                },
                CLOUDINARY: {
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                        api_name: process.env.CLOUDINARY_CLOUD_NAME,
                }
        }


}

module.exports = envConfig[process.env.NODE_ENV || 'development'];