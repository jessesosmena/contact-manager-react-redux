<template>
  <div class="container profile"><br/>
  <div class="row">
    <div class="col-md-6">
      <div v-if="store.isVerified == 1" class="panel panel-default">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-12 lead">User profile<hr></div>
          </div>
          <div class="row">

            <div class="col-md-4 text-center">
              <img class="img-circle avatar avatar-original" style="-webkit-user-select:none; 
              display:block; margin:auto;" src="./default-gravatar.png" width="130px">
            </div>
            
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-12">
                  <h3 id="capitalize" v-if="store.client" class="only-bottom-margin profile">{{store.client.username}}</h3>
                </div>
              </div>
              <div class="row">
                <div class="userProfile col-md-6">
                  <span v-if="store.client" class="text-muted">Id: {{store.client.id}}</span><br>
                  <span v-if="store.client" class="text-muted">Email: {{store.client.email}}</span><br>
                  <span v-if="store.client" class="text-muted">Created: {{store.client.created_at}}</span><br>
                </div>
                <div class="col-md-6">
                  <div class="activity-mini">
                    <i class="glyphicon glyphicon-comment text-muted"></i> 500
                  </div>
                  <div class="activity-mini">
                    <i class="glyphicon glyphicon-thumbs-up text-muted"></i> 1500
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <hr>
              <button  @click="GoToRoute()" class="btn btn-default btn-sm pull-right btnProfile"><i class="glyphicon glyphicon-pencil"></i> Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    store: state => state.store
  }),

  methods: {
    GoToRoute: function(){
    this.$router.push({ name: 'update', params: { id: this.store.client.id }})
    },
  }
}
</script>

<style>

.capitalize{
  text-transform: capitalize;
}

.profile {
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
}

.userProfile span{
  font-size: 15px;
}

.btnProfile{
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
}

</style>