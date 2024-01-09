<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default{

    setup() {
            const videos = ref([]);
            const router = useRouter();
            const recordScreen = ref(Boolean);
            const recordMic = ref(Boolean);
            const recordCamera = ref(Boolean);
            const selectedLocation = ref(router.currentRoute.value.query.selectedLocation??'');
            const mediaRecorder = ref(null);
            const recordedChunks = ref([]);
            const recordingSize = ref([]);
       
            recordScreen.value = Boolean(router.currentRoute.value.query.recordScreen === "true");
            recordMic.value = Boolean(router.currentRoute.value.query.recordMic === "true");
            recordCamera.value = Boolean(router.currentRoute.value.query.recordCamera === "true");

            const formatLastModified = (lastModified) => {
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                return new Intl.DateTimeFormat('en-US', options).format(new Date(lastModified));
            };

            const recording = ref(false);

            const videoElement = ref(null);

            const startRecording = async () => {
                try {
                    var mediaArray = [];
                    if (recordScreen.value || recordCamera.value || recordMic.value) {
                        if (recordScreen.value) {
                            var  screenRec = await navigator.mediaDevices.getDisplayMedia({ video: true })
                            mediaArray.push(...screenRec.getTracks())
                        }
                        if (recordCamera.value || recordMic.value){
                            
                            var  cameraRec = await navigator.mediaDevices.getUserMedia({ video: recordCamera.value, audio: recordMic.value })
                            mediaArray.push(...cameraRec.getTracks())
                        }
                    }else{
                        return "No value selected"
                    }

                    const combinedStream = new MediaStream([...mediaArray]);
                    mediaRecorder.value = new MediaRecorder(combinedStream);
                    videoElement.value.srcObject = combinedStream;
                    videoElement.value.play()

                    mediaRecorder.value.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            recordedChunks.value.push(event.data);
                        }
                    };

                    mediaRecorder.value.onstop = () => {
                        const blob = new Blob(recordedChunks, { type: 'video/webm' });
                        const videoUrl = URL.createObjectURL(blob);
                        console.log('Video URL:', videoUrl);
                    };

                    mediaRecorder.value.start();
                    recording.value = true;
                } catch (error) {
                    console.error('Error starting recording:', error);
                }
            };

            const stopRecording = () => {
                    var path= "";
                    var videoUrl  = ""
                    if (mediaRecorder.value && recording.value) {
                        mediaRecorder.value.onstop = () => {
                            const blob = new Blob(recordedChunks.value, { type: 'video/webm' });
                            recordingSize.value = blob.size;
                            recordedChunks.value = [];
                            videoUrl = URL.createObjectURL(blob);
                            // console.log(videoUrl);
                                videoElement.value.src = videoUrl;
                                const downloadLink = document.createElement('a');
                                downloadLink.href = videoUrl;
                                path =  selectedLocation.value+'/recorded-video.webm';
                                downloadLink.download = path;
                                downloadLink.click();
                            };
                            mediaRecorder.value.stop();

                        if (videoElement.value) {
                            if (videoElement.value.srcObject) {
                                const tracks = videoElement.value.srcObject.getTracks();
                                tracks.forEach(track => track.stop());
                            }
                            videoElement.value.src = '';
                            fetch('http://localhost:3001/videos', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    video_link: videoUrl !=""? videoUrl:"https://www.youtube.com/embed/rIfdg_Ot-LI?si=GVohu4Q4oG-HiGWW",
                                    title: "Getting it right the first time",
                                    description: "The Video description is shown here if the user has added it.",
                                    views: 0,
                                    size:  recordingSize.value,
                                    last_modified: new Date()
                                    })
                                })
                                .then(response => {
                                    if (response.ok) {
                                        console.log('Video uploaded successfully');
                                    } else {
                                        console.error('Failed to upload video');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }
                        recording.value = false;
                    }
                };
            
                // const downloadRecording = () => {
                //     if (recordedChunks.value.length > 0) {
                //         const blob = new Blob(recordedChunks.value, { type: 'video/webm' });
                //         const url = URL.createObjectURL(blob);

                //         // Create a link element and trigger a click to download the recording
                //         const a = document.createElement('a');
                //         a.href = url;
                //         a.download = 'recorded_video.webm';
                //         a.click();
                //     }
                // }

            return { videos, formatLastModified,
                    recording, videoElement, startRecording, stopRecording  };
        },
        components : {
    }

}
</script>

<template>
 <div class="container px-5 mt-4">
        <div class="content ">

            <div class="row my-4">
                <div class="col-12 text-danger">
                   
                </div>
                <div class="col-12 record-area">
                    
                    <i class="fa-solid fa-record-vinyl text-danger"></i>
                    Live Preview 
                    <div class="empty-record mb-5" id="recordedContent">
                        <video ref="videoElement"  class="full-width-height"></video>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-blue btn-rounded" @click="startRecording" v-if="!recording">
                            <i class="fa-solid fa-record-vinyl"></i>
                            Start Recording
                        </button>
                        <button class="btn btn-blue btn-rounded" @click="stopRecording" v-else>
                            <i class="fa-solid fa-record-vinyl"></i>
                            Stop Recording/Download
                        </button>
                    </div>
                </div>
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
.btn-rounded {
    border-radius: 28px !important;
    padding: 7px 18px !important;
}
.btn-orange{
    background-color:#EF5350 !important;
    color:#fff !important;
}
.full-width-height {
  width: 100%;
  min-height:500px;
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
    border: 2px solid #E2E5ED;
    min-height:500px;
    width:100%;
    border-radius: 8px;
    background: #21455E;
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
video{
    height:70px;
    border-radius: 5px;
}
.text-grey {
    color: #888 !important;
    font-size: 12px;
}
.v-title {
    font-size: 14px;
}
</style>