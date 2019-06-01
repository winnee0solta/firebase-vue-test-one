<template>
  <div class="container">
    <!-- //title -->
    <div class="main-title">
      <h4>{{title}}</h4>
    </div>
    <!-- //input field -->
    <div class="row">
      <div class="col-xl-3"></div>
      <div class="col-xl-6">
        <div class="input-container">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Type Here " v-model="inputdata">
          </div>
          <button class="btn add-todo" @click="addTodo">Add</button>
        </div>
        <!-- //lists -->
        <div class="list-container">
          <div class="single-list-view" v-for="todo in todos" :key="todo.doc_id">
            <div class="content">
              <p>
                {{todo.todo}}
              </p>
            </div>
            <div class="controllers">
              <!-- <button class="btn edit-btn">Edit</button> -->
              <button class="btn remove-btn" @click="removeTodo(todo.doc_id)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { todoref } from "../firebase";
const firebase = require("firebase");
export default {
  name: "home",
  data() {
    return {
      title: "My Todoist Application",
      inputdata: "",
      buttondisabled: false,
      todos: [
        // {
        //   doc_id,
        //   created_at,
        //   updated_at,
        //   todo,
        // }
      ]
    };
  },
  methods: {
    addTodo() {
      if (this.buttondisabled || this.inputdata == "") {
        return;
      }
      //disable button
      this.buttondisabled = true;
      //
      var temp_inputdata = this.inputdata
      //timestamp
      this.inputdata = ''
      var timestamp = firebase.firestore.FieldValue.serverTimestamp();
      console.log(timestamp);

      todoref
        .add({
          created_at: timestamp,
          updated_at: timestamp,
          todo: temp_inputdata
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          //enable button
          this.buttondisabled = false;
          //refetch todos
         this.fetchTodos()
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          //enable button
          this.buttondisabled = false;
        });
    },
    removeTodo(doc_id){

      if (doc_id == null) {
          return;
      }
      //remove doc 
      todoref.doc(doc_id).delete().then(()=>{
         console.log("Document successfully deleted!");
         //refetch todos
         this.fetchTodos()
      }).catch((error)=>{
        console.error("Error removing document: ", error);
      })
    },
    fetchTodos() {
      this.todos = []
      //fetching all data from collection once

      todoref
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // console.log(doc.id, " => ", doc.data());
            this.todos.push({
              doc_id: doc.id,
              created_at: Date(doc.data().created_at),
              updated_at: Date(doc.data().updated_at),
              todo: doc.data().todo
            });
          });
        })
        .catch(error => {
          console.error("Error retriving documents: ", error);
        });
      //log
      console.log(this.todos);
    }
  },
  mounted() {
    //fetch todos
    this.fetchTodos();
  }
};
</script>

<style lang="scss" >
</style>
