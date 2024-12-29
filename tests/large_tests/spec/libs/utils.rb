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
