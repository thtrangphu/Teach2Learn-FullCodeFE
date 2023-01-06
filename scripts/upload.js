// var emb_key = "YOUR_API_KEY";

// $(document).ready(function () {
//   // Connect the styled button with the form input. The input is hidden. This is done in order to have a custom embed button.
//   $("#upload-button").click(function (e) {
//     $("#video_file").click();
//   });

//   // Once the video file is added, display the progress UI and submit the form for upload.
//   $("#video_file").change(function (e) {
//     $("#loader").css("display", "block");
//     $("#progress-percent").css("display", "block");
//     $("form[name='upload_form']").submit();
//     e.preventDefault();
//   });

//   // The sumbit function makes a post request. By default this replaces the page with the response, which is the JSON response after the post request. To stay on the same page the ajax request requires some more information.
//   $("form[name='upload_form'").submit(function (e) {
//     e.preventDefault();
//     var fd = new FormData($("form")[0]);
//     $.ajax({
//       url: $(this).attr("action"),
//       data: fd,
//       processData: false,
//       contentType: false,
//       crossDomain: true,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//       type: "POST",
//       success: function (data, textStatus, xhr) {
//         // On receiving the response, update the UI with the embed code and URL of the video
//         successText(data);

//         //Query the status endpoint
//         var call =
//           "https://upload.embed.ly/1/status?key=" +
//           emb_key +
//           "&video_id=" +
//           data.video_id;

//         //Poll status endpoint until video is processed
//         pollForFinished(call, function () {
//           renderIframe(data);
//         });
//       },
//       error: function (XMLHttpRequest, textStatus, errorThrown) {
//         console.log("Upload Failed for video: " + errorThrown);
//       },
//       xhr: function () {
//         //Monitor and display the percentage uploaded
//         var xhr = new window.XMLHttpRequest();
//         xhr.upload.addEventListener(
//           "progress",
//           function (evt) {
//             if (evt.lengthComputable) {
//               var percentComplete = (evt.loaded / evt.total) * 100.0;
//               var text = percentComplete.toFixed(2) + "% uploaded.";
//               $(".video-display").html("<p>" + text + "</p>");
//             }
//           },
//           false
//         );
//         return xhr;
//       },
//     });
//   });
// });

// var successText = function (data) {
//   $("#upload-button").css("display", "none");
//   $(".url-display").html("<h1>URL</h1>");
//   $(".embed-code").html(
//     "<h1>Embed Code</h1><p>You can copy and paste this embed code while the video processes.</p>"
//   );
//   $(".url-display").append(
//     "<p><a target='_blank' href='" + data.url + "'>" + data.url + "</a></p>"
//   );
//   $(".embed-code").append(
//     "<textarea name='textarea' rows='7' cols='50'>" + data.html + "</textarea>"
//   );
//   $(".video-display").html(
//     "<h1>Video</h1><p>The video is currently processing and will display momentarily.</p>"
//   );
// };

// var renderIframe = function (data) {
//   $("#loader").css("display", "none");
//   $("#progress-percent").css("display", "none");
//   $(".video-display").html("<h1>Video</h1><p>" + data.html + "</p>");
// };

// var checkProcessed = function (_call, cb) {
//   $.ajax({
//     url: _call,
//     type: "GET",
//     success: function (d) {
//       cb(d);
//     },
//     error: function (d) {
//       console.log("error!" + JSON.stringify(d));
//       cb(d);
//     },
//   });
// };

// var pollForFinished = function (_call, cb) {
//   checkProcessed(_call, function (res) {
//     if (res.status == "finished") {
//       cb();
//     } else if (res.status == "cancelled" || res.status == "failed") {
//       $(".video-display").html("<h1>Video</h1><p>" + res.status + "</p>");
//     } else {
//       setTimeout(pollForFinished(_call, cb), 10000);
//     }
//   });
// };

$("#addPhotosBtn").click(function () {
  $(this).parents().find("#addPhotosInput").click();
});

document.getElementById("addPhotosInput").onchange = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const li = ` <li> <img src=" ${url} ">
   <span><i class="fa fa-trash"></i></span>
   </li>`;
  $(".photos-list ul").append(li);
};

$("#addVideosBtn").click(function () {
  $(this).parents().find("#addVideosInput").click();
});

document.getElementById("addVideosInput").onchange = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const li = ` <li> <video controls="controls" src=" ${url} " type="video/mp4" width="400px" height="200px"></video>
       <span><i class="fa fa-trash"></i></span>
   </li>`;
  $(".video-list ul").append(li);
};
