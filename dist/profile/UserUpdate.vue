<template>
  <div class="row">
          <br/>
          <div v-if="store.isVerified == 1" id="update" class="panel panel-default col-lg-4 col-lg-offset-4"><br/>
            <h3 class="text-center">Update Profile</h3>
              <form @submit.prevent="updateUser" class="panel-body">
                    <div class="form-group">
                      <label>Username:</label>
                        <input 
                          name="username" 
                          type="text" 
                          class="form-control" 
                          v-model="username" 
                          v-validate="'required'"
                          placeholder="Enter Username" 
                          required>

                        <div class="text-danger" 
                          v-show="errors.has('username')">
                          {{ errors.first('username') }}
                        </div>
                    </div>

                    <div class="form-group">
                      <label>Email:</label>
                        <input 
                          name="email" 
                          type="text" 
                          class="form-control" 
                          v-model="email" 
                          v-validate="'required'"
                          placeholder="Enter Email" 
                          required>

                        <div class="text-danger" 
                          v-show="errors.has('email')">
                          {{ errors.first('email') }}
                        </div>
                    </div>

                    <div class="form-group">
                      <label>Password:</label>
                      <input 
                        name="password" 
                        type="password" 
                        class="form-control" 
                        v-model="password"
                        v-validate="'required'"
                        placeholder="Enter Password" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('password')">
                        {{ errors.first('password') }}
                      </div>
                    <br/>
                    <div class="form-group">
                      <label>Confirm Password:</label>
                        <input 
                          name="confirm password" 
                          type="password" 
                          class="form-control" 
                          v-model="confirm_password"
                          v-validate="'confirmed:password'"
                          placeholder="Confirm Password" 
                          required>

                        <div class="text-danger" 
                          v-show="errors.has('confirm password')">
                          {{ errors.first('confirm password') }}
                        </div>
                    </div>
                  </div>
                  <input v-bind:disabled="btnDisable" type="submit" class="btn btn-primary btn-sm" value="SAVE">
                  <br/><br/>
              </form>
          </div>
      </div>
</template>

<script>
import swal from 'sweetalert';
import { mapState } from 'vuex';
import { apiDomain } from '../../config.js'

    export default {

      computed: mapState({
       store: state => state.store
      }),

      data () {
        return {
          btnDisable: false,
          username: '',
          email: '',
          password: '',
          confirm_password: ''
        }
      },

      methods: {
       
  	 	updateUser () {

        this.btnDisable = true

        var data = {
          username: this.username,
          email: this.email, // export default/data() return method <= two way binding
          password: this.password // export default/data() return method <= two way binding
        }

        this.$http.put(apiDomain + '/api/users/' + this.$route.params.id, data)
        .then(response => {

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('verified');

        this.$store.dispatch('unsetToken');
        this.$store.dispatch('unsetId');
        this.$router.push('/');

        swal({
          position: 'top-right',
          type: 'success',
          title: 'You have successfully updated your profile!',
          showConfirmButton: false,
          timer: 2500
        });

        });
            
      }
      }
  	}
</script>

<style>

  #update {
    margin-top: 15px;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
  }

  .text-center{
    font-size: 18px;
  }
  
</style>

