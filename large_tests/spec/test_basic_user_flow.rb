require 'selenium-webdriver'
require_relative '../utils'

describe 'Basic user flow' do
  include Utils

  def press_first_timer
    play_buttons = driver.find_elements(:css, 'button[data-testid="note-play-button"]')
    first_play_button = play_buttons[0]
    first_play_button.click
    driver.find_element(:css, 'button[data-testid="timer-play"]').click
    try_for(1) { expect(driver.find_element(:css, 'button[data-testid="timer-pause"]').displayed?).to eql(true) }
  end

  def press_pause
    driver.find_element(:css, 'button[data-testid="timer-pause"]').click
    try_for(1) { expect(driver.find_element(:css, 'button[data-testid="timer-play"]').displayed?).to eql(true) }
  end

  before(:each) do
    @driver = if grid != 'true'
                Selenium::WebDriver.for(browser_type, browser_options)
              else
                Selenium::WebDriver.for(:remote, url: grid_url, http_client: http_client,
                                                 options: browser_options[:options])
              end
    driver.manage.window.resize_to(1920, 1024)
    driver.get(site_url)
  end

  after(:each) do
    driver.quit
  end

  it 'User can add several note, play and stop timer, then delete note' do
    add_note(1, 60)
    add_note(2, 60)
    press_first_timer
    try_for(2) { expect(driver.find_element(:id, 'seconds').text).to eql('59') }
    try_for(2) { expect(driver.find_element(:id, 'minutes').text).to eql('59') }
    try_for(2) { expect(driver.find_element(:id, 'hours').text).to eql('00') }
    sec_before = driver.find_element(:id, 'seconds').text
    press_pause
    try_for(2) { expect(driver.find_element(:id, 'seconds').text).to eql(sec_before) }
    driver.find_element(:css, 'html').click
    driver.find_element(:css, 'button[data-testid="note-delete-button"]').click
    not_visible(1) { expect(driver.find_element(:xpath, '//h2[contains(text(), "test1")]')).to eql(true) }
  end

  it 'User can add several note, play until time is, then note mark as finish' do
    add_note(1, 0.025)
    add_note(2, 0.025)
    press_first_timer
    try_for(2) { expect(driver.find_element(:id, 'seconds').text).to eql('00') }
    expect(driver.find_element(:css, 'button[data-testid="timer-finish"]').displayed?).to eql(true)
    not_visible(1) { expect(driver.find_element(:css, 'button[data-testid="timer-pause"]').displayed?).to eql(true) }
    not_visible(1) { expect(driver.find_element(:css, 'button[data-testid="timer-play"]').displayed?).to eql(true) }
    try_for(1) { expect(driver.find_element(:id, 'seconds').text).to eql('00') }
  end

  it 'User can add new note, play time and mark it as finish' do
    add_note(1, 5)
    press_first_timer
    try_for(2) { expect(driver.find_element(:id, 'seconds').text).to eql('59') }
    try_for(2) { expect(driver.find_element(:id, 'minutes').text).to eql('04') }
    press_pause
    driver.find_element(:css, 'button[data-testid="timer-play"]').click
    sec_before = driver.find_element(:id, 'seconds').text
    driver.find_element(:css, 'button[data-testid="timer-finish"]').click
    not_visible(1) { expect(driver.find_element(:css, 'button[data-testid="timer-pause"]').displayed?).to eql(true) }
    not_visible(1) { expect(driver.find_element(:css, 'button[data-testid="timer-play"]').displayed?).to eql(true) }
    try_for(1) { expect(driver.find_element(:id, 'seconds').text).to eql(sec_before) }
  end

  it 'User add note check timer, then edit note, compare timer is changed' do
    add_note(1, 5)
    press_first_timer
    press_pause
    miniutes_before = driver.find_element(:id, 'minutes').text
    driver.find_element(:css, 'html').click
    driver.find_element(:css, 'button[data-testid="note-edit-button"]').click
    edit = driver.find_element(:css, 'input[data-testid="edit-time"]')
    edit.clear
    edit.send_keys(miniutes_before.to_i + 4)
    driver.find_element(:css, 'button[data-testid="save-button"]').click
    driver.find_element(:css, 'html').click
    press_first_timer
    expect(driver.find_element(:id, 'minutes').text).to eql("0#{miniutes_before.to_i + 4}")
  end
end
