module Libs
  class Locator
    # We want to incapsulate logic for locators
    # and when we create Locator we provide
    # which - for example :css
    # what - any locators .Class
    attr_accessor :which, :what

    # ex Locator.new(:css, ".class")
    def initialize(which, what)
      @which = which
      @what = what
    end

    def click(driver = $driver)
      driver.find_element(which, what).click
    end

    def is_displayed(driver = $driver)
      driver.find_element(which, what).displayed?
    end

    def type_text(driver = $driver, text)
      clear
      driver.find_element(which, what).send_keys(text)
    end

    def clear(driver = $driver)
      elem = driver.find_element(which, what)
      elem.click
      elem.clear
    end

    def get_text(driver = $driver)
      driver.find_element(which, what).text
    end

    def get_all(driver = $driver)
      driver.find_elements(which, what)
    end
  end
end
