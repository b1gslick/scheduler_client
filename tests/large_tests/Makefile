export BASE_URL=http://localhost:5173
export BROWSER_HEADLESS=false
export GRID=false
export BROWSER=chrome

default:
	rspec spec/test_basic_user.rb

r:
	rspec spec/test_resolutions.rb

old:
	rspec spec/test_basic_user_flow.rb

one:
	rspec spec/test_basic_user.rb -e $(text)

# for example
# make one text='edit'


