class SwapiService
  
  include HTTParty
  base_uri'https://swapi.co/api/'

  def self.films
    get("/films").to_json
  end

end