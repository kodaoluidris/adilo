<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import breadcrumbs from '../includes/BreadCrumbs.vue'
import Swal from 'sweetalert2';
export default{
    setup() {
            const videos = ref([]);
            const router = useRouter();
            onMounted(async () => {
                // Fetch data from the mock API
                fetchRecord()
            });

            const formatLastModified = (lastModified) => {
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                return new Intl.DateTimeFormat('en-US', options).format(new Date(lastModified));
            };

            const fetchRecord = async () => {
                const response = await fetch('http://localhost:3001/videos');
                videos.value = await response.json();
            };

            const recordScreen = ref(true);
            const recordCamera = ref(true);
            const recordMic = ref(false);
            const recording = ref(false);
            const selectedLocation = ref("cloud");

            const startRecording = async () => {
                document.getElementById('closeModal').click();
                var data = {
                        recordScreen: recordScreen.value,
                        recordCamera: recordCamera.value,
                        recordMic: recordMic.value,
                        selectedLocation: selectedLocation.value
                    }
                router.push({path: 'recording', query: { ...data }});
            };

            

            const  deleteRecord = async (recordId) => {
                const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                });

                if (result.isConfirmed) {
                    try {
                        const response =  await fetch('http://localhost:3001/videos/'+recordId, {
                            method: 'DELETE',
                        });
                        if (response.ok) {
                            fetchRecord()
                            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');

                        } else {
                            Swal.fire('Error!', 'Failed to delete the record.', 'error');
                        }

                     
                    } catch (error) {
                        Swal.fire('Error!', 'Failed to delete the record.', 'error');
                    }
                }
                }



            return { videos, startRecording, formatLastModified, selectedLocation,
                    recordScreen, recordCamera, recordMic, recording, deleteRecord  };
        },
        components : {
        breadcrumbs
    }

}
</script>

