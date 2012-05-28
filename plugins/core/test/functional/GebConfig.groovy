def jenkins = Boolean.parseBoolean(System.properties.jenkins)

waiting {
	timeout = jenkins? 10: 5
	retryInterval = 0.2
	presets {
		slow {
			timeout = jenkins? 20: 10
			retryInterval = 1
		}
		'very slow' {
			timeout = jenkins? 30: 15
			retryInterval = 1
		}
	}
}

driver = {
	def driver = new org.openqa.selenium.firefox.FirefoxDriver()
	if(driver.class.simpleName == 'FirefoxDriver') {
		def width = 1366
		def height = 768
		driver.navigate().to('http://localhost') // make sure that the browser has opened so we can resize it
		driver.manage().window().setSize(new org.openqa.selenium.Dimension(width, height))
	} else if(driver.class.simpleName == 'HtmlUnitDriver') {
		driver.javascriptEnabled = true
		driver.@webClient.throwExceptionOnScriptError = false
	}
	return driver
}

