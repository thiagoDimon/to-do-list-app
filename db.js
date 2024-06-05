import * as SQLite from 'expo-sqlite';
const DATABASE_NAME = "database.sqlite";
const SQL_CREATE_ENTRIES = `
    create table if not exists tarefas 
    (id integer primary key autoincrement not null, 
    descricao text not null, 
    situacao text not null);
`;
let _db = null;
export default function openDB() {
    if (!_db) {
        _db = SQLite.openDatabaseSync(DATABASE_NAME);
        _db.withTransactionSync(() => {
            _db.execSync(SQL_CREATE_ENTRIES);
        });
    }
    return _db;
}