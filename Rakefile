# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../app/models/hand.rb', __FILE__)
require File.expand_path('../app/models/user.rb', __FILE__)

Rails.application.load_tasks


namespace :db do

  # desc "Create Admin User"
  # task :create_user do
  #   user = User.new({username: 'steve'})
  #   user.password='qwer1234'
  #   user.save!
  # end

  desc "Fill Database with Random Users"
  task :junk_data do

    # Generate random posts
    30.times do
      User.create({
          username: Faker::Internet.user_name,
          password: Faker::Internet.password(8)
      })
    end
    rand(10..25).times do
      location = Geocoder.search(Faker::Internet.ip_v4_address).first
      coordinates = [location.latitude, location.longitude]
      Hand.create({
          title: "We are all connected",
          message: "everything is awesome!",
          user_id: rand(1..30),
          lat: coordinates[0],
          long: coordinates[1],
          image: Faker::Avatar.image
      })
    end

  end # task :junk_data

  desc "Empty Database"
  task :empty do
    Hand.destroy_all
    Users.destroy_all
  end # task :empty

end # namespace :db
