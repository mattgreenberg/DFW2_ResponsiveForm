// ***********************************************
// DOM handels
// ***********************************************
var sizeGroup = document.getElementById('size_group');
var sizeGroupLIS = sizeGroup.querySelectorAll('li');
var colorGroup = document.getElementById('color_group');
var colorGroupLIS = colorGroup.querySelectorAll('li');
var iname = document.querySelector('#cxname');
var iemail = document.querySelector('#cxemail');
var iadd1 = document.querySelector('#cxaddress1');
var iadd2 = document.querySelector('#cxaddress2');
var icity = document.querySelector('#cxcity');
var istate = document.querySelector('#cxstate');
var izip = document.querySelector('#cxzip');
var icountry = document.querySelector('#cxcountry');
var form = document.querySelector('#go');
var itemDetails = document.querySelector('p.deets');
var errors = document.querySelector('p.error');

// ***********************************************
// Functionality for custom button controls
// ***********************************************
var colorGroupLabels = ['Green', 'Red', 'Black', 'Blue'];
var sizeGroupLabels = ['Small', 'Medium', 'Large'];
var item = {
	size: sizeGroupLabels[0],
	color: sizeGroupLabels[0]
};

function clearSizeGroup(){
	sizeGroupLIS.forEach(function(li){
		li.setAttribute('aria-checked', false);
	});
}
function clearColorGroup(){
	colorGroupLIS.forEach(function(li){
		li.setAttribute('aria-checked', false);
	});
}
function updateItemDetails(){
	itemDetails.innerHTML = 'Size ' + item.size + '<br>Color ' + item.color;
}
updateItemDetails();

for(var i=0; i<sizeGroupLIS.length; i++){
	var li = sizeGroupLIS[i];
	li.size = sizeGroupLabels[i];
	li.addEventListener('click', function(e){
		
		clearSizeGroup();
		item.size = this.size;
		this.setAttribute('aria-checked', true);
		updateItemDetails();


	});
};

for(var i=0; i<colorGroupLIS.length; i++){
	var li = colorGroupLIS[i];
	li.color = colorGroupLabels[i];
	li.addEventListener('click', function(e){

		clearColorGroup();
		item.color = this.color;
		this.setAttribute('aria-checked', true);
		updateItemDetails();

	});
};

// ***********************************************
// Input Form Validation
// ***********************************************
function CheckValidity(input, type){
	this.input = input;
	this.type = type;
	this.errors = [];
};
CheckValidity.prototype.addError = function(message){
	this.errors.push(message);
};
CheckValidity.prototype.getMessages = function(){
	var status = this.input.validity;

	if(status.valueMissing){
		this.addError(this.type + " field is required");
	}

	if(status.patternMismatch){
		this.addError('Please enter a valid email address');
	}

	return (this.errors.length>0)?this.errors:false;

};


form.addEventListener('click', function(e){
	
	errors.innerHTML = "";
	errors.style.display = "none";
	e.preventDefault();
	var name = new CheckValidity(iname, 'Name');
	var nameMsgs = name.getMessages();
	if(nameMsgs){
		errors.style.display = "block";
		nameMsgs.forEach(function(msg){
			errors.innerHTML += msg + '<br>';
		});
	}

});








