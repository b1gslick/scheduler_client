export BASE_URL=http://localhost:5173
# export BASE_URL=http://localhost:80
export BROWSER_HEADLESS=true
export GRID=false
export BROWSER=chrome
export GRID_URL=http://localhost:4444

default:
	rspec spec/test_basic_user.rb

r:
	rspec spec/test_resolutions.rb

one:
	rspec spec/test_basic_user.rb -e $(text)

# for example
# make one text='edit'


