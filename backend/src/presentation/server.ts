import express, { Router } from 'express'
import cors from 'cors'

interface Options { 
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    public readonly app = express();
    private serverListener? : any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {
    
        //* Middlewares
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

        //* CORS Configuration
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        
        //* Public Folder
        this.app.use( express.static( this.publicPath ) );
    
        //* Routes
        this.app.use( this.routes );
    
        this.serverListener = this.app.listen(this.port, () => {
          console.log(`Server running on port ${ this.port }`);
        });
    
      }
    
      public close() {
        this.serverListener?.close();
      }
}