<template>
 <div class="container px-5 mt-4">
        <breadcrumbs />
        <div class="content ">
            <div class="row my-4">
                <div class="col-md-3 col-12">
                    <h1 class="top-text">Recordings <strong>{{ videos.length }}</strong></h1>
                </div>
                <div class="col-md-9  col-12 p-0">
                    <div class="buttons">
                        <button class="btn btn-default btn-rounded">
                            <i class="fas fa-sort"></i>
                            Buy Date
                        </button>
                        <button class="btn btn-default btn-rounded">
                            <i class="fas fa-filter"></i>
                            Add Filter
                        </button>
                        <button class="btn btn-blue btn-rounded">
                            <i class="fas fa-video"></i>
                            New Request
                        </button>
                        <button class="btn btn-orange btn-rounded"  data-bs-toggle="modal" data-bs-target="#myModal" >
                            <i class="fa-solid fa-record-vinyl"></i>
                            Start Recording
                        </button>
                    </div>
                </div>
                <div class="col-12" v-if="!videos.length">
                    <div class="empty-record my-3">
                        <img src="@/assets/empty.png" alt="Centered Image" class="centered-image">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="text-center">
                                    Say hello to the world!
                                </h3>
                                <p class="text-center text-empty">
                                    Record your first video/audio and share it what your team, friends, <br/> followers and customers.
                                </p>
                                <p class="text-center">
                                    <button class="btn btn-blue btn-rounded">
                                        <i class="fas fa-video"></i>
                                        New Request
                                    </button>
                                    <button class="btn btn-orange btn-rounded" @click="startRecording">
                                        <i class="fa-solid fa-record-vinyl"></i>
                                        Start Recording
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="preview">
                        <div class="row">
                            <div class="col-6">
                                <img src="@/assets/preview.png" alt="" class="w-100">
                            </div>
                            <div class="col-6 text-center">
                                <h3 class="text-center my-3">Want more controls & better quality recording?</h3>
                                <button class="btn btn-blue btn-rounded mt-5">
                                        <i class="fas fa-video"></i>
                                       Download the desktop recorder
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 my-3" v-else>
                    <div class="records table-responsive">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Recordings </th>
                                    <th width="26%">Title</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Last Modified</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody class="v-title">
                                <tr v-for="(video, index) in videos" :key="index" class="align-middle">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>
                                        <iframe
                                        :src="video.video_link"
                                        :title="video.title"
                                        frameborder="0"
                                        allowfullscreen
                                        ></iframe>
                               
                                    </td>
                                    <td class="v-title">
                                        {{ video.title }}
                                        <br />
                                        <span class="text-grey">
                                            {{ video.description }}
                                        </span>
                                    </td>
                                    <td>{{ video.views }}</td>
                                    <td>{{ video.size }}</td>
                                    <td>{{ formatLastModified(video.last_modified) }}</td>
                                    <td>
                                        <div class="dropdown">
                                        <button
                                            class="btn"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-bs-toggle="dropdown" 
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <!-- Ellipsis sign -->
                                            <span>&#8230;</span>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <button class="dropdown-item" @click="deleteRecord(video.id)">Delete</button>
                                        </div>
                                    </div>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      <!-- Include other components or content as needed -->
        </div>
        <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <!-- <form action=""> -->
                    <div class="modal-content">
                        <!-- Modal content -->
                        <div class="modal-header">
                            <h5 class="modal-title">New Recording</h5>
                            <button type="button" class="close borderless" data-bs-dismiss="modal" aria-label="Close" id="closeModal">
                            <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="saveLocation ">Save the recording in</label>
                                <select class="form-select my-2" v-model="selectedLocation">
                                    <option value="local">Local</option>
                                    <option value="cloud">Cloud</option>
                                    <option value="external">External Drive</option>
                                </select>
                            </div>
                            <table class="table table-borderless">
                                <tr>
                                    <td>Record screen</td>
                                    <td>
                                        <div class="form-check form-switch form-check-success">
                                            <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault"  v-model="recordScreen">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Record Camera</td>
                                    <td>
                                        <div class="form-check form-switch form-check-success">
                                            <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckChecked"  v-model="recordCamera">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Record Mic</td>
                                    <td>
                                        <div class="form-check form-switch form-check-success">
                                            <input class="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckChecked"  v-model="recordMic">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div class="text-center">
                        
                                <button class="btn btn-blue btn-rounded" @click="startRecording" v-if="!recording">
                                    Start Recording
                                </button>
                                <button class="btn btn-blue btn-rounded" @click="stopRecording" v-else>
                                    Stop Recording
                                </button>
                            </div>
                           
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        </div> -->
                    </div>
                <!-- </form> -->
            </div>
        </div>

    </div>
</template>

<style scoped>
.form-check-success .form-check-input:checked {
    background-color: #28a745; /* Change to your desired success color */
    border-color: #28a745; /* Change to your desired success color */
  }
  
  .form-check-success .form-check-input:focus {
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25); /* Change to your desired success color with focus effect */
  }
.top-text{
    font-size: 24px;
    color: #888;
    font-weight: 300;
}
@media (max-width: 768px){
    .top-text{
        font-size: 16px;
        color: #888;
        font-weight: 300;   
    }
    
}
.btn-rounded {
    border-radius: 28px !important;
    padding: 7px 18px !important;
}
.btn-orange{
    background-color:#EF5350 !important;
    color:#fff !important;
}
.btn-blue{
    background-color:#0DABD8 !important;
    color:#fff !important;
}

.btn-default{
    background: transparent;
    border-color:#E2E5ED !important;
    color:#888 !important;
}
.btn {
    margin: 5px 10px !important;
    font-size :14px !important;
    padding: 10px 25px !important;
}
.empty-record{
    border: 2px dashed #E2E5ED;
    border-radius:20px;
    min-height:500px;
    width:100%;
    display: flex;
    flex-direction: column; /* Stack items vertically */
    justify-content: center;
    align-items: center;
}
.borderless{
        border: none !important;
        font-size: 22px !important;
        background-color: transparent !important;
}   
.centered-image {
            max-width: 100%; /* Ensures the image doesn't exceed the container width */
            max-height: 100%; /* Ensures the image doesn't exceed the container height */
        }

.text-empty{
    color: #637C8E;
}
iframe{
    height: 100px;
    border-radius: 5px;
    width: 200px;
}
.text-grey {
    color: #888 !important;
    font-size: 12px;
}
.v-title {
    font-size: 14px;
}
</style>