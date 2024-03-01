'use strict'

import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import companyRoutes from '../src/companies/company.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/interfer/v1/auth';
        this.userPath = '/interfer/v1/users';
        this.companyPath = '/interfer/v1/companies';

        this.middlewares();
        this.connectDB();
        this.routes();
    }
    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }
    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.companyPath, companyRoutes);
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;