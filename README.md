# MYID sign-in

Для успешного запуска проекта на вашей операционной системе должен быть установлен [node.js](https://nodejs.org/en/)

## Шаг 1

Склонируйте или скачайте данный репозиторий.
После откройте терминал в этом репозитории и введите:

### `npm install`

## Шаг 2

Далее введите команду:

### `npm run build`

После должна появится папка `build` в которой будет содержаться исходный код модуля `sign-in`.
Для того чтобы подключить модуль в ваш проект, следует подключить js-скрипты и css-стили к вашему шаблону html, так же как это сделано в файле build/index.html.

## Шаг 3

После того как вы подключете скрипты к вашему шаблону. У вас в глобальном объекте window появится функция `runDetection()`.
Первым аргументом функция принимает callback, в который будет переданы данные полученные через модуль. Второй аргумент функции является опциональным и принимает boolean, который определяет показывать форму для заполнения паспортных данных или нет. Второй аргумент функции по умолчанию равен true, т.е он покажет форму ввода паспортных данных.

Пример использования функции

        window.runDetection((data) => {
            console.log(data)
        }, false);

В данном примере отабразится только страница с распознованием лица, так как вторым аргументом мы передаем false. После того как будет нажата кнопка DETECT в консоль выведутся данные, полученные через модуль.

        {
            "photo_from_camera": {
                "front": "data:image/png;base64,AdowBOUPtaFIAAAAAElFTkSuQmCC..."
            },
            "agreed_on_terms": true
        }

Если вторым аргументов передать true, то появится форма ввода паспортных данных и при нажатии на кнопку detect объект data будет выглядить так.

        {
            "pass_data": "AB7680658",
            "birth_date": "04.09.2001",
            "photo_from_camera": {
                "front": "data:image/png;base64,AdowBOUPtaFIAAAAAElFTkSuQmCC..."
            },
            "agreed_on_terms": true
        }

        pass_data - серия и номер паспортных данных;
        birth_date - дата рождения
        photo_from_camera.front - обрезанное лицо в формате base64