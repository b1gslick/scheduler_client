require 'selenium-webdriver'
require_relative './pages/board_page'
require_relative './pages/add_note_page'
require_relative './pages/timer_page'
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
  end

  after(:each) do
    $driver.close
  end

  it 'User can add several note, play and stop timer, then delete note' do
    add_note(5, 60)
    expect(@board_page.all_note_length).to eql(5)
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

  def add_note(number, minutes)
    number.times do |index|
      @board_page.click_add_note
      @add_note.create_note("test#{index}", "test#{index}", minutes)
    end
  end
end
