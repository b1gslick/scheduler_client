# this is facade for our app
require_relative './board_page'
require_relative './add_note_page'

module Pages
  class MainPage
    attr_accessor :board_page, :add_note

    def initialize
      @board_page = BoardPage.new
      @add_note = AddNotePage.new
    end

    def add_note(index, minutes)
      @board_page.click_add_note
      @add_note.create_note("test#{index}", "test2#{index}", minutes)
    end

    def play_timer
      @board_page.press_first_note_timer
    end
  end
end
