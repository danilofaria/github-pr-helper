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
		return this.selectElement().classList.contains("open")
	}
	this.open = function(){
		this.selectElement().classList.add("open", "Details--on")
	}
	this.close = function(){
		this.selectElement().classList.remove("open", "Details--on")
	}
	this.localStorageKey = function() {
		return "pipi:" + this.org + ":" + this.repo + ":" + this.number + ":" + this.id
	}
	this.loadState = function() {
		var isOpen = (localStorage.getItem(this.localStorageKey()) || "true") == "true"
		if (!isOpen) this.close()
	}

	var div = document.createElement("div")
	div.style.width = "100%"
	div.style.height = "3px"
	div.style.backgroundColor = "red"
	div.style.cursor = "pointer"
	div.onclick = function() {
		self.close()
		location.href="#" + self.id
	}
	element.append(div)

	var observer = new MutationObserver(function (event) {
	  console.log("changed")   
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
window.open = function() {
	fileDiffs.forEach(function(diff) {diff.open()})
}
loadState()