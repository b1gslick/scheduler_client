# frozen_string_literal: true

require 'selenium-webdriver'
require_relative './libs/driver'
require_relative './libs/utils'

require_relative './pages/board_page'
require_relative './pages/add_note_page'

describe 'Test render app with different resolution' do
  include Utils

  before(:each) do
    @board_page = Pages::BoardPage.new
    @add_note = Pages::AddNotePage.new
  end

  after(:each) do
    $driver.quit
  end

  [
    'iPhone 14 Pro Max',
    'Galaxy S8',
    'Nexus 7',
    'Pixel 7',
    'Samsung Galaxy S20 Ultra'
  ].each do |device|
    it "Test resolution for device #{device}" do
      threshold_percent = 2.0
      _d = Libs::Driver.new(device)
      $driver = _d.get_driver
      (0..2).each do |index|
        @board_page.click_add_note
        @add_note.create_note("test#{index}", "test#{index}", 60)
      end
      $driver.action.move_to_location(0, 0).perform
      name = device.gsub(/\s+/, '_')
      $driver.save_screenshot("#{name}.png")
      sleep 1
      diff = compare_screenshots("./spec/screenshots/#{name}.png", "#{name}.png", threshold_percent)
      expect(diff).to be < threshold_percent
    end
  end
end
