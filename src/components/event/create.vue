<template>
  <div class="q-col-gutter-sm">
    <div class="col-12">
      <q-input
        class="col-12"
        v-model="eventObj.desc"
        label="Evento"
      />
    </div>
    <div class="col-12">
      <q-input
        class="col-12"
        v-model="eventObj.data"
        label="Data"
      />
    </div>
    <div class="items-center q-gutter-sm">
      <q-btn
        class="col"
        no-caps
        @click="createEvent"
        color="primary"
        label="Criar"
      />
      <q-btn
        class="col"
        no-caps
        @click="updateEvent"
        color="primary"
        label="Modificar"
      />
      <q-btn
        class="col"
        no-caps
        @click="getAllEvent"
        color="primary"
        label="Buscar todos"
      />
      <q-btn
        class="col"
        no-caps
        @click="deleteEvent"
        color="primary"
        label="deletar"
      />
    </div>
    <div class="q-pa-md" style="max-width: 350px height: 280px">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Eventos</q-toolbar-title>
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="contact in data"
          :key="contact.id"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section>
            <q-item-label>{{ contact.nmuser }}</q-item-label>
            <q-item-label caption lines="1">{{ contact.nickname }}</q-item-label>
            <q-item-label caption lines="1">{{ contact.senha }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
// import EventService from '../../service/events/methods.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

export default {
  mounted () {
    firebase.initializeApp(process.env.firebaseConfig)
  },
  name: 'create',
  data () {
    return {
      eventObj: {
        desc: '',
        data: ''
      },
      data: []
    }
  },
  methods: {
    createEvent () {
      console.log('criando ...')

      const db = firebase.firestore()
      db.collection('users').add({
        nmuser: 'Ada',
        nickname: 'feliciti'
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    updateEvent () {
      const db = firebase.firestore()
      const washingtonRef = db.collection('users').doc('bYPlPDD2ATpVgipSUbYX')

      // Set the "capital" field of the city 'DC'
      return washingtonRef.update({
        nmuser: 'update'
      })
        .then(() => {
          console.log('updated!')
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    },
    deleteEvent () {
      const db = firebase.firestore()
      db.collection('users').doc('bYPlPDD2ATpVgipSUbYX').delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    getAllEvent () {
      const db = firebase.firestore()
      db.collection('users').get()
        .then((querySnapshot) => {
          console.log(querySnapshot)
          querySnapshot.forEach((doc) => {
            this.data.push(doc.data())
            console.log(`${doc.id} => ${doc.data()}`)
          })
        })
    }
  }
}
</script>
