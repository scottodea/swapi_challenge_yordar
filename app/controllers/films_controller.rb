class FilmsController < ApplicationController
  def index
      all_films = SwapiService.films
      films = JSON.parse(all_films)
      @film_titles = []
      films['results'].each do |film|
        @film_titles << film["title"]
    end
  end
end
