recipientSelecter = (function() {
	var recipientCount, fetchRecipientCount, getRecipientCount, updateRecipientCount, searchForContacts, selectMembers, setContact, validateAddressEntry, validateImmediate, validateDeferred;

	recipientCount = 0
	function inCheckedGroup(value) {
		var checkedGroups, t;
		checkedGroups = $("li.group input:checked");
		t = false;
		$.each(checkedGroups, function(index, element) {
			element = $(element);
			if($.inArray(value, $.makeArray(element.attr("groupMembers")))) {
				t = true;
			}
		});
		return t;
	}

	function getMobileNumbersArray() {
		var mobileNumbersString = $("#mobileNumbers").val();
		if(mobileNumbersString) {
			return mobileNumbersString.split(",");
		}
		return [];
	}

	selectMembers = function(element, groupIdString, groupName, allContacts) {
		var mobileNumbers, contactMobileNumbers = {};
		$.each($("#mobileNumbers").val().split(","), function(index, value) { 
			if(value !== "" && !(value in contactMobileNumbers)) {
				contactMobileNumbers[value] = true;
			}
		});

		if($(element).attr("checked")) {
			$.each(allContacts, function(index, value) { 
				if(!(value in contactMobileNumbers)) {
					contactMobileNumbers[value] = true;
				}
			});
		} else {
			$.each(allContacts, function(index, value) {
				if(value in contactMobileNumbers) {
					if(!inCheckedGroup(value)) {
						delete contactMobileNumbers[value];
					}
				}
			});
		}

		mobileNumbers = $.map(contactMobileNumbers, function(index, value) {
			return value;
		});

		$("#mobileNumbers").val(($.makeArray(mobileNumbers).join(",")));


		updateRecipientCount();
	};

	setContact = function(element, contactNumber) {
		var mobileNumbers, contactMobileNumbers = {};
		$.each($("#mobileNumbers").val().split(","), function(index, value) { 
			if(!(value in contactMobileNumbers) && (value != "")) {
				contactMobileNumbers[value] = true;
			}
		});

		if($(element).attr("checked")) {
			if(!(contactNumber in contactMobileNumbers)) {
				contactMobileNumbers[contactNumber] = true;
			}
		} else {
			if(contactNumber in contactMobileNumbers) {
				if(!inCheckedGroup(contactNumber)) {
					delete contactMobileNumbers[contactNumber];
				}
			}
		}

		mobileNumbers = $.map(contactMobileNumbers, function(index, value) {
			return value;
		});

		$("#mobileNumbers").val(($.makeArray(mobileNumbers).join(",")));

		updateRecipientCount();
	};

	// FIXME current this method is unused
	function setValueForCheckBox(value, checked) {
		var checkBox = $("#contacts input[value='" + value + "']");
		checkBox.attr("checked", checked);
		checkBox.change();
	}

	fetchRecipientCount = function() {
		var postData;
		postData = jQuery.param({recipients: jQuery('[name=recipients]').val()}, true);
		console.log("Recipient Count 0: " + recipientCount);
		jQuery.ajax({
			type: "POST",
			async: false,
			data: postData,
			url: url_root + "search/recipientCount",
			success: updateRecipientCount
		});
	};

	updateRecipientCount = function(data) {
		console.log("Recipient Count 1: " + recipientCount);
		recipientCount = data.recipientCount
		console.log("Recipient Count 2: " + recipientCount);
		$("#contacts-count").html(recipientCount);
		$("#messages-count").html(recipientCount);
		$("#recipient-count").html(recipientCount);
	};

	validateAddressEntry = function() {
		var address, containsLetters;
		address = $("#address").val();
		containsLetters = jQuery.grep(address, function(a) {
			return a.match(/[^\+?\d+]/) != null;
		}).join("");
		$("#address").removeClass("error");
		$("#manual-address").find("#address-error").remove();
		if(containsLetters != "" && containsLetters != null) {
			$("#address").addClass("error");
			$("#manual-address").append("<div id='address-error' class='error-message'><g:message code='fmessage.number.error'/></div>");
			return false;
		}
		return true;
	};

	/** Validate that at least one contact or mobile number is selected NOW! */
	validateImmediate = function() {
		fetchRecipientCount();
		return recipientCount > 0;
	};

	/**
	 * Validate that at least one contact, mobile number, group or smart group
	 * is selected, but allow empty groups.
	 */
	validateDeferred = function() {
		return $("[name=recipients]").size() || validateImmediate();
	};

	getRecipientCount = function() { fetchRecipientCount(); return recipientCount };

	searchForContacts = function() {
		var search = $("#searchbox").val().toLowerCase();
		if(search === "") {
			$("li.contact").show();
			$("ul#groups").show();
			$(".matched-search-result").hide();
		} else {
			$("ul#groups").hide();
			$(".ui-tabs-panel #recipients-list ul#contacts li.contact").each(function () {
				if($(this).attr("f-name").toLowerCase().indexOf(search.toLowerCase()) == -1 
					&& $(this).attr("f-number").toLowerCase().indexOf(search.toLowerCase()) == -1) {
					$(this).hide();
					$(this).find(".matched-search-result").hide();
				} else {
					$(this).show();
					$(this).find(".matched-search-result").show();
				}
			});
		}
	};

	return {
		searchForContacts:searchForContacts,
		selectMembers:selectMembers,
		setContact:setContact,
		validateAddressEntry:validateAddressEntry,
		validateImmediate:validateImmediate,
		validateDeferred:validateDeferred,
		fetchRecipientCount:fetchRecipientCount,
		getRecipientCount:getRecipientCount
	};
}());

