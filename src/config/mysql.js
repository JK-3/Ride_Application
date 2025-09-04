// import mysql from 'mysql2';

// const mySqlPool = mysql.createPool({
//     host : 'localhost',
//     user : 'root',
//     password : '1234',
//     database : 'ride_app_demo_node'
// });

// const checkMySqlConnection = () => {
//     return new Promise((resolve, reject)=>{
//         mySqlPool.query('SELECT 1', (err, results)=>{
//             if(err){
//                 reject(err);
//             }
//             else{
//                 console.log("MYSQL Connected");
//                 resolve(results);
//             }
//         })
//     })
// }

// export { mySqlPool, checkMySqlConnection };



import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'ride_app_demo_node',
    'root',
    '1234',
    {
        host : 'localhost',
        dialect : 'mysql',
        logging : true
    }
);

const checkMySqlConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected using Sequelize');
    } catch (error) {
        throw error
    }
}

const syncSqlDatabase = async () => {
    try {
        await sequelize.sync({force : false});
        console.log('MySQL database synchronized successfully.');
    } catch (error) {
        throw error
    }
}

export {sequelize, checkMySqlConnection, syncSqlDatabase};