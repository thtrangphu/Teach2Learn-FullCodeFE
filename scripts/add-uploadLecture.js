let baseURL = "http://127.0.0.1:8888";

let classID;
let no_of_lectures = 1;

window.onload = () => {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "include",
  };

  fetch(`${baseURL}/user/check`, requestOptions)
    .then((result) => result.json())
    .then((res) => {
      // console.log(res);
      if (res.STATUS === 1);
      else window.location = "signIn.html";
      document.getElementById("name").innerHTML =
        sessionStorage.getItem("name");
    })
    .catch((error) => console.log("error", error));

  let addUploadForm = document.getElementById("addUploadForm");

  addUploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {};
    data["class_id"] = classID;
    for (let i = 0; i < 6; i++) {
      data[addUploadForm[i].name] = addUploadForm[i].value;
    }
    data["no_of_lectures"] = no_of_lectures;
    data["lectures"] = [];
    for (let i = 6; i < addUploadForm.length - 1; i += 10) {
      // console.log(addUploadForm[i].checked);
      let lecture = {};
      lecture["lecture"] = addUploadForm[i].value;
      lecture["marks"] = addUploadForm[i + 1].value;
      let options = [];
      for (let j = i + 2; j < i + 10; j += 2) {
        let opt = {};
        opt["is_correct"] = addUploadForm[j].checked ? 1 : 0;
        opt["option"] = addUploadForm[j + 1].value;
        options.push(opt);
      }
      lecture["options"] = options;
      data["lectures"].push(lecture);
    }
    console.log(data);

    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
      credentials: "include",
    };
    fetch(`${baseURL}/test/add`, requestOptions)
      .then((result) => result.json())
      .then((res) => {
        alert(res.MESSAGE);
        if (res.STATUS === 1)
          window.location = `classroom.html?classID=${classID}`;
      });
  });

  classID = window.location.search
    .substring(1)
    .split("&")
    .map((ele) => ele.split("="))[0][1];
};

let menu_visible = false;
function toggle_dropdown() {
  let dd = document.querySelector(".dd_wrapper");
  if (menu_visible) {
    dd.classList.remove("show");
    menu_visible = false;
  } else {
    dd.classList.add("show");
    menu_visible = true;
  }
}

function addlecture() {
  let node = document.createElement("div");
  node.className = "lecture_options";
  node.innerHTML = `<h4 style="margin-bottom: 11px;">ADD LECTURE</h4>
  <span
    id="delete_btn"
    class="material-icons"
    onclick="deletelecture(this)"
    >delete</span
  >
  <br>
  <label for="title">Title : </label>
  <input
    class="lecture_title"
    type="text"
    style="width: 600px; height: 30px; border-radius: 8px;margin: 0px auto 16px;padding: 6px 12px;font-size: 16px;"
    name="title"
    required
  />
  <br>
  <label for="Description">Description : </label>
  <input
    class="lecture_decs"
    type="text"
    style="width: 600px; height: 30px; border-radius: 8px;margin: 0px auto 16px;padding: 6px 12px;font-size: 16px;"

    name="Description"
    required
  />
  <br />
  <label for="addVideo">Add Video : </label><br />
  <input
      type="file"
      class="d-none lecture_vid"
      id="addVideosInput"
      accept=" video/*"
    />
  <br><br>
  <label for="addFiles">Add Files : </label><br />
  <input
  type="file"
  class="d-none"
  id="addFilesInput"
  accept=" pdf/*"
/>
</div>
</div>
</form>
<div class="addUpload_btns">`;

  document.getElementById("addUploadForm").appendChild(node);
  no_of_lectures++;
}

function deletelecture(e) {
  if (no_of_lectures == 1) {
    alert("Lựa chọn không hợp lệ! Mỗi khóa học cần ít nhất một bài học.");
  } else {
    e.parentNode.parentNode.removeChild(e.parentNode);
    no_of_lectures--;
  }
}
