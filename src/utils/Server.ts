import { env } from 'node:process';
import app from '../app';
import mongoose, {ConnectOptions} from "mongoose";

class Server{
    private readonly port:number;
    private readonly dbURL:string;
  
    constructor(port:number , dbURL:string){
      this.port = port;
      this.dbURL = dbURL;
    }
  
    public start():void{
      process.on('uncaughtException', (err:Error) => {
        console.log('Uncaught exceptions...server shutting down 1..2..3');
        console.log(err.name, err.message);
      });
      
      process.on('unhandledRejection', (err: Error) => {
        console.log('Uncaught exceptions...server shutting down 1..2..3');
        console.log(err.name, err.message);
      });
      
     
      const options:ConnectOptions={
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
      }
      
      mongoose.connect(this.dbURL,options).then(() => console.log('DB connection successful!'));
  
      app.listen(this.port, () => {
        console.log(`server is live on port ${this.port}`);
      });
      
    }
  }
  export default Server;