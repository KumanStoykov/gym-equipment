const envConfig = {
        development: {
                PORT: process.env.PORT || 3000,
                DB_CONNECTION_STRING: 'mongodb://localhost:27017/gymEquipment',
                COOKIE_TOKEN_NAME: 'X-Authorization',
                SECRET: process.env.SECRET,
                ROUND_SALT: 9,
                CORS: {
                        origin: ['http://localhost:4200'],
                        credentials: true
                },
                CLOUDINARY: {
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                }
        },
        production: {
                PORT: process.env.PORT || 80,
                DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
                COOKIE_TOKEN_NAME: 'X-Authorization',
                SECRET: process.env.SECRET,
                ROUND_SALT: 9,
                CORS: {
                        origin: ['https://gym-equipment.onrender.com/'],
                        credentials: true
                },
                CLOUDINARY: {
                        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                        api_key: process.env.CLOUDINARY_API_KEY,
                        api_secret: process.env.CLOUDINARY_API_SECRET,
                }
        }


}

module.exports = envConfig[process.env.NODE_ENV || 'development'];