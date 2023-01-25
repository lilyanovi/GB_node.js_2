/*
    Задание:

    Напишите программу, которая будет принимать на вход несколько аргументов: 
    дату и время в формате «час-день-месяц-год». 
    Задача программы — создавать для каждого аргумента таймер с обратным 
    отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось). 
    По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, 
    требуется показать сообщение о завершении его работы. Важно, чтобы работа 
    программы основывалась на событиях.

*/
const colors = require('colors')
const EventEmitter = require('events');

class TimerEmitter extends EventEmitter {}
const emitter = new TimerEmitter();

emitter.on('timerOn', ([futureTime, timer]) => {
    const nowTime = Date.now();
    if (nowTime >= futureTime) {
        emitter.emit('timerStop', timer);
    } else {
        generateTime(futureTime - nowTime);
    }
});

emitter.on('timerStop', timer => {
    console.log(colors.yellow('Timer stop'));
    clearInterval(timer);
})

const generateTime = (diffTime) => {

        const years = Math.floor( diffTime / (1000*60*60*24*365) );
        const days  = Math.floor( diffTime / (1000*60*60*24*30) );
        const months = Math.floor( diffTime / (1000*60*60*24) );
        const hours = Math.floor( diffTime / (1000*60*60) );
        const mins  = Math.floor( diffTime / (1000*60) );
        const secs  = Math.floor( diffTime / 1000 );

        const y = years;
        const mon = months - years * 12;
        const d = days  - months * 30;
        const h = hours - days  * 24;
        const m = mins  - hours * 60;
        const s = secs  - mins  * 60;

        console.log(colors.green(`До ${str} oсталось ${y} лет, ${mon} месяцев, ${d} дней, ${h} часов, ${m} минут, ${s} секунд`));  
}

const timerOn = futureTime => {
    setInterval(function(){
        emitter.emit('timerOn', [futureTime, this])
    }, 1000)
}

const [hour, day, month, year] = process.argv.slice(2)

const str = `${year}-${month}-${day}T${hour}:00:00`

const futureTime = Date.parse(str); 

if (isNaN(futureTime)) {
    emitter.emit("error", new Error("Ошибка"));
}

timerOn(futureTime);