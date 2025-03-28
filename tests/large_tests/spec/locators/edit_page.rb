# Locators for board page
require_relative '../libs/locator'

module Locators
  class EditPage
    include Libs

    attr_accessor :edit_time, :save_button

    def initialize
      @edit_time = Locator.new(:css, 'input[data-testid="edit-time"]')
      @save_button = Locator.new(:css, 'button[data-testid="save-button"]')
    end
  end
end
