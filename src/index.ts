import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import { ProductRoutes } from './routes';
import swaggerDocument from "./documentation/swagger.json";

const app = express();
const port = 8080;

app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-project-at");
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/products', ProductRoutes);

app.get('/', (req: Request, res: Response) => { res.send('Explore APIs') })
app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) })