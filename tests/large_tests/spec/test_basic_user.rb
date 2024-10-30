require 'selenium-webdriver'
require_relative './pages/main_page'
require_relative './libs/driver'

describe 'Basic user flow' do
  $driver = nil

  before(:each) do
    Libs::Driver.new
    @application = Pages::MainPage.new
  end

  after(:each) do
    $driver.close
  end

  it 'User can add several note, play and stop timer, then delete note' do
    @application.add_note(1, 60)
    @application.add_note(1, 60)
    @application.play_timer
    sleep 5
  end
end
