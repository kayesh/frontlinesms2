<%@ page contentType="text/html;charset=UTF-8" %>
<head>
	<meta name="layout" content="popup"/>
</head>
<body>
	<fsms:wizard url="[action: 'save', controller:'webConnection', params: [ownerId:activityInstanceToEdit?.id ?: null, format: 'json']]" name='new-webconnection-form' method="post" onSuccess="checkForSuccessfulSave(data, i18n('webconnection.label') )"
			verticalTabs="webconnection.type,
					webconnection.configure,
					webconnection.sorting,
					webconnection.confirm"
			templates="/webConnection/type,
					/webConnection/configure,
					/webConnection/sorting,
					/webConnection/confirm,
					/webConnection/save,
					/webConnection/validate"/>
</body>