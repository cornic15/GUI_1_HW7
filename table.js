/*
   File: table.js
   91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
   Corina Mangione, UMass Lowell Computer Science, corina_mangione@student.uml.edu
   Copyright (c) 2020 by Corina Mangione. All rights reserved. May be
   freely
   copied or excerpted for educational purposes with credit to the
   author.
   updated by Corina Mangione on August 10, 2020
   */


// Decleare variables

var horizontalFirst;
var horizontalLast;
var verticalFirst;
var verticalLast;

var num_tabs;

// Get data from form
function getFormData() {
	horizontalFirst = parseInt(document.getElementById('horz_first').value);
	horizontalLast = parseInt(document.getElementById('horz_last').value);
	verticalFirst = parseInt(document.getElementById('vert_first').value);
	verticalLast = parseInt(document.getElementById('vert_last').value);
}


// Makes sure ueser input meeting requirements
// https://jqueryvalidation.org/
function validateData() {
	console.log('I am superman');
	$("#multiplication").validate({


		rules: {
			horz_first: {
				min: -50,
				max: 50,
				number: true,
				required: true,
			},
			horz_last: {
				required: true,
				min: -50,
				max: 50,
				number: true,

			},
			vert_first: {
				min: -50,
				max: 50,
				number: true,
				required: true,
			},
			vert_last: {
				min: -50,
				max: 50,
				number: true,
				required: true,
			},
		},
		// Error messages
		messages: {
			horz_first: {
				min: "The number you entered is too small. Please enter a number larger then -50.",
				max: "The number you entered is too big. Please enter a number that is smaller then 50. ",
				number: "Please enter a number between -50 and 50",
				required: "You cannot leave this field blank. Please enter a number between -50 and 50"

			},
			horz_last: {
				min: "The number you entered is too small. Please enter a number larger then -50.",
				max: "The number you entered is too big. Please enter a number that is smaller then 50. ",
				number: "Please enter a number between -50 and 50",
				required: "You cannot leave this field blank. Please enter a number between -50 and 50"

			},
			vert_first: {
				min: "The number you entered is too small. Please enter a number larger then -50.",
				max: "The number you entered is too big. Please enter a number that is smaller then 50. ",
				number: "Please enter a number between -50 and 50",
				required: "You cannot leave this field blank. Please enter a number between -50 and 50"

			},
			vert_last: {
				min: "The number you entered is too small. Please enter a number larger then -50.",
				max: "The number you entered is too big. Please enter a number that is smaller then 50. ",
				number: "Please enter a number between -50 and 50",
				required: "You cannot leave this field blank. Please enter a number between -50 and 50"

			}
		},

	});
}

// https://stackoverflow.com/questions/7675053/jquery-if-myform-valid-is-true-then-fire-another-jquery-function
// draws table if valid
function submit() {
	document.getElementById('div1').innerHTML = '';
	document.getElementById('errorString').innerHTML = ''
	if ($("#multiplication").valid()) {
		drawTable();
	}

	return false;
}

// For help with the  dynamic table http://www.itgeared.com/articles/1503-how-to-create-dynamic-html-table-javascript/

function submitNow() {
	submit();
}

