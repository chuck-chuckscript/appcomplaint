-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 29 2024 г., 10:27
-- Версия сервера: 8.0.30
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `report_site`
--

-- --------------------------------------------------------

--
-- Структура таблицы `report`
--

CREATE TABLE `report` (
  `report_id` int NOT NULL,
  `report_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `report_details` text COLLATE utf8mb4_general_ci NOT NULL,
  `report_category` int NOT NULL,
  `report_status` int NOT NULL,
  `report_date` text COLLATE utf8mb4_general_ci NOT NULL,
  `report_user` int NOT NULL,
  `report_photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `report_solution_photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `report_response` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `report`
--

INSERT INTO `report` (`report_id`, `report_name`, `report_details`, `report_category`, `report_status`, `report_date`, `report_user`, `report_photo`, `report_solution_photo`, `report_response`) VALUES
(255424, 'Новая тест', 'фв2221', 8, 1, '1706513141917', 7, 'report-255424.jpg', 'report-255424-solution.jpg', NULL),
(328694, 'Новая', '123123', 8, 1, '1706271543889', 7, 'report-328694.png', 'report-328694-solution.jpg', NULL),
(356656, 'Новая 3', 'фывфывфыв', 9, 1, '1706271574932', 7, 'report-356656.jpg', 'report-356656-solution.jpg', NULL),
(468935, 'Новая 12', 'кАК', 9, 2, '1706274052624', 7, 'report-468935.jpg', NULL, NULL),
(491551, 'Учитель загружает детей', 'Слишком много заданий', 10, 1, '1706270684488', 7, 'report-491551.png', 'report-491551-solution.jpg', NULL),
(749125, 'Хорошо', 'ЧФЫВФЫВФЫВ', 10, 2, '1706271924386', 7, 'report-749125.png', NULL, NULL),
(784224, 'Новая 3', 'фывфывфывфыв', 8, 1, '1706271787894', 7, 'report-784224.jpg', 'report-784224-solution.jpg', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `report_categories`
--

CREATE TABLE `report_categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `report_categories`
--

INSERT INTO `report_categories` (`category_id`, `category_name`) VALUES
(8, 'ЖКХ'),
(9, 'Медицина'),
(10, 'Образование');

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role_name` varchar(25) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `user_surname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_fathername` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_login` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(70) COLLATE utf8mb4_general_ci NOT NULL,
  `user_role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_surname`, `user_fathername`, `user_login`, `user_password`, `user_email`, `user_role`) VALUES
(7, 'Я', 'Ебал', 'SQL', 'nwe', '$2b$10$QTZRtYk4Qz4R8p8zT6HnuuziK3zFLBdgGntkjw3TnEjICPJDZWFO2', 'test@yandex.com', 1),
(8, 'Наиль', 'Чуканов', 'Эльнурович', 'login', '$2b$10$tuRDVj0s.VKXxJIelOiNFeANjAtHjycYUfYS9elXBLjJZxlSqcsam', 'blxxps@yandex.ru', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `сomplaint_status`
--

CREATE TABLE `сomplaint_status` (
  `complain_status_id` int NOT NULL,
  `complain_status_state` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `сomplaint_status`
--

INSERT INTO `сomplaint_status` (`complain_status_id`, `complain_status_state`) VALUES
(1, 'Решена'),
(2, 'Отклонена'),
(3, 'Новая');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `report`
--
ALTER TABLE `report`
  ADD UNIQUE KEY `report_id` (`report_id`) USING BTREE,
  ADD KEY `report_status` (`report_status`),
  ADD KEY `report_user` (`report_user`),
  ADD KEY `report_category` (`report_category`);

--
-- Индексы таблицы `report_categories`
--
ALTER TABLE `report_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Индексы таблицы `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role` (`user_role`);

--
-- Индексы таблицы `сomplaint_status`
--
ALTER TABLE `сomplaint_status`
  ADD PRIMARY KEY (`complain_status_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `report_categories`
--
ALTER TABLE `report_categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `сomplaint_status`
--
ALTER TABLE `сomplaint_status`
  MODIFY `complain_status_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`report_status`) REFERENCES `сomplaint_status` (`complain_status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`report_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_3` FOREIGN KEY (`report_category`) REFERENCES `report_categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
