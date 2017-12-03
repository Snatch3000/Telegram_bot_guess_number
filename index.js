const TelegramBot = require('node-telegram-bot-api');
const mongoClient = require('mongodb').MongoClient;
let operations = require('./operations.js');

const token = '503607393:AAF8UcoBF-HWCarA5P6gUeH1eDkReXfDK5A';
const bot = new TelegramBot(token, {polling: true});

// старт игры
bot.onText(/\/start/, function (msg, match) { 
    let fromId = msg.from.id;
    bot.sendMessage(fromId, `Привет, ${msg.from.first_name} \nОсновные команды:\n/rules - Правила игры \n/newgame - Новая игра`);
});

// правила игр
bot.onText(/\/rules/, function (msg, match) { ы
    let fromId = msg.from.id;
    bot.sendMessage(fromId, 'Я загадываю 4-х значное число (цифры могут повторяться). Ваша задача угадать это число. Если цифра присутствует в загаданном числе, и она стоит на том месте, то я обозначаю такую цифру буквой "В". Если цифра присутствует, но она стоит не на том месте, то буквой "K". Ваша задача угадать загаданное число за наименьшее число ходов.');
});

// новая игра
bot.onText(/\/newgame/, function (msg, match) { 
    let _userId = msg.from.id;
    let _chatId = msg.chat.id;
    let _date = msg.date;
    let _number = operations.makeNumber(); // создание числа для конкретной игры конкретного пользователя

    // подключение к БД MongoDB
    mongoClient.connect('mongodb://localhost:27017/gamesdb', function(err, db) { 

        if(err) { 
            return console.log(err);
        }

        let collection = db.collection('games'); 
        // создание объекта "игра" 
        let game = {userId: _userId, chatId: _chatId, date: _date, number: _number, countMoves: 0}; 
        
        // удаление из БД предыдущих игр пользователя, если они есть при создании новой игры
        collection.deleteMany({userId : _userId, chatId : _chatId}, function(err, result){
            
            if (err) {return console.log(err);}
            console.log(result);
            db.close();
        }); 

        // помещение в БД новой игры пользователя
        collection.insertOne(game, function(err, result) {
            if(err){ 
                return console.log(err);
            }
            bot.sendMessage(_userId, 'ОК, я загадал число, попробуй угадать');
            console.log(result.ops);
            db.close();
        });
    });
});

// обработка попытки пользователя угадать загаданное число
bot.onText(/\d\d\d\d/, function(msg, match){
    let _userId = msg.from.id;
    let _chatId = msg.chat.id;

    mongoClient.connect('mongodb://localhost:27017/gamesdb', function(err, db) {
        if (err) { 
            return console.log(err);
        }

        let collection = db.collection('games');
        
        // подсчет количества ходов
        collection.findAndModify(
               {userId : _userId, chatId : _chatId},
               {date: -1},
               { $inc: { countMoves: 1 } }, // увеличение на 1 при каждой новой попытке
                function(err, object) {
                    if (err){
                        console.log(err);  
                    }
                }
            );
        
        // поиск в БД конкретной игры
        collection.find({userId : _userId, chatId : _chatId}).sort({date: -1}).limit(1).toArray(function(err, games) {
            if (err) {
                return console.log(err);
                
            }
            
            // проверка попытки пользователя угадать число
            let text = operations.checkNumber(games[0].number, msg.text); 
            // отправить пользователю результат
            bot.sendMessage(_userId, `${text}, Количество ходов: ${games[0].countMoves}`); 
            db.close();         
        });
    });  
});



        

