require 'chunky_png'

module Utils
  def try_for(timeout)
    start_time = Time.now
    last_error = nil
    until (duration = Time.now - start_time) > timeout
      begin
        yield
        last_error = nil
        return true
      rescue ArgumentError => e
        last_error = e
      rescue RSpec::Expectations::ExpectationNotMetError => e
        last_error = e
      rescue StandardError => e
        last_error = e
      end
      sleep 0.1
    end

    raise "Timeout after #{duration.to_i} seconds with error: #{last_error}." if last_error

    raise "Timeout after #{duration.to_i} seconds."
  end

  def not_visible(timeout)
    start_time = Time.now
    last_error = nil
    until (duration = Time.now - start_time) > timeout
      begin
        yield
        last_error = nil
        return false
      rescue Selenium::WebDriver::Error::NoSuchElementError => e
        last_error = e
      end
      sleep 0.1
    end
    return true if last_error

    raise "Timeeout after #{duration.to_i} seconds"
  end

  def browser_options
    the_browser_type = browser_type.to_s
    case the_browser_type
    when 'chrome'
      the_chrome_options = Selenium::WebDriver::Chrome::Options.new
      the_chrome_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      { options: the_chrome_options }
    when 'firefox'
      the_firefox_options = Selenium::WebDriver::Firefox::Options.new
      the_firefox_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      { options: the_firefox_options }
    when the_browser_type == 'edge'
      the_edge_options = Selenium::WebDriver::Edge::Options.new
      the_edge_options.detach = true
      the_edge_options.add_argument('--headless') if ENV['BROWSER_HEADLESS'] == 'true'
      { options: the_edge_options }
    else
      {}
    end
  end

  def http_client
    return unless ENV['GRID']

    client = Selenium::WebDriver::Remote::Http::Default.new
    client.read_timeout = 600 # seconds
    client
  end

  def grid
    ENV['GRID'] || false
  end

  def grid_url
    return unless ENV['GRID_URL'] && !ENV['GRID_URL'].empty?

    "http://#{ENV['GRID_URL']}:4444"
  end

  def browser_type
    if ENV['BROWSER'] && !ENV['BROWSER'].empty?
      ENV['BROWSER'].downcase.to_sym
    else
      :chrome
    end
  end

  def site_url(default = 'https://www.google.com/ncr')
    ENV['BASE_URL'] || default
  end

  def driver
    @driver
  end

  def browser
    @driver
  end

  def visit(path)
    driver.get(site_url + path)
  end

  def add_note(index, minutes)
    driver.find_element(:css, 'button[data-testid="add-note-button"]').click
    expect(driver.find_element(:css, 'div[data-testid="add-note"]').displayed?).to eql(true)
    driver.find_element(:css, '.inputTitle').send_keys("test#{index}")
    driver.find_element(:css, '.inputDesc').send_keys("test#{index}")
    time = driver.find_element(:css, '.inputTime')
    time.clear
    time.send_keys(minutes)
    driver.find_element(:css, 'button[data-testid="add-button"]').click
    try_for(1) { driver.find_element(:css, 'html').click }
  end

  def compare_screenshots(orignal, current)
    one = ChunkyPNG::Image.from_file(orignal)
    two = ChunkyPNG::Image.from_file(current)
    output = ChunkyPNG::Image.new(one.width, one.width, ChunkyPNG::Color::WHITE)
    diff = []

    one.height.times do |y|
      one.row(y).each_with_index do |pixel, x|
        two[x, y]

        next if pixel == two[x, y]

        score = Math.sqrt(
          (ChunkyPNG::Color.r(two[x, y]) - ChunkyPNG::Color.r(pixel))**2 +
          (ChunkyPNG::Color.g(two[x, y]) - ChunkyPNG::Color.g(pixel))**2 +
          (ChunkyPNG::Color.b(two[x, y]) - ChunkyPNG::Color.b(pixel))**2
        ) / Math.sqrt(255**2 * 3)

        output[x, y] = ChunkyPNG::Color.grayscale(255 - (score * 255).round)
        diff << score
      rescue ChunkyPNG::OutOfBounds => _e
        next
      end
    end
    output.save("./spec/screenshots/diff_#{current}") if diff.length > 150
    diff.length
  end
end
