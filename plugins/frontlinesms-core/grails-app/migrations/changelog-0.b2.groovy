databaseChangeLog = {
	changeSet(author: "geoffrey (generated)", id: "1338181676777-1") {
		addColumn(tableName: "poll") {
			column(name: "standard", type: "boolean")
		}
	}
}
