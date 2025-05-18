require('dotenv').config()
import express from 'express';
import { Response, Request } from "express"
import fileUpload from "express-fileupload";
import compression from 'compression';
import cors from "cors"
import path from 'path';
import userRouter from './src/router/user.router';
import pageRouter from './src/router/page.router';
import clashRouter from './src/router/clash.router';

const app = express();
const port = process.env.PORT || 9002;

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(express.static('public'));
// @ts-ignore
app.use(fileUpload({
  createParentPath: true
}));
// @ts-ignore
app.use(compression());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Backend boilerplate');
});

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from Backend boilerplate');
});
// All router here
app.use('/api/user', userRouter)
app.use('/api/clash', clashRouter);

app.use('/api/page', pageRouter)

const localImages = process.env.ENV && process.env.ENV == "development" ? './public' : '../public'
app.use('/public', express.static(path.join(__dirname, localImages)));

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
