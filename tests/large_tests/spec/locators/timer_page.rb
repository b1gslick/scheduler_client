# Locators for board page
require_relative '../libs/locator'

module Locators
  class TimerPage
    include Libs

    attr_accessor :play_button, :pause_button, :finish_button, :seconds, :minutes, :hours, :html

    def initialize
      @play_button = Locator.new(:css, 'button[data-testid="timer-play"]')
      @pause_button = Locator.new(:css, 'button[data-testid="timer-pause"]')
      @finish_button = Locator.new(:css, 'button[data-testid="timer-finish"]')
      @seconds = Locator.new(:id, 'seconds')
      @minutes = Locator.new(:id, 'minutes')
      @hours = Locator.new(:id, 'hours')
      @html = Locator.new(:css, 'html')
    end
  end
end
