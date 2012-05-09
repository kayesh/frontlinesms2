function categorizeClickAction() {
	var me = $('#categorise_dropdown option:selected').val();
	var responseId = me.substring(4, me.length);
	var ownerId = $("#owner-id").val();
	var messageSection = $('input:hidden[name=messageSection]').val();
	if(getCheckedMessageCount() > 1) {
		var messagesToChange = getCheckedList('message');
		var successUrl = "message/" + messageSection + "/" + ownerId;
	} else {
		var messagesToChange = $("#message-id").val();
		var successUrl = "message/" + messageSection + "/" + ownerId + "/show/" + messagesToChange;
	}
	$.ajax({
		type:'POST',
		url: url_root + 'message/changeResponse',
		data: {responseId: responseId, messageIdList: messagesToChange, ownerId: ownerId},
		success: function(data) { window.location = url_root + successUrl; }
	});
}
