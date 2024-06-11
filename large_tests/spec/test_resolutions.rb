require 'selenium-webdriver'
require_relative '../utils'

describe 'Test render app with different resolution' do
  include Utils

  before(:each) do
    @driver = Selenium::WebDriver.for(browser_type, browser_options)
  end

  after(:each) do
    driver.quit
  end

  {
    1920 => 1080, 1366 => 768, 1280 => 1024, 1024 => 768,
    375 => 667, 414 => 736, 360 => 800, 390 => 844,
    768 => 1024, 601 => 962
  }.each do |width, height|
    it "Test resolution #{width} x #{height}" do
      driver.manage.window.size = Selenium::WebDriver::Dimension.new(width, height)
      driver.get(site_url)
      (0..10).each do |index|
        try_for(1) { add_note(index, 5) }
        first_element = driver.find_element(:xpath, '//h2[contains(text(), "test0")]')
        driver.action
              .click(first_element)
              .perform
        driver.action
              .click(first_element)
              .perform
      end
      driver.save_screenshot("#{width}_#{height}.png")
      sleep 1
      diff = compare_screenshots("./spec/screenshots/#{width}_#{height}.png", "#{width}_#{height}.png")
      expect(diff).to be < 150
    end
  end

  {
    'large' => { 'width' => 1920, 'height' => 1080, 'x' => 524, 'y' => 32, 'padding' => '0px', 'margin' => '0px' },
    'medium' => { 'width' => 768, 'height' => 1024, 'x' => 60, 'y' => 32, 'padding' => '0px', 'margin' => '0px' },
    'small' => { 'width' => 390, 'height' => 800, 'x' => 100, 'y' => 41, 'padding' => '0px', 'margin' => '0px' }
  }.each do |size, values|
    it "Test css value and position on screen for #{size}: with resolution #{values['width']} x #{values['height']}" do
      driver.manage.window.size = Selenium::WebDriver::Dimension.new(values['width'], values['height'])
      driver.get(site_url)
      (0..3).each do |index|
        try_for(1) { add_note(index, 5) }
        first_element = driver.find_element(:xpath, '//h2[contains(text(), "test0")]')
        driver.action
              .click(first_element)
              .perform
      end
      first_note = driver.find_element(:xpath, '//h2[contains(text(), "test0")]')
      expect(first_note.rect.x.round - values['x']).to be <= 2
      expect(first_note.rect.y.round - values['y']).to be <= 2
      expect(first_note.css_value('padding')).to eql(values['padding'])
      expect(first_note.css_value('margin')).to eql(values['margin'])
    end
  end
end
