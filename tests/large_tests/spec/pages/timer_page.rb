# this is board page :)
require_relative '../locators/timer_page'

module Pages
  class TimerPage < Locators::TimerPage
    # for provide all locators
    def initialize
      super
    end

    def play
      @play_button.click
    end

    def get_play_button
      @play_button
    end

    def get_pause_button
      @pause_button
    end

    def get_finish_button
      @finish_button
    end

    def pause
      @pause_button.click
    end

    def finish
      @finish_button.click
    end

    def get_seconds
      @seconds.get_text
    end

    def get_minutes
      @minutes.get_text
    end

    def get_hours
      @hours.get_text
    end

    def close
      @html.click
    end
  end
end
