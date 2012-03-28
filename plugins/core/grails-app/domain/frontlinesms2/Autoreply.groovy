package frontlinesms2

class Autoreply extends Activity {
	static hasOne =[keyword: Keyword]
	String autoreplyText
	
	static constraints = {
		name(blank: false, nullable: false, maxSize: 255, unique: true)
		autoreplyText(nullable:false, blank:false)
		keyword(nullable:false, unique: true)
	}
	
	static mapping = {
        keyword cascade: 'all'
    }
	
	def getType() {
		return 'autoreply'
	}
}