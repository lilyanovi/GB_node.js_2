/*
    Ответ: 
    Record 1 - простая синхронная операция
    регестрируем таймер
    Record 5 - простая синхронная операция
    добавляем микрозадачу в очередь
    Record 6 - выполоняем микрозадачу
    переходим к таймеру
    Record 2 - простая синхронная операция
    добавляем микрозадачу в очередь
    выполоняем микрозадачу
    регестрируем таймер
    переходим к таймеру
    Record 3 - простая синхронная операция
    добавляем микрозадачу в очередь
    Record 4 - выполоняем микрозадачу
*/


console.log('Record 1'); 

setTimeout(() => { 
    console.log('Record 2'); 
    Promise.resolve().then(() => { 
        setTimeout(() => { 
            console.log('Record 3'); 
            Promise.resolve().then(() => { 
                console.log('Record 4');
            }); 
        }); 
    }); 
}); 

console.log('Record 5'); 

Promise.resolve().then(() => Promise.resolve()
    .then(()=>console.log('Record 6')));