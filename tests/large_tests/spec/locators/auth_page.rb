# Locators for board page
require_relative '../libs/locator'

module Locators
  class AuthPage
    include Libs

    attr_accessor :login_input, :password_input, :repeat_password, :login_button,
                  :confirm_registration, :to_registration, :html

    def initialize
      @login_input = Locator.new(:css, 'input[data-testid="login_username"]')
      @password_input = Locator.new(:css, 'input[data-testid="login_password"]')
      @repeat_password = Locator.new(:css, 'input[data-testid="login_confirm"]')
      @login_button = Locator.new(:css, 'button[type="submit"]')
      @confirm_registration = Locator.new(:css, 'button[type="submit"]')
      @to_registration = Locator.new(:css, '.registration')
      @html = Locator.new(:css, 'html')
    end
  end
end
