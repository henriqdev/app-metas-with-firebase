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
        @click="getAllEvent"
        color="primary"
        label="Buscar todos"
      />
    </div>
    <div class="q-pa-md" style="max-width: 350px height: 280px">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Eventos</q-toolbar-title>
      </q-toolbar>
      <q-list bordered>
        <q-item
          v-for="events in data"
          :key="events.id"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section @click="openModify(events)">
            <q-item-label>{{ events.dataEvent }}</q-item-label>
            <q-item-label
              caption
              lines="1"
            >
              {{ events.desc }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-dialog
        v-model="dialMod"
        full-width
      >
      <div class="col-12 bg-white">
        <q-bar dark class="bg-primary text-white">
          <q-space />
          <div
            class="col text-center text-weight-bold"
          >
            Modificar evento
          </div>
          <q-space />
          <q-btn
            v-close-popup
            flat
            dense
            icon="close"
          />
        </q-bar>
        <DialogModify
          :propsEvent="dataEvent"
        />
      </div>
      </q-dialog>
    </div>
  </div>
</template>

<script>
// import EventService from '../../service/events/methods.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import DialogModify from './modifyEvent'

export default {
  mounted () {
    firebase.initializeApp(process.env.firebaseConfig)
  },
  name: 'create',
  components: {
    DialogModify
  },
  data () {
    return {
      eventObj: {
        desc: '',
        data: ''
      },
      dialMod: false,
      data: [],
      dataEvent: []
    }
  },
  methods: {
    openModify (obj) {
      this.dialMod = true
      this.dataEvent = obj
    },
    createEvent () {
      console.log('criando ...')

      const db = firebase.firestore()
      db.collection('events').add({
        dataEvent: this.eventObj.data,
        desc: this.eventObj.desc
      })
        .then((docRef) => {
          this.getAllEvent()
          console.log('resposta ', docRef)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    // deleteEvent () {
    //   const db = firebase.firestore()
    //   db.collection('users').doc('bYPlPDD2ATpVgipSUbYX').delete().then(() => {
    //     console.log('Document successfully deleted!')
    //   }).catch((error) => {
    //     console.error('Error removing document: ', error)
    //   })
    // },
    getAllEvent () {
      this.data = []
      const db = firebase.firestore()
      db.collection('events').get()
        .then((querySnapshot) => {
          console.log(querySnapshot)
          querySnapshot.forEach((doc) => {
            const res = {
              ...doc.data(),
              id: doc.id
            }
            this.data.push(res)
            console.log(`${doc.id} => ${doc}`)
          })
        })
    }
  }
}
</script>
