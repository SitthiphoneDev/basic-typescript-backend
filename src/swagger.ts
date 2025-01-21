import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Management API Mobile App CS',
            version: '1.0.0',
            description: 'API documentation for Product Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://ecommerce-app-hv1l.onrender.com',  // Your Render URL
                description: 'Production server',
            }
        ],
    },
    apis: ['./src/router/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options);