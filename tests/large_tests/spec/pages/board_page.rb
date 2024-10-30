# this is board page :)
require_relative '../locators/board_page'

module Pages
  class BoardPage < Locators::BoardPage
    # for provide all locators
    def initialize
      super
    end

    def click_add_note
      @add_note_button.click
    end

    def press_first_note_timer
      @timer_button.click
    end
  end
end
