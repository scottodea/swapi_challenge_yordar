class FilmsController < ApplicationController
  def index
      all_films = SwapiService.films
      films = JSON.parse(all_films)
      @film_info = []
      films['results'].each do |film|
        @film_info << film
    end
  end
end