// creates the table
function drawTable() {
	//get data from the form
	getFormData();

	// swaps nubers if first is larger then the last number
	if (horizontalFirst > horizontalLast) {
		temp = horizontalFirst;
		horizontalFirst = horizontalLast;
		horizontalLast = temp;
		document.getElementById('errorString').innerHTML = "Swaping horizontal numbers ";
	}

	if (verticalFirst > verticalLast) {
		temp = verticalFirst;
		verticalFirst = verticalLast;
		verticalLast = temp;
		document.getElementById('errorString').innerHTML += "Swaping vertical numbers ";
	}

	// changes table size based on number of elements
	console.log("check");
	var div1 = document.getElementById('div1');
	let tClass;
	if ((horizontalLast - horizontalFirst > 20) || (verticalLast - verticalFirst > 20)) {
		tClass = "largeTable";
	} else {
		tClass = "smallTable";
	}
	// creates a <table> element
	var tbl = document.createElement("table");
	tbl.classList.add(tClass);
	var row = document.createElement("tr");
	var cell = document.createElement("td");

	var cellText = ' ';
	var cellTextNode = document.createTextNode(cellText);
	cell.appendChild(cellTextNode);
	row.appendChild(cell);
	tbl.appendChild(row); // add the row to the end of the table body
	div1.appendChild(tbl);

	// creates the row of multiplicands
	for (var c = horizontalFirst; c <= horizontalLast; c++) {
		var cell = document.createElement("td");
		var cellText = c;
		var cellTextNode = document.createTextNode(cellText);
		cell.appendChild(cellTextNode);
		row.appendChild(cell);
	}

	tbl.appendChild(row); // add the row to the end of the table body

	div1.appendChild(tbl);


	// create row of multipliers
	// creating rows
	for (var r = verticalFirst; r <= verticalLast; r++) {
		var row = document.createElement("tr");
		// create cells in row
		var cell = document.createElement("td");
		var cellText = r;
		var cellTextNode = document.createTextNode(cellText);
		cell.appendChild(cellTextNode);
		row.appendChild(cell);
		tbl.appendChild(row);
		div1.appendChild(tbl);

		// creates the products in table
		for (var c = horizontalFirst; c <= horizontalLast; c++) {
			var cell = document.createElement("td");
			var cellText = c * r;
			var cellTextNode = document.createTextNode(cellText);
			cell.appendChild(cellTextNode);
			row.appendChild(cell);
		}

		tbl.appendChild(row); // add the row to the end of the table body

	}

	div1.appendChild(tbl); // appends <table> into <div1>
}


// gets data from html
validateData();
$("#createButton").click(function (event) {
	event.preventDefault();
	submit();
	return false;

});

// Get the number from the slider and set slider requirements

function slider() {

	$("#horz_first_s").slider({
		min: -50,
		max: 50,
		slide: function (event, ui) {
			$("#horz_first").val(ui.value);
			submitNow();
		}
	});
	$("#horz_first").on("keyup", function () {
		$("#horz_first_s").slider("value", this.value);
		submitNow();
	});


	$("#horz_last_s").slider({
		min: -50,
		max: 50,
		slide: function (event, ui) {
			$("#horz_last").val(ui.value);
			submitNow();
		}
	});
	$("#horz_last").on("keyup", function () {
		$("#horz_last_s").slider("value", this.value);
		submitNow();
	});


	$("#vert_first_s").slider({
		min: -50,
		max: 50,
		slide: function (event, ui) {
			$("#vert_first").val(ui.value);
			submitNow();
		}
	});
	$("#vert_first").on("keyup", function () {
		$("#vert_first_s").slider("value", this.value);
		submitNow();
	});


	$("#vert_last_s").slider({
		min: -50,
		max: 50,
		slide: function (event, ui) {
			$("#vert_last").val(ui.value);
			submitNow();
		}
	});
	$("#vert_last").on("keyup", function () {
		$("#vert_last_s").slider("value", this.value);
		submitNow();
	});
}

// deletes all tabs
// https://stackoverflow.com/questions/1581751/removing-dynamic-jquery-ui-tabs
function delete_tabs() {

	$('div#tabs ul li').remove();
	$('div#tabs div').remove();
	$("div#tabs").tabs("refresh");
}

// removes tabs
function removeTab(tabId) {
	var tabIdStr = "#tabs-" + tabId
	var tabs = $('#tabs');
	$(tabIdStr).remove();
	tabs.tabs("refresh");
	var hrefStr = "a[href='" + tabIdStr + "']"
	$(hrefStr).closest("li").remove()
}

// deletes checked tabs
function delete_checked() {
	num = 0;
	$(':checked').each(function () {
		num = $(this).data('num');
		console.log(num);
		$('#tab' + num).remove();

		$(this).parent().remove();
	});
	$('#tabs').tabs('refresh');
}

var num_tabs = 1;

$(document).ready(function () {
	$("div#tabs").tabs();

	$("button#add-tab").click(function () {
		console.log(num_tabs);

		/* create tabs and check boxes on tabs
		https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically */

		$("div#tabs ul").append(
			"<li><a href='#tab" + num_tabs + "'>" + "</a>" +
			"<input id='xx" + num_tabs + "' type='checkbox' data-num='" + num_tabs + "'>" +
			"</li>"
		);
		var multTableHTML = $('#div1').html(); // add tabe to tabs
		$("div#tabs").append(

			"<div id='tab" + num_tabs + "'>" + multTableHTML + "</div>"
		);
		$("div#tabs").tabs("refresh");

		$("#tabs").tabs("option", "active", -1);

		num_tabs++;
	});
	slider();
});
