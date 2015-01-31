  
var currentSheet, doc = window.document, parseCSS = new Array("structure.css", "nav.css","elements.css");
window.attachEvent("onload",IEHoverCSS);

function IEHoverCSS(){
	var timeStart = new Date();
	
	parseStylesheets();
	parseDocument(doc);
	
	/* Calculate how long it took to process for testing purposes */
	var timeEnd = new Date();
	minutes1 = timeStart.getMinutes();	seconds1 = timeStart.getSeconds();	millsecs1 = timeStart.getMilliseconds();
	minutes2 = timeEnd.getMinutes(); seconds2 = timeEnd.getSeconds(); millsecs2 = timeEnd.getMilliseconds();
	totalMinutes = minutes2 - minutes1;	totalSeconds = seconds2 - seconds1;	totalMillsecs = millsecs2 - millsecs1;
	str = "time="+((((totalMinutes * 60) + totalSeconds) * 1000) + totalMillsecs) + "\r\n";
	//alert(str);
	
}

function parseStylesheets() {
	
	var sheets = doc.styleSheets, l = sheets.length;
	for(var i=0; i<l; i++){
		if (endsWithAnyOf(sheets[i].href,parseCSS)) parseStylesheet(sheets[i]);
	}	
}

function endsWithAnyOf(str,array){

	for(var i=0;i<array.length;i++) {
		if (str.substr(str.length - array[i].length, array[i].length) == array[i]) return true;
	}
	return false;

}

function parseStylesheet(sheet) {	
	if(sheet.imports) {
		try {
			var imports = sheet.imports, l = imports.length;
			for(var i=0; i<l; i++) parseStylesheet(sheet.imports[i]);
		} catch(securityException){}
	}

	try {
		var rules = (currentSheet = sheet).rules, l = rules.length;
		for(var j=0; j<l; j++) {
			var Rule = rules[j];
			if (Rule.selectorText.indexOf("LI:hover",0) > 0) copyRule(Rule);
		}
	} catch(securityException){}
}

function copyRule(rule) {
	newSelect = rule.selectorText.replace("LI:hover","LI.onhover")
	currentSheet.addRule(newSelect, rule.style.cssText);
}

function parseDocument(doc){
	
	var elements = doc.getElementsByTagName("LI");
	for(var i=0; i<elements.length; i++) {
		className = "onhover";
		new HoverElement(elements[i], className);
	}
}

function HoverElement(node, className) {
	node.attachEvent("onmouseover",
		function() { node.className += ' ' + className; });
	node.attachEvent("onmouseout",
		function() { node.className = 
			node.className.replace(new RegExp('\\s+'+className, 'g'),''); });
}
