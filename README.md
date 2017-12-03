﻿# Telegram_bot_guess_number

Бот для Telegram с игрой «Угадай число». Имя бота: @guessNumber99_bot

Правила игры: Компьютер загадывает 4-х значное число (цифры могут повторяться). Ваша задача угадать это число. 
Если цифра присутствует в загаданном числе, и она стоит на том месте, то бот обозначает такую цифру буквой "В". 
Если цифра присутствует, но она стоит не на том месте, то бот обозначает ее буквой "K". 
Ваша задача угадать загаданное число за наименьшее число ходов.

Бот разрабатывался с использованием модуля node-telegram-bot-api для Node.JS. 
Для обеспечения многопользовательского режима была реализована база данных на MongoDB, в которой хранятся данные по играм пользователей. 
