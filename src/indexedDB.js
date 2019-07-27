const indexedDB = {
  connect: function() {
      if(!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.");
      }

      let request = window.indexedDB.open("todoListDB", 1);

      request.onerror = (event)=>{
        console.log("onerror");
        console.log(`error: ${event.target.error.message}`);
      };

      request.onsuccess = (event)=>{
        console.log("onsuccess");
        this.setState({
          db: event.target.result
        });
      };

      request.onupgradeneeded = (event)=>{
        console.log("onupgradeneeded");
        let db = event.target.result;
        db.createObjectStore("todos", {
          keyPath: "index",
          autoIncrement: true
        });
      };
  },
  getTodos: function(db) {
    let store = db
      .transaction("todos")
      .objectStore("todos");

    store.getAll().onsuccess = (event)=>{
      let todos = event.target.result;
      if (todos) {
        this.setState({
          todos: todos
        });
      } else {
        alert("No more tasks!");
      }
    };
  },
  addTask: function(db, task) {
    return new Promise((resolve, reject)=>{
      let request = db
        .transaction(["todos"], "readwrite")
        .objectStore("todos")
        .add({
          task: task,
          done: false
        });

      request.onsuccess = function(event) {
        let index = event.target.result;
        resolve(index);
      };

      request.onerror = function(event) {
        reject(event.target.error.message);
      };
    });
  },
  doneTask: function(db, index) {
    let store = db
      .transaction(["todos"], "readwrite")
      .objectStore("todos");

    let request = store.get(index);

    request.onsuccess = (event)=>{
      console.log("doneTask get success");
      let todo = event.target.result;

      todo.done = true;

      let requestUpdate = store.put(todo);

      requestUpdate.onsuccess = (event)=>{
        console.log("doneTask update success");
      };

      requestUpdate.onerror = (event)=>{
        console.log("doneTask update error");
      };
    };

    request.onerror = (event)=>{
      console.log("doneTask get error");
    };
  },
  deleteTask: function(db, index) {
    let request = db
      .transaction(["todos"], "readwrite")
      .objectStore("todos")
      .delete(index);

    request.onsuccess = ()=>{
      alert("deleted")
    };
  }
};

export default indexedDB;
