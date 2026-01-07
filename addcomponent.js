function addComponent(elementID, path){
    fetch(path)
        .then(
            response=>response.text()
        )
        .then(
            data=>document.getElementById(elementID).innerHTML = data
        )
}

addComponent('header', './components/header.html')
addComponent('footer', './components/footer.html')