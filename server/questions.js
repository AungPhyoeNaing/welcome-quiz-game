const questions = [
  // Favorites
  { id: 1, text: "What is my favorite color?", options: ["Blue", "Red", "Green", "Yellow", "Black"] },
  { id: 2, text: "What is my favorite food?", options: ["Pizza", "Sushi", "Burger", "Pasta", "Salad"] },
  { id: 3, text: "What is my favorite movie genre?", options: ["Action", "Comedy", "Horror", "Sci-Fi", "Romance"] },
  { id: 4, text: "What is my favorite animal?", options: ["Dog", "Cat", "Bird", "Lion", "Elephant"] },
  { id: 5, text: "What is my favorite season?", options: ["Spring", "Summer", "Autumn", "Winter", "Monsoon"] },
  { id: 6, text: "What is my favorite dessert?", options: ["Ice Cream", "Cake", "Chocolate", "Pie", "Donuts"] },
  { id: 7, text: "What is my favorite drink?", options: ["Coffee", "Tea", "Soda", "Juice", "Water"] },
  { id: 8, text: "What is my favorite holiday?", options: ["Christmas", "Halloween", "New Year", "Thanksgiving", "Easter"] },
  { id: 9, text: "What is my favorite sport to watch?", options: ["Football", "Basketball", "Tennis", "Soccer", "Baseball"] },
  { id: 10, text: "What is my favorite music genre?", options: ["Pop", "Rock", "Hip Hop", "Country", "Jazz"] },
  
  // Habits & Lifestyle
  { id: 11, text: "What is my usual bedtime?", options: ["9 PM", "10 PM", "11 PM", "12 AM", "After 1 AM"] },
  { id: 12, text: "What do I do first in the morning?", options: ["Check phone", "Drink water", "Brush teeth", "Exercise", "Sleep more"] },
  { id: 13, text: "How do I take my coffee?", options: ["Black", "With milk", "With sugar", "Milk & Sugar", "I don't drink coffee"] },
  { id: 14, text: "What is my preferred way to travel?", options: ["Car", "Plane", "Train", "Bus", "Boat"] },
  { id: 15, text: "What is my hobby?", options: ["Reading", "Gaming", "Cooking", "Traveling", "Drawing"] },
  { id: 16, text: "Are you a morning person or a night owl?", options: ["Morning Person", "Night Owl", "Both", "Neither", "Depends"] },
  { id: 17, text: "How often do I exercise?", options: ["Daily", "Weekly", "Rarely", "Never", "Monthly"] },
  { id: 18, text: "What is my hidden talent?", options: ["Singing", "Dancing", "Drawing", "Cooking", "None"] },
  { id: 19, text: "What is my biggest fear?", options: ["Spiders", "Heights", "Darkness", "Failure", "Loneliness"] },
  { id: 20, text: "What is my dream job?", options: ["Doctor", "Engineer", "Artist", "Teacher", "Entrepreneur"] },

  // Preferences
  { id: 21, text: "Cats or Dogs?", options: ["Cats", "Dogs", "Both", "Neither", "Fish"] },
  { id: 22, text: "Tea or Coffee?", options: ["Tea", "Coffee", "Both", "Neither", "Hot Chocolate"] },
  { id: 23, text: "Summer or Winter?", options: ["Summer", "Winter", "Spring", "Autumn", "Neither"] },
  { id: 24, text: "City or Countryside?", options: ["City", "Countryside", "Suburbs", "Beach", "Mountains"] },
  { id: 25, text: "Books or Movies?", options: ["Books", "Movies", "Both", "Neither", "Music"] },
  { id: 26, text: "Android or iPhone?", options: ["Android", "iPhone", "Both", "Neither", "Nokia"] },
  { id: 27, text: "Mac or PC?", options: ["Mac", "PC", "Both", "Neither", "Linux"] },
  { id: 28, text: "Sweet or Savory?", options: ["Sweet", "Savory", "Both", "Neither", "Spicy"] },
  { id: 29, text: "Morning or Night?", options: ["Morning", "Night", "Afternoon", "Evening", "Dawn"] },
  { id: 30, text: "Call or Text?", options: ["Call", "Text", "Video Call", "Email", "Letter"] },

  // Personal
  { id: 31, text: "What is my zodiac sign?", options: ["Aries", "Taurus", "Gemini", "Cancer", "Leo"] },
  { id: 32, text: "How many siblings do I have?", options: ["0", "1", "2", "3", "4+"] },
  { id: 33, text: "Where was I born?", options: ["City", "Town", "Village", "Hospital", "Home"] },
  { id: 34, text: "What is my middle name?", options: ["James", "Marie", "Lee", "Ann", "No middle name"] },
  { id: 35, text: "What is my eye color?", options: ["Brown", "Blue", "Green", "Hazel", "Black"] },
  { id: 36, text: "What is my hair color?", options: ["Black", "Brown", "Blonde", "Red", "Dyed"] },
  { id: 37, text: "How tall am I?", options: ["Short", "Average", "Tall", "Very Tall", "Tiny"] },
  { id: 38, text: "Do I wear glasses?", options: ["Yes", "No", "Contacts", "Sometimes", "Sunglasses only"] },
  { id: 39, text: "Do I have tattoos?", options: ["Yes", "No", "Planning to", "Maybe", "Henna"] },
  { id: 40, text: "Do I have piercings?", options: ["Yes", "No", "Ears only", "Nose", "Navel"] },

  // Random / Fun
  { id: 41, text: "If I could have a superpower, what would it be?", options: ["Flight", "Invisibility", "Strength", "Speed", "Telepathy"] },
  { id: 42, text: "If I won the lottery, what would I buy first?", options: ["House", "Car", "Travel", "Charity", "Invest"] },
  { id: 43, text: "Which fictional character am I most like?", options: ["Harry Potter", "Batman", "Spider-Man", "Wonder Woman", "Elsa"] },
  { id: 44, text: "What's my karaoke song?", options: ["Pop", "Rock", "Ballad", "Rap", "Disney"] },
  { id: 45, text: "Do I believe in ghosts?", options: ["Yes", "No", "Maybe", "I am a ghost", "Only at night"] },
  { id: 46, text: "Am I a spender or a saver?", options: ["Spender", "Saver", "Both", "Neither", "Depends"] },
  { id: 47, text: "What's my favorite board game?", options: ["Monopoly", "Scrabble", "Chess", "Uno", "Clue"] },
  { id: 48, text: "What's my favorite video game?", options: ["Mario", "Zelda", "Call of Duty", "Minecraft", "Fortnite"] },
  { id: 49, text: "What's my favorite app?", options: ["Instagram", "TikTok", "Twitter", "Facebook", "YouTube"] },
  { id: 50, text: "What's my most used emoji?", options: ["😂", "❤️", "👍", "🔥", "🤔"] },

  // Deep
  { id: 51, text: "What is my love language?", options: ["Words", "Service", "Gifts", "Time", "Touch"] },
  { id: 52, text: "Am I an introvert or extrovert?", options: ["Introvert", "Extrovert", "Ambivert", "Depends", "Shy"] },
  { id: 53, text: "What do I value most in a friend?", options: ["Loyalty", "Humor", "Honesty", "Kindness", "Intelligence"] },
  { id: 54, text: "What makes me angry?", options: ["Lies", "Rudeness", "Traffic", "Hunger", "Noise"] },
  { id: 55, text: "What makes me happy?", options: ["Food", "Sleep", "Friends", "Family", "Success"] },
  { id: 56, text: "What am I most proud of?", options: ["Career", "Family", "Skills", "Possessions", "Nothing"] },
  { id: 57, text: "What is my biggest regret?", options: ["School", "Work", "Relationships", "Money", "None"] },
  { id: 58, text: "Who is my role model?", options: ["Parent", "Celebrity", "Teacher", "Friend", "Self"] },
  { id: 59, text: "What is my philosophy in life?", options: ["YOLO", "Work hard", "Be kind", "Have fun", "Survive"] },
  { id: 60, text: "Do I want kids?", options: ["Yes", "No", "Maybe", "Many", "Adopt"] },

  // Hypothetical
  { id: 61, text: "If I could travel anywhere, where would I go?", options: ["Paris", "Tokyo", "New York", "London", "Bali"] },
  { id: 62, text: "If I could eat one food forever, what would it be?", options: ["Pizza", "Sushi", "Tacos", "Pasta", "Rice"] },
  { id: 63, text: "If I could meet anyone, dead or alive, who?", options: ["Einstein", "Jesus", "Lincoln", "Monroe", "Elvis"] },
  { id: 64, text: "If I were an animal, what would I be?", options: ["Lion", "Eagle", "Dolphin", "Wolf", "Bear"] },
  { id: 65, text: "If I were a color, what would I be?", options: ["Red", "Blue", "Yellow", "Green", "Purple"] },
  { id: 66, text: "If I were a season, what would I be?", options: ["Spring", "Summer", "Autumn", "Winter", "Rainy"] },
  { id: 67, text: "If I were a movie genre, what would I be?", options: ["Comedy", "Drama", "Action", "Horror", "Romance"] },
  { id: 68, text: "If I were a song, what genre would I be?", options: ["Pop", "Rock", "Jazz", "Classical", "Rap"] },
  { id: 69, text: "If I were a superhero, who would I be?", options: ["Superman", "Batman", "Wonder Woman", "Iron Man", "Thor"] },
  { id: 70, text: "If I were a villain, who would I be?", options: ["Joker", "Thanos", "Voldemort", "Darth Vader", "Loki"] },

  // More Random
  { id: 71, text: "What is my favorite fruit?", options: ["Apple", "Banana", "Orange", "Grape", "Strawberry"] },
  { id: 72, text: "What is my favorite vegetable?", options: ["Carrot", "Broccoli", "Spinach", "Corn", "Potato"] },
  { id: 73, text: "What is my favorite snack?", options: ["Chips", "Cookies", "Nuts", "Popcorn", "Candy"] },
  { id: 74, text: "What is my favorite candy?", options: ["Chocolate", "Gummy Bears", "Lollipops", "Gum", "Mints"] },
  { id: 75, text: "What is my favorite ice cream flavor?", options: ["Vanilla", "Chocolate", "Strawberry", "Mint", "Cookie Dough"] },
  { id: 76, text: "What is my favorite cake?", options: ["Chocolate", "Vanilla", "Red Velvet", "Cheesecake", "Carrot"] },
  { id: 77, text: "What is my favorite pie?", options: ["Apple", "Pumpkin", "Cherry", "Pecan", "Blueberry"] },
  { id: 78, text: "What is my favorite soda?", options: ["Coke", "Pepsi", "Sprite", "Dr. Pepper", "Fanta"] },
  { id: 79, text: "What is my favorite juice?", options: ["Orange", "Apple", "Grape", "Cranberry", "Pineapple"] },
  { id: 80, text: "What is my favorite alcoholic drink?", options: ["Beer", "Wine", "Whiskey", "Vodka", "None"] },

  // Final 10
  { id: 81, text: "Do I like spicy food?", options: ["Yes", "No", "A little", "Love it", "Hate it"] },
  { id: 82, text: "Do I like surprises?", options: ["Yes", "No", "Sometimes", "Depends", "Hate them"] },
  { id: 83, text: "Do I like to dance?", options: ["Yes", "No", "Only when drunk", "Privately", "Professionally"] },
  { id: 84, text: "Do I like to sing?", options: ["Yes", "No", "In the shower", "Karaoke", "Choir"] },
  { id: 85, text: "Do I play any instruments?", options: ["Yes", "No", "Used to", "Learning", "Guitar"] },
  { id: 86, text: "Do I speak other languages?", options: ["Yes", "No", "A little", "Fluent", "Learning"] },
  { id: 87, text: "Have I traveled abroad?", options: ["Yes", "No", "Many times", "Once", "Planning to"] },
  { id: 88, text: "Can I swim?", options: ["Yes", "No", "A little", "Like a fish", "Sinking"] },
  { id: 89, text: "Can I drive?", options: ["Yes", "No", "Learning", "Motorcycle", "Truck"] },
  { id: 90, text: "Am I happy right now?", options: ["Yes", "No", "Maybe", "Tired", "Excited"] }
];

module.exports = questions;