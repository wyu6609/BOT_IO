# clear old data
puts 'cleaning old data..'
# UserItem.destroy_all
User.destroy_all
Bot.destroy_all
Review.destroy_all

# create seeds

puts 'seeding categories'

Category.create(name: 'Pre-Programmed')
Category.create(name: 'Humanoid')
Category.create(name: 'Autonomous')
Category.create(name: 'Teleoperated')
Category.create(name: 'Augmenting')

puts 'seeding User...'

User.create(
  first_name: 'john',
  last_name: 'smith',
  username: 'admin',
  password_digest: BCrypt::Password.create('admin'),
)

100.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: Faker::Internet.unique.user_name,
    password_digest: BCrypt::Password.create(Faker::Bank.account_number),
  )
end
puts 'seeding Bot...'
250.times do
  seed = Faker::Number.between(from: 1, to: 10_000)

  Bot.create(
    title: Faker::Name.unique.name,
    description: Faker::Hipster.sentence(word_count: 4),
    category_id: Category.ids.sample,
    price: Faker::Number.between(from: 1, to: 100) * 5,
    image: "https://api.dicebear.com/7.x/bottts/svg?seed=#{seed}",
  )
end

puts 'seeding Review...'

1500.times do
  Review.create(
    description: Faker::Hipster.sentence(word_count: 6),
    rating: Faker::Number.between(from: 1, to: 5),
    user_id: User.ids.sample,
    bot_id: Bot.ids.sample,
  )
end

puts 'finished seeding!!'
