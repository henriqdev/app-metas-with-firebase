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
        v-model="eventObj.dataEvent"
        label="Data"
      />
    </div>
    <div class="items-center q-gutter-sm">
      <q-btn
        class="col"
        no-caps
        @click="updateEvent"
        color="primary"
        label="Modificar"
      />
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
  name: 'modify',
  props: {
    propsEvent: Object
  },
  data () {
    return {
      eventObj: {
        desc: this.propsEvent.desc,
        dataEvent: this.propsEvent.dataEvent
      }
    }
  },
  methods: {
    updateEvent () {
      console.log(this.eventObj)
      const db = firebase.firestore()
      const washingtonRef = db.collection('events').doc(this.propsEvent.id)

      // Set the "capital" field of the city 'DC'
      return washingtonRef.update({
        dataEvent: '',
        desc: ''
      })
        .then(() => {
          console.log('updated!')
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>
