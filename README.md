# CheckPoint-Spring-Angular-
Демонстрация работы приложени https://youtu.be/7YKHkJTTwSE

Уровень back-end  основан на Spring.
Уровень front-end построен на Angular  с использованием набора компонентов PrimeNG
Взаимодействие между уровнями back-end и front-end организовано посредством REST API.
Приложение включает в себя 2 страницы - стартовую и основную страницу приложения. Обе страницы приложения  адаптированы для отображения в 3 режимах:

"Десктопный" - для устройств, ширина экрана которых равна или превышает 1128 пикселей.
"Планшетный" - для устройств, ширина экрана которых равна или превышает 797, но меньше 1128 пикселей.
"Мобильный"- для устройств, ширина экрана которых меньше 797 пикселей.

Стартовая страница содержит следующие элементы:

"Шапку", содержащую ФИО 
Форму для ввода логина и пароля. Информация о зарегистрированных в системе пользователях  храниться в отдельной таблице БД (пароль  храниться в виде хэш-суммы). Доступ неавторизованных пользователей к основной странице приложения запрещён.

Основная страница приложения содержит следующие элементы:

Набор полей ввода для задания координат точки и радиуса области : Checkbox {'-3','-2','-1','0','1','2','3','4','5'} для координаты по оси X, Text (-5 ... 3) для координаты по оси Y, и Checkbox {'-3','-2','-1','0','1','2','3','4','5'} для задания радиуса области. Приложение осуществляет валидацию данных перед отправкой на сервер.
Динамически обновляемую картинку, изображающую область на координатной плоскости в соответствии с номером варианта и точки, координаты которых были заданы пользователем. Клик по картинке запускают сценарий, осуществляющий определение координат новой точки и отправку их на сервер для проверки её попадания в область. Цвет точек зависит от факта попадания / непопадания в область. Смена радиуса также запускает перерисовку картинки.
Таблицу со списком результатов предыдущих проверок.
Кнопку, по которой аутентифицированный пользователь может закрыть свою сессию и вернуться на стартовую страницу приложения.

Дополнения:
Все результаты проверки сохраняются в базе данных под управлением СУБД PostgreSQL.
Для доступа к БД используется Spring Data.
