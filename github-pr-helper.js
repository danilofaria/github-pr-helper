function FileDiff(org, repo, number, element) {
	var self = this
	this.org = org
	this.repo = repo
	this.number = number
	this.element = element
	this.id = element.id
	this.selectElement = function() {
		return document.querySelector("#" + this.id)
	}
	this.isOpen = function() {
		return this.selectElement().classList.contains("Details--on")
	}
	this.open = function(){
		this.selectElement().classList.add("open", "Details--on")
	}
	this.close = function(){
		this.selectElement().classList.remove("open", "Details--on")
	}
	this.localStorageKey = function() {
		return "prHelper:" + this.org + ":" + this.repo + ":" + this.number + ":" + this.id
	}
	this.loadState = function() {
		var isOpen = (localStorage.getItem(this.localStorageKey()) || "true") == "true"
		if (!isOpen) this.close()
	}

	var div = document.createElement("div")
	div.classList.add('collapse-bar')
	function closeAndFocus() {
		self.close()
		location.href="#" + self.id
	}
	div.onclick = closeAndFocus
	element.append(div)

	var observer = new MutationObserver(function (event) {
	  console.log("changed: isOpen " + self.isOpen())   
	  localStorage.setItem(self.localStorageKey(), self.isOpen())
	})
	observer.observe(element, {
	  attributes: true, 
	  attributeFilter: ['class'],
	  childList: false, 
	  characterData: false
	})
}
[org, repo, _, number, _] = window.location.href.replace("https://github.com/","").split("/")
window.fileDiffs = Array.from(document.getElementsByClassName("file")).map(function(el) {
	return new FileDiff(org, repo, number, el)
})
window.loadState = function() {
	fileDiffs.forEach(function(diff) {diff.loadState()})
}
window.openAll = function() {
	fileDiffs.forEach(function(diff) {diff.open()})
}
window.removeMarkers = function() {
	// remove all +/- markers from the code for better readability
	Array.from(document.getElementsByClassName("blob-code-marker")).forEach(function(el) {
		el.removeAttribute("data-code-marker")
	})
}
loadState()

var style = document.createElement('style')
var css = ".collapse-bar{ background-color: rgb(255, 147, 160); width: 100%; height: 5px; cursor: pointer; } .collapse-bar:hover{ background-color: red }"
style.appendChild(document.createTextNode(css))
document.getElementsByTagName('head')[0].appendChild(style)

window.button = function(name, action) {
	var newButton = document.createElement("button")
	newButton.innerText = name
	newButton.onclick = action
	newButton.classList.add("btn", "btn-sm")
	newButton.style.marginLeft = "20px"
	document.querySelector('#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools').append(newButton)
}

button("Reset", openAll)
button("Remove Markers", removeMarkers)