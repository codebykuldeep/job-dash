import pg from 'pg';

class Pool{
    _pool = null;

    connect(options){
        this._pool = new pg.Pool(options);
    };
    close(){
        return this._pool.end();
    }
    query(sql,params){
        if(!!params){
            return this._pool.query(sql,[...params])
        }
        return this._pool.query(sql);
    }
}


const db = new Pool();

export default db;
