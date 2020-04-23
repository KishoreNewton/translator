document.getElementById("inputLanguage").addEventListener("click", (e) => {
    let lists = document.querySelectorAll('.item1')
    removeClassActiveOne(lists)
    if (e.target && e.target.matches("li")) {
        e.target.className = "active1 item1"; 
    }
})

document.getElementById("outputLanguage").addEventListener("click", (e) => {
    let lists = document.querySelectorAll('.item2')
    removeClassActiveTwo(lists)
    if (e.target && e.target.matches("li")) {
        e.target.className = "active2 item2"; 
    }
})

document.getElementById("deleteIcon").addEventListener("click", () => {
    document.getElementById("textareaLeft").value = ""
    document.getElementById("textareaLeft").focus()
})

document.getElementById("textareaLeft").addEventListener("input", () => {
    let length = document.getElementById("textareaLeft").value.length
    if(length === 4){
        document.getElementById("deleteIcon").style.display = "block"
    }
    if(length < 4){
        document.getElementById("deleteIcon").style.display = "none"
    }
    if(length >= 200){
        document.getElementById("stringLength").innerText = 'Limit 200'
        document.getElementById("stringLength").style.color = 'red'
        return false
    } else {
        document.getElementById("stringLength").innerText = `${length}/200`
        document.getElementById("stringLength").style.color = 'black'
    }
})

document.getElementById("dropDown").addEventListener("click", () => {
    if(document.getElementById("otherLanguage").style.display === "none"){
        document.getElementById("otherLanguage").style.display = "block"
        document.getElementById("medianOne").style.display = "none"
        document.getElementById("footerOne").style.display = "none"
    } else {
        displayOne()
    }
})

document.getElementById("dropDownOutput").addEventListener("click", () => {
    if(document.getElementById("otherLanguageTwo").style.display === "none"){
        document.getElementById("otherLanguageTwo").style.display = "block"
        document.getElementById("medianTwo").style.display = "none"
        document.getElementById("footerTwo").style.display = "none"
    } else {
        displayTwo()
    }
})

document.getElementById("otherLanguage").addEventListener("click", (e) => {
    let positionThree = document.querySelector("*[data-replace=three]")
    if (e.target && e.target.matches("li")) {
        let selectedLanguage = e.target
        let selectedLanguageId = e.target.id
        let positionThreeId = positionThree.id
        let positionThreeText = positionThree.innerHTML
        let selectedLanguageText = selectedLanguage.innerHTML
        selectedLanguage.innerHTML = positionThreeText
        positionThree.innerHTML = selectedLanguageText
        selectedLanguage.id = positionThreeId
        positionThree.id = selectedLanguageId
        let lists = document.querySelectorAll('.item1')
        removeClassActiveOne(lists)
        displayOne()
        positionThree.className = "item1 active1"
    }
})

document.getElementById("otherLanguageTwo").addEventListener("click", (e) => {
    let positionThree = document.querySelector("*[data-replace=outputThree]")
    if (e.target && e.target.matches("li")) {
        let selectedLanguage = e.target
        let selectedLanguageId = e.target.id
        let positionThreeId = positionThree.id
        let positionThreeText = positionThree.innerHTML
        let selectedLanguageText = selectedLanguage.innerHTML
        selectedLanguage.innerHTML = positionThreeText
        positionThree.innerHTML = selectedLanguageText
        selectedLanguage.id = positionThreeId
        positionThree.id = selectedLanguageId
        let lists = document.querySelectorAll('.item2')
        removeClassActiveTwo(lists)
        displayTwo()
        positionThree.className = "item2 active2"
    }
})


document.getElementById("textareaLeft").addEventListener("input", () => {
    let inputLanguage = document.querySelector(".active1").innerHTML.toLowerCase().replace(/[{()}]/g, '')
    let outputLanguage = document.querySelector(".active2").innerHTML.toLowerCase().replace(/[{()}]/g, '')
    let textValue = document.getElementById("textareaLeft").value
    if(inputLanguage !== "detect language"){
    let url = `ajax/Translate.php` 
    let params = `inputLanguage=${inputLanguage}&outputLanguage=${outputLanguage}&textValue=${textValue}`
    postData(url, params).then((data) => {
        let sentance = ""
        for(let i = 0; i < data.length; i++){
            if(data[i] === false){
                sentance += "..."
            } else {
                sentance += " " + data[i].output
            }
        }
        document.getElementById("outputTextArea").value = sentance.toLowerCase()
    }).catch((error) => {
        console.log("something went wrong", error)
    })
    let url2 = `ajax/Suggestions.php` 
    let params2 = `inputLanguage=${inputLanguage}&textValue=${textValue}`
    postData(url2, params2).then((data) => {
        let length = data.length - 1
        let length2 = data.length - 2
        let length3 = data.length - 3
        document.getElementById("suggestionText").innerHTML = `<a onclick="replaceText(this)">${data[length2].input}</a>, <a onclick="replaceText(this)">${data[length3].input}</a>,  <a onclick="replaceText(this)">${data[length].input}</a>`
    }).catch((error) => {
        // console.log("something went wrong", error)
    })
    } else {
        document.getElementById("suggestionText").innerHTML = "Language"
        let url = `ajax/Detect.php` 
        let params = `textValue=${textValue}`
        postData(url, params).then((data) => {
            let length = data.length - 1
            let languages = data[length]
            let lastword = textValue.split(" ").pop()
            if(lastword === ""){
                lastword = "a"
            }
            let capatalizedInputValue = lastword[0].toUpperCase() + lastword.slice(1)
            Object.prototype.getKey = function(value){
                for(var key in this){
                  if(this[key] == value){
                    return key;
                  }
                }
                return "...";
            }
            let result = languages.getKey(capatalizedInputValue).toUpperCase()
            document.getElementById("suggestionText").innerHTML = `${result} Detected`
        }).catch((error) => {
            console.log("something went wrong", error)
        })
    }
})


// ****************************************************** //


function removeClassActiveOne(lists){
    for(let list of lists){
        list.classList.remove("active1")
    }
}

function removeClassActiveTwo(lists){
    for(let list of lists){
        list.classList.remove("active2")
    }
}

function displayOne(){
    document.getElementById("medianOne").style.display = "block"
    document.getElementById("otherLanguage").style.display = "none"
    document.getElementById("footerOne").style.display = "block"
}

function displayTwo(){
    document.getElementById("medianTwo").style.display = "block"
    document.getElementById("otherLanguageTwo").style.display = "none"
    document.getElementById("footerTwo").style.display = "block"
}

async function postData(url, params){
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json' },
        body: params
    })
    return response.json()
}

function replaceText(word){
    let replaceWord = word.innerText.toLowerCase()
    let replaceSentance = document.getElementById("textareaLeft").value
    let lastWord = replaceSentance.lastIndexOf(" ")
    replaceSentance = replaceSentance.substring(0, lastWord)
    let string = `${replaceSentance} ${replaceWord}`
    string = string.trim();
    document.getElementById("textareaLeft").value = string
    document.getElementById("textareaLeft").focus()
}

function getKeyByValue(object, value) { 
    for (var prop in object) { 
        if (object.hasOwnProperty(prop)) { 
            if (object[prop] === value) 
            return prop; 
        } 
    } 
} 
