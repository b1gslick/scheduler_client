# Locators for add note
require_relative '../libs/locator'

module Locators
  class AddNotePage
    include Libs

    attr_accessor :add_note, :title, :description, :time, :add_button, :html

    def initialize
      @add_note = Locator.new(:css, 'button[data-testid="add-note"]')
      @title = Locator.new(:css, '.inputTitle')
      @description = Locator.new(:css, '.inputDesc')
      @time = Locator.new(:css, '.inputTime')
      @add_button = Locator.new(:css, 'button[data-testid="add-button"]')
      @html = Locator.new(:css, 'html')
    end
  end
end
