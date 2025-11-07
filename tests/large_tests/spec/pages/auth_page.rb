# this page for add notes component
require_relative '../locators/auth_page'
require_relative '../libs/utils'

module Pages
  class AuthPage < Locators::AuthPage
    include Utils

    def create_account_and_login
      try_for(5) { @to_registration.is_displayed }
      @to_registration.click
      try_for(2) { @confirm_registration.is_displayed }
      email = "#{generate_random_string}@gmail.iv"
      password = "#{generate_random_string}22!!AA"
      @login_input.type_text(email)
      @password_input.type_text(password)
      @repeat_password.type_text(password)
      @confirm_registration.click
      $driver.navigate.to("#{site_url}/login")
      try_for(5) { @to_registration.is_displayed }
      @login_input.type_text(email)
      @password_input.type_text(password)
      @login_button.click
    end
  end
end
