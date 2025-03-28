require 'chunky_png'

module Utils
  include ChunkyPNG::Color
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

  def compare_screenshots(orignal, current, threshold)
    one = ChunkyPNG::Image.from_file(orignal)
    two = ChunkyPNG::Image.from_file(current)
    output = ChunkyPNG::Image.new(one.width, two.width, ChunkyPNG::Color::WHITE)
    diff = []

    one.height.times do |y|
      one.row(y).each_with_index do |pixel, x|
        next if pixel == two[x, y]

        score = Math.sqrt(
          (r(two[x, y]) - r(pixel))**2 +
          (g(two[x, y]) - g(pixel))**2 +
          (b(two[x, y]) - b(pixel))**2
        ) / Math.sqrt(MAX**2 * 3)

        output[x, y] = grayscale(MAX - (score * MAX).round)
        diff << score
      rescue ChunkyPNG::OutOfBounds => _e
        next
      end
    end
    diff_percent = (diff.inject { |sum, value| sum + value } / one.pixels.length) * 100

    puts "pixels (total):     #{two.pixels.length}"
    puts "pixels changed:     #{diff.length}"
    puts "image changed (%): #{diff_percent}%"

    output.save("./spec/screenshots/diff_#{current}") if diff_percent > threshold

    diff_percent
  end
end
