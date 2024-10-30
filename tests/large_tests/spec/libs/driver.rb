# frozen_string_literal: true

# Configure the selenium driver
require_relative 'utils'

module Libs
  class Driver
    include Utils

    attr_accessor :driver, :client

    def initialize(device = nil, width = 1920, height = 1024)
      bo = browser_options(device)
      self.driver = if grid != 'true'
                      Selenium::WebDriver.for(browser_type, bo)

                    else
                      @client = http_client
                      Selenium::WebDriver.for(:remote, url: grid_url, http_client: @client,
                                                       options: bo[:options])
                    end
      driver.manage.window.resize_to(width, height) # unless device
      driver.get(site_url)
    end

    def get_driver
      driver
    end

    def browser_options(device)
      the_browser_type = browser_type.to_s
      case the_browser_type
      when 'chrome'
        chrome_optons(device)
      when 'firefox'
        firefox_options
      when the_browser_type == 'edge'
        edge_options
      else
        {}
      end
    end

    def chrome_optons(device)
      the_chrome_options = Selenium::WebDriver::Chrome::Options.new
      the_chrome_options.add_argument('--disable-dev-shm-usage')
      the_chrome_options.add_argument('--no-sandbox')
      the_chrome_options.add_argument('/var/lib/snapd/snap/bin/chromium')
      the_chrome_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      the_chrome_options.add_emulation(device_name: device) if device
      { options: the_chrome_options }
    end

    def firefox_options
      the_firefox_options = Selenium::WebDriver::Firefox::Options.new
      the_firefox_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      { options: the_firefox_options }
    end

    def edge_options
      the_edge_options = Selenium::WebDriver::Edge::Options.new
      the_edge_options.detach = true
      the_edge_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      { options: the_edge_options }
    end

    def http_client
      return unless ENV['GRID']

      client = Selenium::WebDriver::Remote::Http::Default.new
      client.read_timeout = 60 # seconds
      client
    end

    def stop
      driver.close
      return unless ENV['GRID'] == true

      @client.close
    end

    def grid
      ENV['GRID'] || false
    end

    def grid_url
      return unless ENV['GRID_URL'] && !ENV['GRID_URL'].empty?

      "http://#{ENV['GRID_URL']}:4444"
    end

    def browser_type
      if ENV['BROWSER'] && !ENV['BROWSER'].empty?
        ENV['BROWSER'].downcase.to_sym
      else
        :chrome
      end
    end

    def site_url(default = 'https://www.google.com/ncr')
      ENV['BASE_URL'] || default
    end
  end
end
