require 'selenium-webdriver'
require_relative './pages/board_page'
require_relative './pages/add_note_page'
require_relative './pages/timer_page'
require_relative './pages/edit_page'
require_relative './libs/driver'
require_relative './libs/utils'

describe 'Basic user flow' do
  include Utils

  before(:each) do
    d = Libs::Driver.new
    $driver = d.get_driver
    @board_page = Pages::BoardPage.new
    @add_note = Pages::AddNotePage.new
    @timer = Pages::TimerPage.new
    @edit_note = Pages::EditPage.new
  end

  after(:each) do
    $driver.quit
  end

  it 'User can add several note, play and stop timer, then delete note' do
    notes_count = 5
    add_note(notes_count, 60)
    expect(@board_page.all_note_length).to eql(notes_count)
    @board_page.press_note_timer(0)
    @timer.play
    try_for(2) { expect(@timer.get_seconds).to eql('59') }
    try_for(2) { expect(@timer.get_minutes).to eql('59') }
    try_for(2) { expect(@timer.get_hours).to eql('00') }
    seconds_before = @timer.get_seconds
    @timer.pause
    try_for(2) { expect(@timer.get_seconds).to eql(seconds_before) }
    @timer.close
    notes_before = @board_page.all_note_length
    @board_page.delete_note(0)
    expect(@board_page.all_note_length).to eql(notes_before - 1)
  end

  it 'User can add several note, play until time end, then note mark as finish' do
    add_note(1, 0.025)
    expect(@board_page.all_note_length).to eql(1)
    @board_page.press_note_timer(0)
    @timer.play
    try_for(2) { expect(@timer.get_seconds).to eql('00') }
    @timer.finish
    not_visible(1) { expect(@timer.get_play_button.is_displayed).to eql(true) }
    not_visible(1) { expect(@timer.get_pause_button.is_displayed).to eql(true) }
    try_for(1) { expect(@timer.get_seconds).to eql('00') }
  end

  it 'User can add new note, play timer and mark it as finish, timer should stop' do
    add_note(1, 5)
    expect(@board_page.all_note_length).to eql(1)
    @board_page.press_note_timer(0)
    @timer.play
    try_for(2) { expect(@timer.get_seconds).to eql('59') }
    try_for(2) { expect(@timer.get_minutes).to eql('04') }
    @timer.pause
    seconds_before = @timer.get_seconds
    @timer.play
    @timer.finish
    not_visible(1) { expect(@timer.get_play_button.is_displayed).to eql(false) }
    not_visible(1) { expect(@timer.get_pause_button.is_displayed).to eql(false) }
    try_for(2) { expect(@timer.get_seconds).to eql(seconds_before) }
  end

  it 'User add note check timer, then edit note, compare timer is changed' do
    add_note(1, 5)
    expect(@board_page.all_note_length).to eql(1)
    @board_page.press_note_timer(0)
    @timer.play
    minutes_before = @timer.get_minutes
    @timer.close
    @board_page.edit_note(0)
    @edit_note.edit_time(minutes_before.to_i + 4)
    @board_page.press_note_timer(0)
    expect(@timer.get_minutes.to_i).to eql(minutes_before.to_i + 4)
  end

  def add_note(number, minutes)
    number.times do |index|
      @board_page.click_add_note
      @add_note.create_note("test#{index}", "test#{index}", minutes)
    end
  end
end
