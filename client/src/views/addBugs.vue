<template>
<div style='margin-top:75px'>
<div  v-if='login'><login/></div>
<div  v-if='addBugPage' class=' m-md-5'>
  <div class='text-center border'>
      <h3>Add New Bug</h3>
  </div>
   <div class='mt-5'>
        <v-card
  >  
  <h3 class='ml-4 pb-3 text-center'>Location</h3>
    <GoogleMap style='height:350px;' class='w-75 mx-auto'/>
        <div class='m-5'>
         <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                enctype="multipart/form-data" 
                method='POST'
            >
            
                <!-- title of problem-->
                <v-content>
               <v-text-field
                v-model="description"
                :counter="100"
                :rules="descriptionRules"
                label="Description"
                required
                ></v-text-field>
                 </v-content>
                <!-- input category of problem -->
                        
                <v-select
                v-model="select"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Category"
                required
                small-chips
                ></v-select>
 
				<v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<img :src="imageUrl" height="150" v-if="imageUrl"/>
                    <v-text-field label="Select Image" @click='pickFile'  :rules="imageRules" v-model='imageName'  prepend-icon='attach_file' ></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
                         
					>
				</v-flex>
                <v-btn  @click="submit" color="teal white--text" >
                Add Bug
                </v-btn>

            </v-form>
        </div>
     
    
    <v-divider></v-divider>
      </v-card>
   </div>
</div>
</div>
</template>

<script>
import GoogleMap from "./../components/addBugMap";
import login from "./login";
import axios from 'axios'
import router from '../router'
import HTTP from '../http'
import store from "../store"
export default {
    components: {
      GoogleMap,
      login
 
    },
    data: function () {
            return {
                file_data: '',
  		        form_data: {},
                login: true,
                addBugPage:false,
                select: null,
                items: [
                    'Social Welfare',
                    'Garbage',
                    'Urban Development',
                    'Transport',
                    'Culture',
                    'Education',
                    'Health',
                    'Construction and Improvment',
                    'Advertising',
                    'Tourism',
                    'Other',
                ],
                checkbox: false,
                valid: true,
                description: '',
                descriptionRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 100) || 'Name must be less than 20 characters'
                ],
                  title: "Image Upload",
        dialog: false,
        image:{},
		imageName: '',
		imageUrl: '',
        imageFile: '',
        a:{a:'fddg'},
        imageRules: [
                    v => !!v || 'image with name is required',
                   
                ],
            }   
  },
  created(){
      if(localStorage.getItem('token')){
          this.login= false ;
          this.addBugPage=true;
      }
  },
  methods: {
      submit () {
        if (this.$refs.form.validate()) {
            if(this.imageUrl == '')
            {
                alert('Image is not selected')
              return 0;
            }

          this.snackbar = true
          this.sendData();
        }
      },
      //Send data to the database
       async sendData(){
                let data = new FormData()
                data.append('image', this.image)
                data.append('description',this.description)
                data.append('category',this.select)
                data.append('lat',store.state.addPost_lat)
                data.append('lng',store.state.addPost_lng)
                 data.append('token',localStorage.getItem('token'))
                let url = 'http://127.0.0.1:3333/addPost'
                let options = {
                    headers: {
                    'content-type': 'multipart/form-data'
                    }
                }
                
  await HTTP().post(url, data, options).then(()=>{
      this.$router.push({name:'home'})
  }) 
},
       pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
            this.image = e.target.files[0] ;
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
    
      
  },
}
</script>

<style>

</style>
