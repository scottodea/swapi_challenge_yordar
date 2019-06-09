class SwapiService
  include HTTParty
  base_uri'https://swapi.co/api/'

  @error = "Error fetching data from swapi"

  def self.films
    begin
     get('/films').to_json
     rescue HTTParty::Error
      puts HTTParty:Error
     rescue StandardError
      @error
     end
   end

  def self.film(id)
    begin
    get("/films/#{id}").to_json
    rescue HTTParty::Error
      raise HTTParty:Error
    rescue StandardError
      @error
    end
   end

  def self.film_info(path)
    begin
      get(path).to_json
    rescue HTTParty::Error
      raise HTTParty:Error
    rescue StandardError
      @error
    end
  end
end