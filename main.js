let imageExtensions = ["png", "jpg", "jpeg", "webp", "gif"]

fetch("/memes.txt")
    .then(function (response) {
        return response.text();
    }).then(function (fileText) {
        let fileTextSplit = fileText.split("\n");
        let textString = fileTextSplit[Math.floor((Math.random() * fileTextSplit.length))];
        // textString = "https://i.imgur.com/2bY9hT4.jpg"
        let imgCheck = textString.split(".")
        imgCheck = imgCheck[imgCheck.length - 1]
        let isImage = false;
        for (let index = 0; index < imageExtensions.length; index++) {
            if (imgCheck == imageExtensions[index]) {
                isImage = true;
                break;
            }
        }
        
        if (isImage) {
            let imageElement = document.getElementById("image");
            let subtitleElement = document.getElementById("subtitle");
            subtitleElement.innerHTML = "<a href=" + textString + ">" + textString + "</a>";
            subtitleElement.classList.add("wordwrap-fix");
            subtitleElement.classList.remove("hidden");
            imageElement.setAttribute("src", textString);
            imageElement.classList.remove("hidden");
        } else {
            let textElement = document.getElementById("text");
            if (textString.slice(0, 4) == "http") {
                textElement.innerHTML = "<a href=" + textString + ">" + textString + "</a>";
                textElement.classList.add("wordwrap-fix");
            } else {
                textElement.innerHTML = textString;
            }
            textElement.classList.remove("hidden");
        }
    }).catch(function (error) {
        document.getElementById("text").innerHTML = "Well there was an error of some sort.";
        document.getElementById("subtitle").innerHTML = error;
    });