# Configure the selenium driver
require_relative '../../utils'

module Libs
  class Driver
    include Utils

    attr_accessor :driver

    def initialize(driver = @driver)
      @driver = if grid != 'true'
                  Selenium::WebDriver.for(browser_type, browser_options)
                else
                  Selenium::WebDriver.for(:remote, url: grid_url, http_client: http_client,
                                                   options: browser_options[:options])
                end
      @driver.manage.window.resize_to(1920, 1024)
      @driver.get(site_url)
      $driver = @driver
    end
  end
end
