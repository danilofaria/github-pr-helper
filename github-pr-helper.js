// https://stackoverflow.com/questions/3902635/how-does-one-capture-a-macs-command-key-via-javascript
// this command button tracking should only work on chrome
var commandDown = false
function initCommandButtonTracking() {
    if (document.addEventListener)
    {
       document.addEventListener("keydown",keydown,false);
       document.addEventListener("keyup",keyup,false);
    }
    else if (document.attachEvent)
    {
       document.attachEvent("onkeydown", keydown);
       document.attachEvent("onkeyup", keyup);
    }
    else
    {
       document.onkeydown= keydown;
       document.onkeyup= keyup;
    }
}
function keydown(e) {
   if (!e) e= event;
   if (e.keyCode == 91 || e.keyCode == 93) commandDown = true;
   e.preventDefault();
   e.stopPropagation();
}

function keyup(e) {
   if (!e) e= event;
   if (e.keyCode == 91 || e.keyCode == 93) commandDown = false;
   e.preventDefault();
   e.stopPropagation();
}
initCommandButtonTracking()

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
		return "pipi:" + this.org + ":" + this.repo + ":" + this.number + ":" + this.id
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

	element.onclick = function() {
		if (commandDown)
			closeAndFocus()
	}

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
window.open = function() {
	fileDiffs.forEach(function(diff) {diff.open()})
}
loadState()

var style = document.createElement('style')
var css = ".collapse-bar{ background-color: rgb(255, 147, 160); width: 100%; height: 5px; cursor: pointer; } .collapse-bar:hover{ background-color: red }"
style.appendChild(document.createTextNode(css))
document.getElementsByTagName('head')[0].appendChild(style)

var button = document.createElement("button")
button.innerText = "Reset"
button.onclick = open
button.classList.add("btn", "btn-sm")
button.style.marginLeft = "20px"
document.querySelector('#files_bucket > div.pr-toolbar.js-sticky.js-sticky-offset-scroll > div > div.float-right.pr-review-tools').append(button)