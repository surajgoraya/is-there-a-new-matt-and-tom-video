const API_KEY = "{ENTER_API_KEY_HERE}";
const MAT_ID = "UCRUULstZRWS1lDvJBzHnkXA";

var REQ_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+MAT_ID+"&maxResults=25&order=date&type=video&key="+API_KEY;

/**
 This function gets the recent videos on the Matt and Tom channel.
**/
$(document).ready(function(){
	$.getJSON( REQ_URL, function( json ) {
	  console.log( "JSON Data: " + json.items[0].snippet.title);
	  checkVideos(json.items, json.items[0].snippet.publishedAt, json.items[0].id.videoId);
	 });


})

function checkVideos(items, publishedAt, videoId) {

	var newVideo = false;

	var splitTime = publishedAt.split('T');
	
	var when = moment(splitTime[0], "YYYY-MM-DD").fromNow();
	
	if(when.includes("days ago") || when.includes("day ago")){
		for (var i = 1; i < 7; i++) {
			if(when.includes(i+ " days ago"))
			{
				//new 
				newVideo = true;
			}
		}

	}
	else if(when.includes("hours ago") || when.includes("minutes ago")){
		//new
		newVideo = true;
	}

	if (newVideo){

		console.log("new vid");
		$("#new-video-answer").text("YES.");
		$("#sub-text").text("looks like you're getting your daily dose of ramble!");
		$("#yt-video").attr('src', "https://www.youtube.com/embed/"+videoId);
	}
	else{
		$("#yt-video").attr('src', "https://www.youtube.com/embed/"+items[Math.floor(Math.random() * 24)].id.videoId);
	}
	
	console.log(moment(splitTime[0], "YYYY-MM-DD").fromNow());
	console.log(videoId);
}