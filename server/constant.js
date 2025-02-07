import env from 'dotenv';
import process from 'node:process'

env.config();


const constant ={
    PORT:process.env.PORT,
    JWT_SECRET:'HELLO WORLD',
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_KEY:process.env.CLOUD_KEY,
    CLOUD_SECRET:process.env.CLOUD_SECRET,
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS :process.env.NODE_PASS,
};

export const ADMIN ={
    name:"ADMIN",
    email:'admin@email.com',
    password:'',
    role:'admin'
}

export const DB_CRED ={
    PGHOST:process.env.PGHOST,
    PGDATABASE:process.env.PGDATABASE,
    PGUSER:process.env.PGUSER,
    PGPASSWORD:process.env.PGPASSWORD,
}


export default constant;