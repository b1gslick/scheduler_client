# frozen_string_literal: true

require 'selenium-webdriver'
require_relative './libs/driver'
require_relative './libs/utils'

require_relative './pages/board_page'
require_relative './pages/add_note_page'
require_relative './pages/auth_page'

describe 'Test render app with different resolution' do
  include Utils

  before(:each) do
    @board_page = Pages::BoardPage.new
    @add_note = Pages::AddNotePage.new
    @auth_page = Pages::AuthPage.new
  end

  after(:each) do |example|
    name = example.description.to_s.delete(' ')
    $driver.save_screenshot("./result/#{name}.png") if example.exception
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
      d = Libs::Driver.new(device)
      $driver = d.get_driver
      @auth_page.create_account_and_login
      try_for(5) { @board_page.add_note_button.is_displayed }
      (0..2).each do |index|
        @board_page.click_add_note
        @add_note.create_note("test#{index}", "test#{index}", 60)
      end

      try_for(2) { expect(@board_page.all_note_length).to eql(3) }
      $driver.action.move_to_location(0, 0).perform
      name = device.gsub(/\s+/, '_')
      $driver.save_screenshot("result/#{name}.png")
      sleep 1
      diff = compare_screenshots("./spec/screenshots/#{name}.png", "result/#{name}.png", threshold_percent)
      expect(diff).to be < threshold_percent
    end
  end
end
