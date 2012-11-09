// ==UserScript==
// @name           Barcode Image for ISBN
// @namespace      http://swaroop.in
// @description    Displaying the Barcode Image for the ISBN for a Book website.
// @include        http://www.flipkart.com/*
// @include        http://flipkart.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant GM_xmlhttpRequest
// @grant GM_log
// ==/UserScript==

function fetchHTML() {
	// TODO Replace
	var isbn = extractISBNFromPage();
	GM_log('ISBN found on the page ' + isbn);
	GM_xmlhttpRequest ( {
		method: 'GET',
		url:    'http://www.barcoderobot.com/isbn-13/' + isbn + '/',
		onload: function (responseDetails) {
			
			GM_log('AJAX Request returned successfully');
			var respDoc     = $(responseDetails.responseText);
			var imageNode   = $("#resImg", respDoc);
			var imageSRC = imageNode.attr('src');
			GM_log('AJAX processing complete. Image found ' + imageSRC);
			
			var divParent = $(".secondary-info");
			
			if(divParent != undefined) {
				divParent.append("<div id='isbn_barcode'><img id='isbn_barcode_img' src='" + imageSRC + "'/></div>");
				GM_log('ISBN Image injected after book summary ' + divParent.html());
			}			
		}
	} );
}

function extractISBNFromPage() {
	
	// For Flipkart
	var isbn = $("img#visible-image-small").attr("data-pid");
	if(isbn != undefined) {
		GM_log('ISBN Found from Flipkart ' + isbn);
	}
	
	return isbn;
}

// Wait till the page has loaded
fetchHTML();