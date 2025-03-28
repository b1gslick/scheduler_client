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

    def press_note_timer(note_id)
      all_elements = @timer_button.get_all
      all_elements[note_id].click
    end

    def delete_note(note_id)
      all_elements = @delete_button.get_all
      all_elements[note_id].click
    end

    def all_note_length
      all_elements = @delete_button.get_all
      all_elements.length
    end

    def edit_note(note_id)
      all_elements = @edit_button.get_all
      all_elements[note_id].click
    end
  end
end
