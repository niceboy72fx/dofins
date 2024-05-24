export class StorageUtil {

    static persistLocalStorage(nameTable, value){
        localStorage.setItem(nameTable, value);
    }

    static updateLocalStorage(nameTable,  value){
        localStorage.setItem(nameTable, value);
    }

    static deleteLocalStorage(nameTable){
        localStorage.deleteLocalStorage(nameTable)
    }

    static getDataLocalStorage(nameTable){
        return localStorage.getItem(JSON.stringify(nameTable));
    }

}