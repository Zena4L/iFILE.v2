class AppError extends Error {
    public status:string;
    private readonly isOperational:boolean;
    constructor(public message:string , public statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;