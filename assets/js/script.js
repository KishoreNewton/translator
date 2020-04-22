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

document.getElementById("switchLanguage").addEventListener("click", () => {
    let active1 = document.getElementsByClassName("active1")[0].innerHTML
    let active2 = document.getElementsByClassName("active2")[0].innerHTML.toLowerCase()
    let active1Id = 'output' + active1
    let active2Id = document.getElementsByClassName("active2")[0].id.slice(6).toLowerCase()
    let lists = document.querySelectorAll('.item1')
    removeClassActiveOne(lists)
    let lists2 = document.querySelectorAll('.item2')
    removeClassActiveTwo(lists2)
    for(let list of lists2){
        list.classList.remove("active2")
    }
    document.getElementById(active1Id).className = "item2 active2"
    document.getElementById(active2Id).className = "item1 active1"
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
    let url = `ajax/Translate.php?inputLanguage=${inputLanguage}&outputLanguage=${outputLanguage}&textValue=${textValue}` 
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
        document.getElementById("outputText").innerText = sentance.toLowerCase()
    }).catch((error) => {
        console.log("something went wrong", error)
    })
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
