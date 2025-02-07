export class ApiResponse{
    constructor(status,data,success){
        this.status = status;
        this.data = data;
        this.success = success;
    }
}

export class UserResponse{
    constructor(status,data,success,token){
        this.status = status;
        this.data = data;
        this.success = success;
        this.token = token;
    }
}