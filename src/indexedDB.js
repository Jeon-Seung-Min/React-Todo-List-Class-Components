const indexedDB = {
  connect: () => {
    return new Promise((resolve, reject) => {
      if(!window.indexedDB) {
        reject(new Error("Your browser doesn't support a stable version of IndexedDB."));
      }

      let request = window.indexedDB.open("todoListDB", 1);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(new Error(event.target.error.message));
      };

      request.onupgradeneeded = (event) => {
        let db = event.target.result;
        db.createObjectStore("todos", {
          keyPath: "index",
          autoIncrement: true
        });
      };
    });
  },
  getTodos: (db) => {
    return new Promise((resolve, reject) => {
      let store = db
        .transaction("todos")
        .objectStore("todos");

      store.getAll().onsuccess = (event) => {
        let todos = event.target.result;
        if(todos) {
          resolve(todos);
        } else {
          reject(new Error("getTodos error"));
        }
      };
    });
  },
  addTask: (db, task) => {
    return new Promise((resolve, reject) => {
      let request = db
        .transaction(["todos"], "readwrite")
        .objectStore("todos")
        .add({
          task: task,
          done: false
        });

      request.onsuccess = (event) => {
        let index = Number(event.target.result);
        resolve(index);
      };

      request.onerror = (event) => {
        reject(new Error(event.target.error.message));
      };
    });
  },
  doneTask: (db, index) => {
    return new Promise((resolve, reject) => {
      let store = db
        .transaction(["todos"], "readwrite")
        .objectStore("todos");

      let requestGet = store.get(Number(index));

      requestGet.onsuccess = (event) => {
        let todo = event.target.result;

        todo.done = true;

        let requestUpdate = store.put(todo);

        requestUpdate.onsuccess = (event) => {
          let index = event.target.result;
          resolve(index);
        };

        requestUpdate.onerror = (event) => {
          reject(new Error(event.target.error.message));
        };
      };

      requestGet.onerror = (event) => {
        reject(new Error(event.target.error.message));
      };
    });
  },
  deleteTask: (db, index) => {
    return new Promise((resolve, reject) => {
      let request = db
        .transaction(["todos"], "readwrite")
        .objectStore("todos")
        .delete(Number(index));

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject(new Error(event.target.error.message));
      }
    });
  }
};

export default indexedDB;
