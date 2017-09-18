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
var shipLabel = document.querySelector('#sl');

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
// Check Form Validity
// ***********************************************
function CheckValidity(input, type){
	this.input = input;
	this.type = type;
	this.errors = [];
	this.display();
};
CheckValidity.prototype.addError = function(message){
	this.errors.push(message);
};
CheckValidity.prototype.getMessages = function(){
	var status = this.input.validity;
	this.errors = [];

	if(status.valueMissing){
		this.addError(this.type + " field is required");
	}

	if(status.patternMismatch){
		this.addError('Please enter a valid email address');
	}

	return (this.errors.length>0)?this.errors:false;
};
CheckValidity.prototype.display = function(){
	var msgs = this.getMessages();
	if(msgs){
		errors.style.display = "block";
		msgs.forEach(function(msg){
			errors.innerHTML += msg + '<br>';
		});
	}

};

// ***********************************************
// Form Submit Process
// ***********************************************
form.addEventListener('click', function(e){
	
	e.preventDefault();
	errors.innerHTML = "";
	errors.style.display = "none";
	var name = new CheckValidity(iname, 'Name');
	var email = new CheckValidity(iemail, 'Email');
	var address = new CheckValidity(iadd1, 'Address');
	var city = new CheckValidity(icity, 'City');
	var state = new CheckValidity(istate, 'State');
	var zip = new CheckValidity(izip, 'Zip Code');
	var country = new CheckValidity(icountry, 'Country');

});

form.addEventListener('submit', function(e){

	alert('going');

});

iname.addEventListener('input', updateShipLabel);
iadd1.addEventListener('input', updateShipLabel);
iadd2.addEventListener('input', updateShipLabel);
icity.addEventListener('input', updateShipLabel);
istate.addEventListener('input', updateShipLabel);
izip.addEventListener('input', updateShipLabel);
icountry.addEventListener('change', updateShipLabel);

function updateShipLabel(){

	shipLabel.innerHTML = iname.value + '<br>' +
						  iadd1.value + '<br>' +
						  ((iadd2.value.trim() != '')?iadd2.value + '<br>': '') +
						  icity.value + ' ' + istate.value + ' ' + izip.value + ' ' +
						  icountry.value;
	;

};










