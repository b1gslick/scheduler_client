# Locators for board page
require_relative '../libs/locator'

module Locators
  class BoardPage
    include Libs

    attr_accessor :add_note_button, :timer_button, :delete_button

    def initialize
      @add_note_button = Locator.new(:css, 'button[data-testid="add-note-button"]')
      @timer_button = Locator.new(:css, 'button[data-testid="note-play-button"]')
      @delete_button = Locator.new(:css, 'button[data-testid="note-delete-button"]')
    end
  end
end
