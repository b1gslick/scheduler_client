RSpec.configure do |config|
  config.around(:each) do |schedule_test|
    # $stdout = StringIO.new
    # $stderr = StringIO.new

    schedule_test.run

    # schedule_test.metadata[:stdout] = $stdout.string
    # schedule_test.metadata[:stderr] = $stderr.string

    # $stdout = STDOUT
    # $stderr = STDERR
  end
end
