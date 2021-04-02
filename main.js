let imageExtensions = ["png", "jpg", "jpeg", "webp", "gif"];
let server_location = "https://api.itwasthe.management";
const DEBUG = false;

if (DEBUG) {
    server_location = "http://localhost:5000"
}

function update_page(textString) {
    let imgCheck = textString.split(".");
    imgCheck = imgCheck[imgCheck.length - 1];
    let isImage = false;
    for (let index = 0; index < imageExtensions.length; index++) {
        if (imgCheck == imageExtensions[index]) {
            isImage = true;
            break;
        }
    }

    let imageElement = document.getElementById("image");
    let subtitleElement = document.getElementById("subtitle");
    let textElement = document.getElementById("text");
    
    if (isImage) {
        
        subtitleElement.innerHTML = "<a href=" + textString + ">" + textString + "</a>";
        subtitleElement.classList.add("wordwrap-fix");
        subtitleElement.classList.remove("hidden");
        imageElement.setAttribute("src", textString);
        imageElement.classList.remove("hidden");

        textElement.classList.add("hidden");

    } else {   
        if (textString.slice(0, 4) == "http") {
            textElement.innerHTML = "<a href=" + textString + ">" + textString + "</a>";
            textElement.classList.add("wordwrap-fix");
        } else {
            textElement.classList.remove("wordwrap-fix");
            textElement.innerHTML = textString;
        }
        textElement.classList.remove("hidden");

        subtitleElement.classList.add("hidden");
        imageElement.classList.add("hidden");
    }
}

function get_home_data() {
    fetch(server_location)
        .then(response => response.json())
        .then(function (jsonData) {
            let textString = jsonData["data"];
            let location = jsonData["loc"];

            history.pushState({}, document.getElementById("title").innerText, "/?loc=" + location);
            update_page(textString)
            
        }).catch(function (error) {
            document.getElementById("text").innerHTML = "Well there was an error of some sort.";
            document.getElementById("subtitle").innerHTML = error;
        });
}

function get_loc_data(loc) {
    fetch(server_location + "/" + loc)
        .then(response=> response.json())
        .then(function (jsonData) {
            console.log(jsonData);
            let textString = jsonData["data"];
            update_page(textString)
        }).catch(function (error) {
            document.getElementById("text").innerHTML = "Well there was an error of some sort.";
            document.getElementById("subtitle").innerHTML = error;
        });
}

function load_page() {

    let refresh_button = document.getElementById("refresh");
    refresh_button.onclick = function (event) {
        event.preventDefault();
        get_home_data();
    }

    let params = window.location.search;
    let urlParams = new URLSearchParams(params);
    if (urlParams.has("loc")) {
        get_loc_data(urlParams.get("loc"));
    } else {
        get_home_data();
    }
}

load_page();