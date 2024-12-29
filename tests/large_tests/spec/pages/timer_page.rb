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
