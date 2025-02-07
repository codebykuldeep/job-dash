import db from "../db/db.js";
import { extractDataForMessageSaving } from "../utils/utils.js";

export async function getListForUser(id){
    const res = await db.query(`SELECT * FROM chat_room INNER JOIN employers ON chat_room.emp_id = employers.emp_id AND chat_room.user_id = $1 ;`,[id])
    return res.rows;
}

export async function getListForEmployer(id){
    const res = await db.query(`SELECT * FROM chat_room INNER JOIN users ON chat_room.user_id = users.user_id AND chat_room.emp_id = $1 ;`,[id])
    return res.rows;
}

export async function writeNewMessage(sender,reciever,content,room_id) {
    const {user_id,role,emp_id} = extractDataForMessageSaving(sender,reciever);
    const res = await db.query('INSERT INTO messages(user_id , emp_id , sender , content , room_id) VALUES($1 ,$2 ,$3 ,$4 , $5);',[user_id,emp_id,role,content,room_id])
    return res;
}

export async function getChatsByRoomId(room_id){
    const res = await db.query('SELECT * from messages WHERE room_id = $1 ORDER BY created_at ASC;',[room_id])
    return res.rows;
}

