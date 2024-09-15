# this page for add notes component
require_relative '../locators/add_note_page'

module Pages
  class AddNotePage < Locators::AddNotePage
    # for provide all locators
    def initialize
      super
    end

    def create_note(title, descrption, minutes)
      # home work try to write assert!
      @title.type_text(title)
      @description.type_text(descrption)
      @time.type_text(minutes)
      @add_button.click
      @html.click
    end
  end
end
