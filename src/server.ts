import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';

import { requestIntercepter } from './utils/requestintercepter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.all('*', requestIntercepter);


app.use('/', userRoutes);
app.use('/admin', adminRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, ()=> {
        console.log(`🚀️ Running at PORT ${port}`);
    })
}

const devServer = http.createServer(app);
if(process.env.NODE_ENV === 'production'){
    //TODO: configurar SSL
    //TODO: rodar server na 80 e na 443
}else{
    const serverPort: number = process.env.PORT? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, devServer);
}

