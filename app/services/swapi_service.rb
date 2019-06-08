class SwapiService

  include HTTParty
  base_uri'https://swapi.co/api/'

  def self.films
    get("/films").to_json
  end

  def self.film(id)
    get("/films/#{id}").to_json
  end

  def self.film_info(path)
      get(path).to_json
  end
end