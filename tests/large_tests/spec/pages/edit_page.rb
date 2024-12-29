# this is board page :)
require_relative '../locators/edit_page'

module Pages
  class EditPage < Locators::EditPage
    # for provide all locators
    def initialize
      super
    end

    def edit_time(new_time)
      @edit_time.type_text(new_time)
      @save_button.click
    end
  end
end
