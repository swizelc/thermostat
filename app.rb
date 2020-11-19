require 'sinatra/base'
require 'sinatra/cross_origin'
class Thermostat < Sinatra::Base
    enable :sessions, :method_override
    set :session_secret, "pizza"
    configure do
        enable :cross_origin
    end

    before do
        response.headers['Access-Control-Allow-Origin'] = '*'
        # session[:temperature] = 20
        # session[:city] = 'London'
        # session[:power] = true
    end

    get "/" do
        File.read('../thermostat/index.html')
      end

    get '/temperature' do 
        content_type :json
        p session[:temperature]
        if session[:temperature]
            p "helloooo"
            {temperature: session[:temperature], city: session[:city], power: session[:power]}.to_json
        else 
            p 'yikes'
            session[:temperature] = 20
            session[:city] = 'Paris'
            session[:power] = true
            {temperature: session[:temperature], city: session[:city], power: session[:power]}.to_json
        end 
    end 

    post '/temperature' do 
        
        content_type :json
        result = JSON.parse(request.body.read())
        p result
        session[:temperature] = result['temperature']
        session[:city] = result['city']
        session[:power] = result['power']
        
        
        
    end 
end 