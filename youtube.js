const API_KEY = "{API_KEY_HERE}";
const CHANNEL_ID = "UCRUULstZRWS1lDvJBzHnkXA";

var REQ_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+CHANNEL_ID+"&maxResults=25&order=date&type=video&key="+API_KEY;

//Called whenever the page is loaded and ready to go.
$(document).ready(function(){
	$.getJSON( REQ_URL, function( json ) {
	  console.log( "JSON Data: " + json.items[0].snippet.title);
	  checkVideos(json.items, json.items[0].snippet.publishedAt, json.items[0].id.videoId);
	 });


})
/**
 This function gets the recent videos on the Matt and Tom channel.
**/
function checkVideos(items, publishedAt, videoId) {

	var newVideo = false;

	var splitTime = publishedAt.split('T'); //Youtube gives back a weird time date format split by the letter "T", we need just the date
	
	/*
	Use moment to calculate the difference between the publish date and today
	moment will return a string that follows the format, "x days ago" or "a day ago"
	*/
	var when = moment(splitTime[0], "YYYY-MM-DD").fromNow();
	
	if(when.includes("days ago") || when.includes("day ago")){
		for (var i = 1; i < 8; i++) {
			if(when == i + " days ago") //If it was within a week
			{
				console.log(i+ " days ago")
				//new 
				newVideo = true; //It counts as a "new" video
			}
		}

	}
	else if(when.includes("hours ago") || when.includes("minutes ago")){
		//new
		newVideo = true; //Sometimes you'll be on the site just as a video was uploaded, so this accounts for that
	}

	if (newVideo){
		//if this is true then go ahead and change the html
		console.log("new vid");
		$("#new-video-answer").text("YES.");
		$("#sub-text").text("looks like you're getting your daily dose of ramble!");
		$("#yt-video").attr('src', "https://www.youtube.com/embed/"+videoId);
	}
	else{
		//if not, find the embeded video and choose randomly from the 25 videos in our list from the youtube call
		$("#yt-video").attr('src', "https://www.youtube.com/embed/"+items[Math.floor(Math.random() * 24)].id.videoId);
	}
	
	console.log(moment(splitTime[0], "YYYY-MM-DD").fromNow());
	console.log(videoId);
}
