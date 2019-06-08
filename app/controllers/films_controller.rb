class FilmsController < ApplicationController
  
  def index
      all_films = SwapiService.films
      films = JSON.parse(all_films)
      @film_info = []
      films['results'].each do |film|
        @film_info << film
      end
  end

  def show 
    film = SwapiService.film(params[:id])
    data = JSON.parse(film)
    @more_calls = []
    @text_obj = {}
    data.each do |key, value|
      if value.kind_of?(Array)
        @more_calls << value
      else 
        @text_obj[key] = value
      end
    end
    @film = data
    @characters, @planets, @starships, @vehicles, @species  = Array.new(5) { [] }
    threads = []
    @more_calls.each_with_index do |category, i|
      category.each do |path|
        uri = URI::parse(path).path.gsub("/api","")
        threads << Thread.new do
        response = SwapiService.film_info(uri)
        data = JSON.parse(response)
        case i
        when 0 
          @characters << data
        when 1
          @planets << data
        when 2 
          @starships << data
        when 3
          @vehicles << data 
        when 4
          @species << data
        end
        end
      end
    end
    threads.each &:join
  end
end
