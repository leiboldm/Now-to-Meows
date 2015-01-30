

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
	var old_submit = forms[i].onsubmit;
	var new_submit = (function(f, os) {
		return function(event) {
			try {
				replaceNows(f);
			} catch(error) {
				if (window.console) console.log(error);
			}
			if (os) return os.call(f);
		};
	})(forms[i], old_submit);
	forms[i].onsubmit = new_submit;
}

function replaceNows(par_elt) {
	if (!par_elt || !par_elt.hasOwnProperty('children')) return;
	for (var j = 0; j < par_elt.children.length; j++) {
		var curr_elt = par_elt.children[j];
		if (curr_elt.hasOwnProperty('tagName') && 
			((curr_elt.tagName == "INPUT" && curr_elt.type.match(/text/i) != null) || curr_elt.tagName == "TEXTAREA")) {
			var newstr = curr_elt.value.replace(/ now/g, " meow").replace(/ Now/g, " Meow");
			if (newstr.substring(0,4) == "now " || newstr.substring(0,4) == "Now ") {
				newstr = "Meow " + newstr.slice(3);
			}
			curr_elt.value = newstr;
		}
		if (curr_elt.children.length > 0) {
			replaceNows(curr_elt);
		}
	}
}
