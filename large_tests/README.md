# Ruby with Selenium


## Prepare

- install [Ruby](https://www.ruby-lang.org/ru/)
- install [RubyGems](https://rubygems.org/)
- be certain has one of installed browser Chrome or Firefox

## Usage

You can change value in config file (utils.rb), or provide env
variables

### Linux or MacOS

```bash
export BASE_URL="www.your.url"
```

### Windows powershell

```bash
$env:BASE_URL="www.your.url"
```

### Windows cmd

```bash
set BASE_URL = "www.your.url"
```

## Start

```shell
bundle install
rspec spec/simple.rb
```

junit reporter

```bash
rspec spec/simple.rb --format progress --format RspecJunitFormatter --out rspec.xml
```
